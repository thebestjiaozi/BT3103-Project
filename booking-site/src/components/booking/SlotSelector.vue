<template>
  <div class="container">
    <h2>Select a Time Slot - {{ date }}</h2>
    <div v-for="slot in slots" :key="slot.id" class="slot">
      <span>{{ slot.time }}</span>
      <span>{{ slot.vacancy }} slots</span>
      <button 
        @click="selectSlot(slot)" 
        :disabled="slot.vacancy === 0"
      >
        Select
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase' // Adjust path if needed

export default {
  name: 'SlotSelector',
  props: {
    venue: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const slots = ref([])

    const fetchSlots = async () => {
      // For example: /venues/{venue}/dates/{date}/timeslots
      const timeslotsRef = collection(db, 'venues', props.venue, 'dates', props.date, 'timeslots')
      try {
        const querySnapshot = await getDocs(timeslotsRef)
        const slotArray = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          slotArray.push({
            id: doc.id,
            time: data.time,
            vacancy: data.vacancy
          })
        })
        slots.value = slotArray
      } catch (error) {
        console.error('Error fetching slots:', error)
      }
    }

    onMounted(() => {
      fetchSlots()
    })

    // If venue or date changes, refetch
    watch(() => [props.venue, props.date], ([newVenue, newDate], [oldVenue, oldDate]) => {
      if (newVenue !== oldVenue || newDate !== oldDate) {
        fetchSlots()
      }
    })

    const selectSlot = (slot) => {
      if (slot.vacancy > 0) {
        emit('slot-selected', slot)
      }
    }

    return { slots, selectSlot }
  }
}
</script>

<style scoped>
.container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  text-align: center;
  width: 800px;
  margin: 50px auto;
  opacity: 0.9;
}
.slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
button[disabled] {
  background: #ccc;
  cursor: not-allowed;
}
button:hover:not([disabled]) {
  background: #0056b3;
}
</style>
