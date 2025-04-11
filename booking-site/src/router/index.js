import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookingView from '../views/BookingView.vue'
import Confirmation from '../views/Confirmation.vue' 

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/booking', name: 'Booking', component: BookingView },
  { path: '/confirmation', name: 'Confirmation', component: Confirmation }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
