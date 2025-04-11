<template>
  <div class="container">
    <h2>Enter Your Booking Details</h2>
    <form @submit.prevent="submitForm">
      <!-- Name field -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Enter your name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>
      <!-- Phone field -->
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input id="phone" v-model="phone" placeholder="Enter your phone number" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </div>
      <!-- Email field -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" placeholder="Enter your email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
      <!-- Visitor count -->
      <div class="form-group">
        <label for="visitorNumber">Visitors:</label>
        <input id="visitorNumber" v-model.number="visitorNumber" type="number" placeholder="Number of visitors" />
        <span v-if="errors.visitorNumber" class="error">{{ errors.visitorNumber }}</span>
      </div>
      <button type="submit" :disabled="isLoading">Book</button>
      <div v-if="isLoading" class="loading">
        Processing your booking, please wait...
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '../../firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'BookingForm',
  props: {
    selectedDate: {
      type: String,
      required: true
    },
    selectedSlot: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      visitorNumber: '',
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async submitForm() {
      // Reset errors
      this.errors = {};
      if (!this.name) this.errors.name = "Please enter your name.";
      if (!this.phone) this.errors.phone = "Please enter your phone number.";
      if (!this.email) this.errors.email = "Please enter your email address.";
      if (!this.visitorNumber) this.errors.visitorNumber = "Please enter the number of visitors.";
      if (this.visitorNumber <= 0 || this.visitorNumber > 10)
        this.errors.visitorNumber = "Enter a number between 1 and 10.";
      if (this.email && !this.validateEmail(this.email))
        this.errors.email = "Enter a valid email address.";

      // Stop if there are errors
      if (Object.keys(this.errors).length) return;

      this.isLoading = true;
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          name: this.name,
          phone: this.phone,
          email: this.email,
          visitors: this.visitorNumber,
          date: this.selectedDate,
          slot: this.selectedSlot.time,
          timestamp: new Date()
        });

        // Emit an event that includes name & email
        this.$emit('booking-submitted', {
          bookingId: docRef.id,
          name: this.name,
          email:this.email
        })
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("An error occurred while processing your booking. Please try again.");
      } finally {
        this.isLoading = false;
      }
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
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
button:hover {
  background: #0056b3;
}
.error {
  color: red;
  font-size: 0.9em;
}
.loading {
  margin-top: 15px;
  font-style: italic;
}
</style>
