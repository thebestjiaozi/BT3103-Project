<template>
  <div class="booking-container">
    <!-- Step 1: Date Selection -->
    <div v-if="step === 'selectDate'">
      <h2>Select a Date</h2>
      <DateSelector @date-selected="handleDateSelected" />
    </div>

    <!-- Step 2: Venue Selection -->
    <div v-else-if="step === 'selectVenue'">
      <h2>Select a Venue</h2>
      <VenueList @venue-selected="handleVenueSelected" />
      <button class="back-button" @click="prevStep">Back</button>
    </div>

    <!-- Step 3: Slot Selection -->
    <div v-else-if="step === 'selectSlot'">
      <h2>Select a Time Slot for {{ selectedVenue }} on {{ selectedDate }}</h2>
      <SlotSelector 
        :venue="selectedVenue" 
        :date="selectedDate" 
        @slot-selected="handleSlotSelected" 
      />
      <button class="back-button" @click="prevStep">Back</button>
    </div>

    <!-- Step 4: Booking Details Form -->
    <div v-else-if="step === 'enterDetails'">
      <h2>Enter Your Booking Details</h2>
      <BookingForm 
        :selectedDate="selectedDate"
        :selectedSlot="selectedSlot"
        :selectedVenue="selectedVenue"
        @booking-submitted="handleBookingSubmitted" 
      />
      <button class="back-button" @click="prevStep">Back</button>
    </div>
  </div>
</template>

<script>
import DateSelector from '../components/booking/DateSelector.vue'
import VenueList from './VenueList.vue'
import SlotSelector from '../components/booking/SlotSelector.vue'
import BookingForm from '../components/booking/BookingForm.vue'

export default {
  name: 'BookingView',
  components: {
    DateSelector,
    VenueList,
    SlotSelector,
    BookingForm
  },
  data() {
    return {
      // The current step in the booking process
      step: 'selectDate', // 'selectDate' -> 'selectVenue' -> 'selectSlot' -> 'enterDetails'
      
      // Data collected along the way
      selectedDate: null,
      selectedVenue: null,
      selectedSlot: null
    }
  },
  methods: {
    // 1. DateSelector emits "date-selected"
    handleDateSelected(date) {
      console.log('Date selected:', date)
      this.selectedDate = date
      this.step = 'selectVenue'
    },
    
    // 2. VenueList emits "venue-selected"
    handleVenueSelected(venue) {
      console.log('Venue selected:', venue)
      // If venue is an object, we assume it has a "name" property.
      // Otherwise, store it directly as a string.
      this.selectedVenue = venue.name ? venue.name : venue
      this.step = 'selectSlot'
    },
    
    // 3. SlotSelector emits "slot-selected"
    handleSlotSelected(slot) {
      console.log('Slot selected:', slot)
      this.selectedSlot = slot
      this.step = 'enterDetails'
    },
    
    // 4. BookingForm emits "booking-submitted"
    handleBookingSubmitted({ bookingId, name, email }) {
      // After the booking form decrements Firestore vacancy,
      // we navigate to the confirmation page.
      this.$router.push({
        path: '/confirmation',
        query: {
          bookingId,
          date: this.selectedDate,
          slot: this.selectedSlot.time,
          name,
          email,
          venue: this.selectedVenue
        }
      })
    },
    
    // Allows user to go back a step
    prevStep() {
      if (this.step === 'enterDetails') {
        this.step = 'selectSlot'
      } else if (this.step === 'selectSlot') {
        this.step = 'selectVenue'
      } else if (this.step === 'selectVenue') {
        this.step = 'selectDate'
      }
      // If already at 'selectDate', there's nowhere else to go back to,
      // so no further "else".
    }
  }
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
