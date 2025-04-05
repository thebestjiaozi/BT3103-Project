<template>
    <div class="container">
      <h2>Utown Fine Food - {{ date }}</h2>
      <div v-for="slot in slots" :key="slot.id" class="slot">
        <span>{{ slot.time }}</span>
        <span>{{ slot.remaining }} slots</span>
        <button @click="bookSlot(slot)">Book</button>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase'
  import { collection, query, where, getDocs } from 'firebase/firestore'
  
  export default {
    props: ['date'],
    data() {
      return { slots: [] }
    },
    async mounted() {
      const q = query(collection(db, "slots"), where("date", "==", this.date))
      const querySnapshot = await getDocs(q)
      this.slots = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    methods: {
      bookSlot(slot) {
        this.$router.push({ path: '/form', query: { slotId: slot.id } })
      }
    }
  }
  </script>
  