<template>
    <div class="chart-container">
      <h2>Historical Visitor Volume</h2>
      <column-chart :data="visitorData" :min="0" xtitle="Time" ytitle="Visitors" />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    visitorData: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
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
  </style>
  
