const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const timeSlots = [
  "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM"
];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

exports.updateVenueDates = functions.pubsub.schedule("every day 00:00").onRun(async () => {
  const today = new Date();
  const newDate = new Date(today);
  const oldDate = new Date(today);

  newDate.setDate(today.getDate() + 30);
  oldDate.setDate(today.getDate() - 1);

  const newDateStr = formatDate(newDate);
  const oldDateStr = formatDate(oldDate);

  const venuesSnap = await db.collection("venues").get();

  for (const venueDoc of venuesSnap.docs) {
    const venueId = venueDoc.id;
    const venue = venueDoc.data();
    const venueRef = db.collection("venues").doc(venueId);

    // 1. Add new date with time slots
    const newDateRef = venueRef.collection("dates").doc(newDateStr);
    const newSlotBatch = db.batch();

    newSlotBatch.set(newDateRef, { date: newDateStr });

    for (const time of timeSlots) {
      const slotRef = newDateRef.collection("timeslots").doc(time);
      newSlotBatch.set(slotRef, {
        time,
        maxCapacity: venue.capacity,
        bookedCount: 0,
        vacancy: venue.capacity,
      });
    }

    await newSlotBatch.commit();
    console.log(`✅ Added ${newDateStr} for venue ${venue.name}`);

    // 2. Delete old date
    const oldDateRef = venueRef.collection("dates").doc(oldDateStr);
    const oldSlots = await oldDateRef.collection("timeslots").listDocuments();

    for (const docRef of oldSlots) {
      await docRef.delete();
    }

    await oldDateRef.delete();
    console.log(`🗑 Deleted ${oldDateStr} for venue ${venue.name}`);
  }

  console.log("📆 Daily venue date update completed.");
});
