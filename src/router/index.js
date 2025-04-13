import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/View/LoginView.vue'
import RegisterView from '@/View/RegisterView.vue'
import ResetPasswordView from '@/View/ResetPasswordView.vue'
import QuizView from '@/View/QuizView.vue' // Import your quiz component
import MainView from '@/View/MainView.vue'
import VenueDetail from '@/View/VenueDetail.vue'
import BookingView from '@/View/BookingView.vue'
import Confirmation from '@/View/Confirmation.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView,
    meta: { requiresAuth: true } // Optional: Add route protection
  },
  {
  path: '/main',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true } // Optional: Add route protection
  },
  {
    path: '/venue/:venueId',
    name: 'VenueDetail',
    component: VenueDetail,
    props: route => ({ venueId: route.params.venueId })
  },
  {
    path: '/booking',
    name: 'BookingView',
    component: BookingView
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router