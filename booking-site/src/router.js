// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import BookingForm from './components/BookingForm.vue'
import DateSelector from './components/DateSelector.vue'
import SlotSelector from './components/SlotSelector.vue'
// Import other components as needed

const routes = [
  { path: '/', name: 'Home', component: DateSelector },
  { path: '/booking', name: 'Booking', component: BookingForm },
  { path: '/slots', name: 'Slots', component: SlotSelector },
  // Add a route for Confirmation.vue later when it's ready
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
