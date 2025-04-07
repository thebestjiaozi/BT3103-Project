<template>
    <div class="date-picker">
      <label for="visitDate">Select a Date:</label>
      <input
        type="date"
        id="visitDate"
        :min="minDate"
        :max="maxDate"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    minDate: String,
    maxDate: String,
    modelValue: String
  })
  
  const emit = defineEmits(["update:modelValue"])
  </script>
  
  <style scoped>
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
  </style>
  