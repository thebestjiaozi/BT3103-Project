<template>
    <div class="container">
      <h2>Select Date of Visit</h2>
      <input type="date" v-model="selectedDate" :min="today" />
      <button @click="goToBooking">Next</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  export default {
    data() {
      return {
        selectedDate: '',
        today: new Date().toISOString().split("T")[0]
      }
    },
    setup() {
      const router = useRouter()
      return { router }
    },
    methods: {
      goToBooking() {
        if (this.selectedDate) {
          this.$router.push(`/booking?date=${this.selectedDate}`)
        } else {
          alert("Please select a date.")
        }
      }
    }
  }
  </script>
  