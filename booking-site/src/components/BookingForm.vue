<template>
  <div class="container" v-if="!submitted">
    <h2>Booking Page</h2>
    <input v-model="name" placeholder="Name" />
    <input v-model="phone" placeholder="Phone" />
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="visitorNumber" type="number" placeholder="Visitors" />
    <input type="file" @change="handleFileUpload" />
    
    <!-- Book button now disabled when isLoading is true -->
    <button @click="submitForm" :disabled="isLoading">Book</button>
    
    <!-- Loading indicator shown when isLoading is true -->
    <div v-if="isLoading" class="loading">
      Processing your booking, please wait...
    </div>
  </div>

  <div class="container" v-else>
    <h2>Booking Successful</h2>
    <p>A confirmation email has been sent.</p>
    <button @click="$router.push('/')">Return to Main Page</button>
  </div>
</template>

<script>
import { db, storage } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      visitorNumber: '',
      file: null,
      submitted: false,
      isLoading: false  // For loading state
    }
  },
  methods: {
    handleFileUpload(e) {
      this.file = e.target.files[0]
    },
    // Email format validation method
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async submitForm() {
      // Check for required fields
      if (!this.name || !this.email || !this.file) {
        alert('Please fill all fields and upload a file');
        return;
      }
      // Validate visitor count (must be between 1 and 10)
      if (this.visitorNumber <= 0 || this.visitorNumber > 10) {
        alert("Please enter a valid number of visitors (between 1 and 10).");
        return;
      }
      // Validate email format
      if (!this.validateEmail(this.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      
      // Set loading indicator to true
      this.isLoading = true;
      
      try {
        // Firebase operations are commented out for UI testing
        
        /*
        const fileRef = ref(storage, `uploads/${this.file.name}`);
        await uploadBytes(fileRef, this.file);
        const fileURL = await getDownloadURL(fileRef);
  
        await addDoc(collection(db, "bookings"), {
          name: this.name,
          phone: this.phone,
          email: this.email,
          visitors: this.visitorNumber,
          fileURL,
          timestamp: new Date()
        });
        */
        
        // Simulate successful submission (for UI testing only)
        this.submitted = true;
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
/* Your styles here */
.loading {
  margin-top: 1rem;
  font-style: italic;
}
</style>
