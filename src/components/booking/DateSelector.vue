<template>
  <div class="date-selector">
    <h2>Select Date of Visit</h2>
    <input type="date" v-model="selectedDate" :min="today" />
    <button @click="emitDate">Next</button>
  </div>
</template>

<script>
export default {
  name: "DateSelector",
  data() {
    return {
      selectedDate: '',
      today: new Date().toISOString().split("T")[0]
    };
  },
  methods: {
    emitDate() {
      if (this.selectedDate) {
        console.log('DateSelector emitted:', this.selectedDate);
        this.$emit("date-selected", this.selectedDate);
      } else {
        alert("Please select a date before proceeding.");
      }
    }
  }
};
</script>

<style scoped>
.date-selector {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
  margin: 50px auto;
}

input {
  width: 90%;
  padding: 8px;
  margin: 10px 0;
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
