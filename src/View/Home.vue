<template>
 
  <div class="home-container">
    <h1>Welcome to Our Booking Site</h1>
    <p>Click below to start your booking process.</p>
    <button @click="startBooking">Start Booking</button>
  </div>

</template>

<script>

export default {
  name: 'Home',
  methods: {
    startBooking() {
      // Navigate to the multi-step BookingView component
      this.$router.push('/booking');
    }
  }
}
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 100px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
