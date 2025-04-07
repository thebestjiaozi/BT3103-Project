<template>
    <div class="slot-section">
      <h2>Book a Time Slot</h2>
      <div class="slots">
        <div v-for="slot in slots" :key="slot.time" class="slot-card">
          <div class="slot-info">
            <span class="time">{{ slot.time }}</span>
            <span class="vacancy">Vacancy: {{ slot.vacancy }}</span>
          </div>
          <button @click="$emit('book', slot)">Book</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    slots: Array,
    selectedDate: String
  })
  </script>
  
  <style scoped>
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
  