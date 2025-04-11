<template>
  <h1 class="title">Venue Details: {{ venueName }}</h1>
  <div class="venue-detail-container">
    <VisitorChart :visitor-data="visitorData" />
    <DateSelector v-model="selectedDate" :min-date="minDate" :max-date="maxDate" />
    <TimeSlotBooking  :venueId="venueName" :selectedDate="selectedDate" @slotBooked="handleSlotBooked" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VisitorChart from '@/components/VenueDetail/VisitorChart.vue'
import DateSelector from '@/components/VenueDetail/DateSelector.vue';
import TimeSlotBooking from '@/components/VenueDetail/TimeSlotBooking.vue';

const venueName = "Business School";
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

const handleSlotBooked = (slot) => {
  alert(`You booked: ${slot.time} on ${slot.date}`)
}
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
