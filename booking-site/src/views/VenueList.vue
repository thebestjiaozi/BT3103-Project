<template>
  <div>
    <h1>Select a Date and Venue</h1>
    <!-- Date Input -->
    <input type="date" v-model="selectedDate" />

    <!-- List of Venues -->
    <ul>
      <li v-for="venue in venues" :key="venue.id">
        <button @click="selectVenue(venue)">
          {{ venue.name }}
        </button>
      </li>
    </ul>

    <!-- Display SlotSelector if a venue is selected and no slot is chosen yet -->
    <div v-if="selectedVenue && !selectedSlot">
      <h2>
        Time Slots for "{{ selectedVenue.name }}" on {{ selectedDate }}
      </h2>
      <SlotSelector
        :venue="selectedVenue.name"
        :date="selectedDate"
        @slot-selected="handleSlotSelected"
      />
    </div>

    <!-- Once a slot is selected, show the BookingForm -->
    <div v-else-if="selectedSlot">
      <h2>Enter Your Booking Details</h2>
      <BookingForm
        :selectedDate="selectedDate"
        :selectedSlot="selectedSlot"
        :selectedVenue="selectedVenue.name"
        @booking-submitted="handleBookingSubmitted"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import SlotSelector from '../components/booking/SlotSelector.vue'
import BookingForm from '../components/booking/BookingForm.vue'

export default {
  name: 'VenueList',
  components: { SlotSelector, BookingForm },
  setup() {
    const router = useRouter()  // Use the Composition API hook for routing

    const venues = ref([])
    const selectedVenue = ref(null)
    const selectedDate = ref(new Date().toISOString().split('T')[0])
    const selectedSlot = ref(null)

    // Fetch venues from Firestore
    const fetchVenues = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'venues'))
        venues.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error fetching venues:', error)
      }
    }

    onMounted(fetchVenues)

    // Set the selected venue when clicked; reset any previously selected slot
    const selectVenue = (venue) => {
      selectedVenue.value = venue
      selectedSlot.value = null
    }

    // Instead of an alert, store the selected slot so the BookingForm is shown
    const handleSlotSelected = (slot) => {
      console.log('Slot selected:', slot)
      selectedSlot.value = slot
    }

    // When BookingForm emits booking-submitted, navigate to confirmation.
    const handleBookingSubmitted = ({ bookingId, name, email }) => {
      router.push({
        path: '/confirmation',
        query: {
          bookingId,
          date: selectedDate.value,
          slot: selectedSlot.value.time,
          name,
          email,
          venue: selectedVenue.value.name
        }
      })
    }

    return {
      venues,
      selectedVenue,
      selectedDate,
      selectedSlot,
      selectVenue,
      handleSlotSelected,
      handleBookingSubmitted
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
