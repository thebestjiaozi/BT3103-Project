<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-left">
        <a href="#" class="nav-item">Home</a>
        <a href="#" class="nav-item">Quiz</a>
        <a href="#" class="nav-item">About</a>
      </div>
      <div class="nav-right">
        <a href="#" class="nav-item">Account Info</a>
      </div>
    </nav>

    <!-- Venue Booking -->
    <div id ="venue-container">
      <VenueDetail />
    </div>
  </div>
</template>


<script setup>
import VenueBooking from './View/VenueBooking.vue';
import QuizPage from './View/QuizPage.vue';
import VenueDetail from './View/VenueDetail.vue';
</script>

<style scoped>
/* 🔹 Make the app **occupy the entire screen** */
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: url('assets\Utown.png') no-repeat center center/cover;
  
}

/* 🔹 NAVBAR STYLES */
.navbar {
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  gap: 20px;
}

.nav-right {
  margin-left: auto;
}

.nav-item {
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  transition: 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

/* 🔹 Fix the venue container to prevent overflow issues */
#venue-container {
  margin-top: 40px;
  max-height: 80vh;
}
</style>
