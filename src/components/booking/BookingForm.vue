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
        <label for="visitorNumber">Number of Visitors:</label>
        <input id="visitorNumber" v-model.number="visitorNumber" type="number" />
        <span v-if="errors.visitorNumber" class="error">{{ errors.visitorNumber }}</span>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Processing..." : "Book" }}
      </button>
    </form>
  </div>
</template>

<script>
import app from '@/firebase'
import { collection, addDoc, getFirestore, doc, runTransaction, increment } from 'firebase/firestore'

export default {
  name: 'BookingForm',
  props: {
    selectedDate: {
      type: String,
      required: true
    },
    // Here, selectedSlot is assumed to be a string containing the Firestore document ID for the timeslot.
    // If your parent sends an object, adjust this accordingly.
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
      // Reset any existing errors
      this.errors = {};

      // --- Basic Form Validations ---
      if (!this.name) this.errors.name = "Please enter your name.";
      if (!this.phone) this.errors.phone = "Please enter your phone number.";
      if (!this.email) this.errors.email = "Please enter your email.";
      if (!this.validateEmail(this.email)) this.errors.email = "Invalid email format.";
      if (!this.visitorNumber || this.visitorNumber <= 0 || this.visitorNumber > 10)
        this.errors.visitorNumber = "Visitors must be between 1 and 10.";

      // Stop if there are any errors
      if (Object.keys(this.errors).length) return;

      this.isLoading = true;
      const db = getFirestore(app);

      try {
        // --- Step 1: Create a booking record in the 'bookings' collection ---
        const bookingRef = await addDoc(collection(db, "bookings"), {
          name: this.name,
          phone: this.phone,
          email: this.email,
          venue: this.selectedVenue,
          date: this.selectedDate,
          slot: this.selectedSlot,
          visitors: this.visitorNumber,
          createdAt: new Date()
        });

        // --- Step 2: Update the timeslot document to decrement vacancy ---
        // Construct the document reference for the selected timeslot.
        // Here, we expect the path to be:
        // venues/{selectedVenue}/dates/{selectedDate}/timeslots/{selectedSlot}
        const slotRef = doc(
          db,
          `venues/${this.selectedVenue}/dates/${this.selectedDate}/timeslots`,
          this.selectedSlot
        );

        // Use a Firestore transaction to ensure the update is atomic.
        await runTransaction(db, async (transaction) => {
          const slotDoc = await transaction.get(slotRef);
          if (!slotDoc.exists()) {
            throw "Timeslot document does not exist!";
          }
          const currentVacancy = slotDoc.data().vacancy;
          // Check if there's enough vacancy available.
          if (currentVacancy < this.visitorNumber) {
            throw `Not enough vacancy for the number of visitors requested! Only ${currentVacancy} vacancies left.`;
          }
          // Decrement vacancy by the number of visitors and increment bookedCount.
          transaction.update(slotRef, {
            bookedCount: increment(this.visitorNumber),
            vacancy: increment(-this.visitorNumber)
          });
        });

        // --- Step 3: Emit booking-submitted event with booking details ---
        this.$emit('booking-submitted', {
          bookingId: bookingRef.id,
          name: this.name,
          email: this.email
        });
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Booking failed: " + error);
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
