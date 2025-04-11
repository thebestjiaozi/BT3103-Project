import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Base data
const venues = [
  { id: 1, name: 'NUS Central Library', capacity: 20 },
  { id: 2, name: 'Food Court 1', capacity: 10 },
  { id: 3, name: 'Student Activity Center', capacity: 15 },
  { id: 4, name: 'University Hall', capacity: 20 },
  { id: 5, name: 'Business School', capacity: 10 },
  { id: 6, name: 'Engineering Faculty', capacity: 20 },
  { id: 7, name: 'Science Faculty', capacity: 20 },
  { id: 8, name: 'Art and Social Sciences', capacity: 30 },
  { id: 9, name: 'Canteen 2', capacity: 15 },
  { id: 10, name: 'Sports Complex', capacity: 20 }
];

// Time slots
const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM"
];

function getDateKey(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

async function seedVenuesWithSlots() {
  for (const venue of venues) {
    const venueRef = db.collection('venues').doc(String(venue.name));
    
    // Create venue
    //await venueRef.set({ name: venue.name, capacity: venue.capacity });
    //console.log(`🏛️ Venue created: ${venue.name}`);

    // For next 30 days
    for (let i = 0; i < 90; i++) {
      const dateKey = getDateKey(i);
      const dateRef = venueRef.collection('dates').doc(dateKey);
      await dateRef.set({ date: dateKey }); // optional metadata

      // Add timeslots under each date
      const batch = db.batch();
      for (const time of timeSlots) {
        const slotRef = dateRef.collection('timeslots').doc(time);
        batch.set(slotRef, {
          time: time,
          maxCapacity: venue.capacity,
          bookedCount: 0,
          vacancy: venue.capacity
        });
      }

      await batch.commit();
      console.log(`📅  Added time slots for ${venue.name} on ${dateKey}`);
    }
  }

  console.log("✅ All venues and timeslots initialized successfully!");
}

seedVenuesWithSlots().catch(console.error);
