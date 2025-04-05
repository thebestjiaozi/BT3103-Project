<template>
    <div class="container" v-if="!submitted">
      <h2>Booking Page</h2>
      <input v-model="name" placeholder="Name" />
      <input v-model="phone" placeholder="Phone" />
      <input v-model="email" placeholder="Email" />
      <input v-model="visitorNumber" type="number" placeholder="Visitors" />
      <input type="file" @change="handleFileUpload" />
      <button @click="submitForm">Book</button>
    </div>
    <div class="container" v-else>
      <h2>Booking Successful</h2>
      <p>A confirmation email has been sent.</p>
      <button @click="$router.push('/')">Return to Main Page</button>
    </div>
  </template>
  
  <script>
  import { db, storage } from '@/firebase'
  import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
  
  export default {
    data() {
      return {
        name: '',
        phone: '',
        email: '',
        visitorNumber: '',
        file: null,
        submitted: false
      }
    },
    methods: {
      handleFileUpload(e) {
        this.file = e.target.files[0]
      },
      async submitForm() {
        if (!this.name || !this.email || !this.file) {
          alert('Please fill all fields and upload a file')
          return
        }
  
        const fileRef = ref(storage, `uploads/${this.file.name}`)
        await uploadBytes(fileRef, this.file)
        const fileURL = await getDownloadURL(fileRef)
  
        await addDoc(collection(db, "bookings"), {
          name: this.name,
          phone: this.phone,
          email: this.email,
          visitors: this.visitorNumber,
          fileURL,
          timestamp: new Date()
        })
  
        this.submitted = true
      }
    }
  }
  </script>
  