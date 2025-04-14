<template>
  <div class="container">
    <h2>Enter Your Booking Details</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Enter your name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <input id="phone" v-model="phone" placeholder="Enter your phone number" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" placeholder="Enter your email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="visitorNumber">Number of Visitors:</label>
        <input id="visitorNumber" v-model.number="visitorNumber" type="number" />
        <span v-if="errors.visitorNumber" class="error">{{ errors.visitorNumber }}</span>
      </div>

      <button type="submit" :disabled="isLoading">{{ isLoading ? "Processing..." : "Book" }}</button>
    </form>
  </div>
</template>

<script>

import app from '@/firebase'
import { collection, addDoc, getFirestore, doc, updateDoc, increment } from 'firebase/firestore'

export default {
  name: 'BookingForm',
  props: {
    selectedDate: {
      type: String,
      required: true
    },
    selectedSlot: {
      type: String,
      required: true
    },
    selectedVenue: {
      type: String,
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
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    async submitForm() {
      this.errors = {}

      if (!this.name) this.errors.name = "Please enter your name."
      if (!this.phone) this.errors.phone = "Please enter your phone number."
      if (!this.email) this.errors.email = "Please enter your email."
      if (!this.validateEmail(this.email)) this.errors.email = "Invalid email format."
      if (!this.visitorNumber || this.visitorNumber <= 0 || this.visitorNumber > 10)
        this.errors.visitorNumber = "Visitors must be between 1 and 10."

      if (Object.keys(this.errors).length) return

      this.isLoading = true
      const db = getFirestore(app)

      try {
        // 1. Write booking
        const docRef = await addDoc(collection(db, "bookings"), {
          name: this.name,
          phone: this.phone,
          email: this.email,
          venue: this.selectedVenue,
          date: this.selectedDate,
          slot: this.selectedSlot,
          visitors: this.visitorNumber,
          createdAt: new Date()
        })

        // 2. Update bookedCount in Firestore (optional)
        const slotRef = doc(db, `venues/${this.selectedVenue}/dates/${this.selectedDate}/timeslots/${this.selectedSlot}`)
        await updateDoc(slotRef, {
          bookedCount: increment(this.visitorNumber),
          vacancy: increment(-this.visitorNumber)
        })

        // 3. Notify parent
        this.$emit('booking-submitted', {
          bookingId: docRef.id,
          name: this.name,
          email: this.email
        })
      } catch (e) {
        console.error("Booking error:", e)
        alert("Booking failed. Please try again.")
      } finally {
        this.isLoading = false
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
  max-width: 400px;
  margin: 30px auto;
  opacity: 0.95;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  background-color: #006a4e;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #004d36;
}
.error {
  color: red;
  font-size: 0.85rem;
}
</style>
