// src/firebase/index.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBCnYuiYu8BExQkbRp7PCDTSbwjvDJ5kN4",
  authDomain: "bt3103-4a043.firebaseapp.com",
  projectId: "bt3103-4a043",
  storageBucket: "bt3103-4a043.firebasestorage.app",
  messagingSenderId: "840019742130",
  appId: "1:840019742130:web:3405fc3b85d0c0b1a7e8ab"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
