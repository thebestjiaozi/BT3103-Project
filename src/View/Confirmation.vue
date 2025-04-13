<template>
    <div class="container">
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking. Your booking has been successfully confirmed!</p>
      
      <div v-if="bookingDetails">
        <p><strong>Name:</strong> {{ bookingDetails.name }}</p>
        <p><strong>Email:</strong> {{ bookingDetails.email }}</p>
        <p><strong>Date:</strong> {{ formattedDate }}</p>
        <p><strong>Slot:</strong> {{ bookingDetails.slot }}</p>
      </div>
      <div v-else>
        <p>Booking details not available. Please check your email for confirmation details.</p>
      </div>
      
      <button @click="goHome">Return to Main Page</button>
    </div>
 
  </template>
  
  <script>

  export default {
    name: 'Confirmation',
    data() {
      return {
        bookingDetails: null
      }
    },
    computed: {
      // Formats the booking date to a more readable format.
      formattedDate() {
        if (this.bookingDetails && this.bookingDetails.date) {
          return new Date(this.bookingDetails.date).toLocaleDateString();
        }
        return 'No date provided';
      }
    },
    mounted() {
      const q = this.$route.query;
      if (q.bookingId) {
        this.bookingDetails = {
          name: q.name || 'No name provided',
          email: q.email || 'No email provided',
          slot: q.slot || 'No slot provided',
          date: q.date || 'No date provided'
        };
      }
    },
    methods: {
      goHome() {
        this.$router.push('/main');
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 400px;
    margin: 50px auto;
    opacity: 0.9;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  </style>
  