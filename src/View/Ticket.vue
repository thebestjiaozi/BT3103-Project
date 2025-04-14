<template>
    <div class="ticket">
      <h2>🎟️ Your E-Ticket</h2>
  
      <div v-if="booking">
        <p><strong>Name:</strong> {{ booking.name }}</p>
        <p><strong>Email:</strong> {{ booking.email }}</p>
        <p><strong>Date:</strong> {{ booking.date }}</p>
        <p><strong>Slot:</strong> {{ booking.slot }}</p>
        <p><strong>Venue:</strong> {{ booking.venue }}</p>
      </div>
  
      <div v-else-if="loading">
        <p>Loading ticket...</p>
      </div>
  
      <div v-else>
        <p>Ticket not found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getFirestore, doc, getDoc } from 'firebase/firestore'
  import firebaseApp from '@/firebase'
  
  const db = getFirestore(firebaseApp)
  const route = useRoute()
  
  const booking = ref(null)
  const loading = ref(true)
  
  onMounted(async () => {
    const id = route.query.id
    console.log("Ticket ID from URL:", id)
  
    if (!id) {
      loading.value = false
      return
    }
  
    try {
      const docRef = doc(db, 'bookings', id)
      const snapshot = await getDoc(docRef)
  
      if (snapshot.exists()) {
        booking.value = snapshot.data()
        console.log("Booking data:", booking.value)
      } else {
        console.warn("Ticket not found")
      }
    } catch (err) {
      console.error("Error fetching ticket:", err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .ticket {
    text-align: center;
    padding: 30px;
    max-width: 400px;
    margin: 50px auto;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #f8f8f8;
  }
  </style>
  