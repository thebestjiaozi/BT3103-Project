<template>
  <form @submit.prevent="handleSubmit" class="register-form">
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
        v-model="password" 
        required 
        placeholder="Create a password"
      />
    </div>
    
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input 
        type="password" 
        id="confirmPassword" 
        v-model="confirmPassword" 
        required 
        placeholder="Confirm your password"
      />
    </div>
    
    <button type="submit" class="submit-btn" v-click = "handleSubmit">Register</button>
  </form>
</template>

<script>
import firebaseApp from "../firebase.js";
  import {getFirestore} from "firebase/firestore";
  import {setDoc, doc, getDoc} from "firebase/firestore";

  const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async handleSubmit() {
  try {
    // Check if email is empty
    if (!this.email) {
      alert("Please enter an email address!");
      return;
    }

    const docRef = doc(db, "users", this.email);
    const exist = await getDoc(docRef);

    if (exist.exists()) {
      alert("The email has already been registered!");
      return;
    }
    
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Check if password is empty or too weak
    if (!this.password || this.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Create new user document
    await setDoc(doc(db, "users", this.email), {
      email: this.email,
      password: this.password,
      quizPassed: false 
    })

    alert("You have successfully registered!");
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again.");
  }
}
  }
}
</script>

<style scoped>
.register-form {
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