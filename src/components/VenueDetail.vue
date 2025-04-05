<template>
    <h1 class="title">Venue Details: {{ venueName }}</h1>
    <div class="venue-detail-container">
  
      <!-- Chart for visitor volume -->
      <div class="chart-container">
        <h2>Historical Visitor Volume</h2>
        <column-chart :data="visitorData" :min="0" xtitle="Time" ytitle="Visitors" />
      </div>
  
      <!-- Date Selector -->
      <div class="date-picker">
        <label for="visitDate">Select a Date:</label>
        <input type="date" id="visitDate" v-model="selectedDate" :min="minDate"
        :max="maxDate"/>
      </div>
  
      <!-- Slot selection -->
      <div class="slot-section">
        <h2>Book a Time Slot</h2>
        <div class="slots">
          <div v-for="slot in availableSlots" :key="slot.time" class="slot-card">
            <div class="slot-info">
              <span class="time">{{ slot.time }}</span>
              <span class="vacancy">Vacancy: {{ slot.vacancy }}</span>
            </div>
            <button @click="bookSlot(slot)">Book</button>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  
  <script setup>
import { ref } from 'vue'

const venueName = "The Deck";
const today = new Date()
const formatDate = (date) => date.toISOString().split('T')[0]

// Minimum date = today
const minDate = formatDate(today)

// Maximum date = today + 30 days
const future = new Date()
future.setDate(today.getDate() + 30)
const maxDate = formatDate(future)

const selectedDate = ref(minDate)

const visitorData = {
  "8am": 20, "9am": 35, "10am": 50, "11am": 65,
  "12pm": 70, "1pm": 80, "2pm": 95, "3pm": 100,
  "4pm": 85, "5pm": 70, "6pm": 60, "7pm": 45, "8pm": 30
};

const availableSlots = [
  { time: "8:00 AM - 9:00 AM", vacancy: 5 },
  { time: "9:00 AM - 10:00 AM", vacancy: 5 },
  { time: "10:00 AM - 11:00 AM", vacancy: 2 },
  { time: "11:00 AM - 12:00 PM", vacancy: 0 },
  { time: "1:00 PM - 2:00 PM", vacancy: 4 },
  { time: "3:00 PM - 4:00 PM", vacancy: 1 },
  { time: "4:00 PM - 5:00 PM", vacancy: 5 },
  { time: "5:00 PM - 6:00 PM", vacancy: 4 },
  { time: "6:00 PM - 7:00 PM", vacancy: 2 },
  { time: "7:00 PM - 8:00 PM", vacancy: 3 }
];

const bookSlot = (slot) => {
  if (slot.vacancy > 0) {
    alert(`You have booked the slot: ${slot.time} on ${selectedDate.value}`);
  } else {
    alert("This slot is full. Please choose another.");
  }
};
</script>

  
<style scoped>
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

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
}

.chart-container {
  margin-bottom: 20px;
}

.chart-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

/* NEW Date Picker Section */
.date-picker {
  margin: 20px 0;
  text-align: center;
  color: black;
}

.date-picker input {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.slot-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slot-card {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slot-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-left: 10px;
  justify-content: space-between;
  flex: 1;
  margin-right:15px;
}

.time, .vacancy {
  font-weight: 500;
  color: black;
  margin-bottom: 4px;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
}
</style>
