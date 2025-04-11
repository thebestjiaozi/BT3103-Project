<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        v-model="email" 
        required 
        placeholder="Enter your email"
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        required
        v-model="password" 
        placeholder="Enter your password"
      />
    </div>
    
    <button type="submit" class="submit-btn">Login</button>
  </form>
</template>

<script>
import firebaseApp from "../firebase.js";
import {getFirestore} from "firebase/firestore";
import {collection, getDocs, doc, query, where} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      console.log('Attempting login with:', this.email, this.password);
  
      const q = query(
        collection(db, "users"),
        where("email", "==", this.email)
      );
    
      const querySnapshot = await getDocs(q);
    
      if (querySnapshot.empty) {
        alert("No account found with this email");
        return;
      }
    
      // Get the first matching document (assuming emails are unique)
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
    
      if (userData.password !== this.password) {
        alert("Incorrect password");
        return;
    }
    
    // Successful login
    console.log('Login successful for:', userData.email);
}
    }
  }
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #3aa876;
}
</style>