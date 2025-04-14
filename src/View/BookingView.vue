<template>

  <div class="booking-container">
    <div>
      <h2>Enter Your Booking Details</h2>
      <BookingForm 
        :selectedDate="selectedDate"
        :selectedSlot="selectedSlot"
        :selectedVenue="selectedVenue"
        @booking-submitted="handleBookingSubmitted" 
      />
      <button class="back-button" @click="goBack">Back</button>
    </div>
  </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import BookingForm from '../components/booking/BookingForm.vue'

// Get route and router
const route = useRoute()
const router = useRouter()

// Extract query parameters
const selectedVenue = route.query.venue
const selectedDate = route.query.date
const selectedSlot =  route.query.time
console.log(selectedDate)
console.log(selectedSlot)
console.log(selectedVenue)


// Handle submission from BookingForm
const handleBookingSubmitted = ({ bookingId, name, email }) => {
  router.push({
    path: '/confirmation',
    query: {
      bookingId,
      date: selectedDate,
      slot: selectedSlot,
      name,
      email,
      venue: selectedVenue
    }
  })
}

// Back button handler
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.booking-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

h2 {
  margin-bottom: 1rem;
}

.back-button {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.back-button:hover {
  background: #5a6268;
}
</style>
