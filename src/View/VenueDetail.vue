<template>
  <h1 class="title">Venue Details: {{ venueName }}</h1>
  <div class="venue-detail-container">
    <VisitorChart :visitor-data="visitorData" />
    <DateSelector v-model="selectedDate" :min-date="minDate" :max-date="maxDate" />
    <TimeSlotBooking  :venueId="venueName" :selectedDate="selectedDate" @slotBooked="handleSlotBooked" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VisitorChart from '@/components/VenueDetail/VisitorChart.vue'
import DateSelector from '@/components/VenueDetail/DateSelector.vue'
import TimeSlotBooking from '@/components/VenueDetail/TimeSlotBooking.vue'
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  venueId: String
})

const router = useRouter()

const route = useRoute();
const venueName = route.params.venueId;

console.log("Venue ID:", venueName);

const db = getFirestore(firebaseApp);

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

const handleSlotBooked = (slot) => {
  console.log(slot.date)
  console.log(slot.time)
  router.push({
    name: 'BookingView',
    query: {
      venue: venueName,
      date: slot.date,
      time: slot.time,
    }
  });
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
