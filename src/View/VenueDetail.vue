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
import { ref } from 'vue'
import VisitorChart from '../components/VisitorChart.vue'
import DateSelector from '../components/DateSelector.vue'
import TimeSlotBooking from '../components/TimeSlotBooking.vue'

const venueName = "The Deck";
const today = new Date()
const formatDate = (date) => date.toISOString().split('T')[0]

const minDate = formatDate(today)
const future = new Date()
future.setDate(today.getDate() + 30)
const maxDate = formatDate(future)

const selectedDate = ref(minDate)

const visitorData = {
  "8am": 20, "9am": 35, "10am": 50, "11am": 65,
  "12pm": 70, "1pm": 80, "2pm": 95, "3pm": 100,
  "4pm": 85, "5pm": 70, "6pm": 60, "7pm": 45, "8pm": 30
};

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
