// =====================
// VenueDetailPage.vue (View)
// =====================
<template>
  <h1 class="title">Venue Details: {{ venueName }}</h1>
  <div class="venue-detail-container">
    <VisitorChart :visitor-data="visitorData" />
    <DateSelector v-model:selected-date="selectedDate" :min-date="minDate" :max-date="maxDate" />
    <TimeSlotBooking :slots="availableSlots" :selected-date="selectedDate" @book="bookSlot" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VisitorChart from '../components/VisitorChart.vue'
import DateSelector from '../components/DateSelector.vue'
import TimeSlotBooking from '../components/TimeSlotBooking.vue'
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc } from 'firebase/firestore'
const db = getFirestore(firebaseApp);

const venueName = "Food Court 1";
const today = new Date()
const formatDate = (date) => date.toISOString().split('T')[0]

const minDate = formatDate(today)
const future = new Date()
future.setDate(today.getDate() + 30)
const maxDate = formatDate(future)

const selectedDate = ref(minDate)

const visitorData = ref([]);
onMounted(async () => {
  const docRef = doc(db, 'venues', venueName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const rawData = data["Historical Volume"];
    
    const timeOrder = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];
    const chartData = [["Time", "Visitors"]];

    timeOrder.forEach(time => {
      chartData.push([time, rawData[time] ?? 0]);
    });

    visitorData.value = chartData;
  } else {
    console.log("No visitor volume data found!");
  }
})

const availableSlots = [
  { time: "8:00 AM - 9:00 AM", vacancy: 5 },
  { time: "9:00 AM - 10:00 AM", vacancy: 5 },
  { time: "10:00 AM - 11:00 AM", vacancy: 2 },
  { time: "11:00 AM - 12:00 PM", vacancy: 0 },
  { time: "1:00 PM - 2:00 PM", vacancy: 4 },
  { time: "3:00 PM - 4:00 PM", vacancy: 1 },
  { time: "4:00 PM - 5:00 PM", vacancy: 5 },
  { time: "5:00 PM - 6:00 PM", vacancy: 4 },
  { time: "6:00 PM - 7:00 PM", vacancy: 1 },
  { time: "7:00 PM - 8:00 PM", vacancy: 3 }
];

const bookSlot = (slot) => {
  if (slot.vacancy > 0) {
    alert(`You have booked the slot: ${slot.time} on ${selectedDate.value}`);
  } else {
    alert("This slot is full. Please choose another.");
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
}

.venue-detail-container {
  background: rgba(255, 255, 255, 0.85);
  padding: 30px 20px;
  border-radius: 12px;
  max-width: 800px;
  margin: auto;
  max-height: 75vh;
  overflow-y: auto;
  clip-path: inset(0px round 15px);
  align-self: center;
}
</style>
