<template>
  <form class="reset-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        v-model.trim="email" 
        required 
        placeholder="Enter your email"
      />

      <button 
        type="button" 
        class="submit-btn" 
        @click="sendVerificationCode"
        :disabled="isSendingCode"
      >
        {{ isSendingCode ? 'Sending...' : 'Send Verification Code' }}
      </button>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">{{ success }}</div>

      <br>
      <label for="verification">Verification code</label>
      <input 
        id="verification" 
        v-model="verification" 
        placeholder="Enter verification code"
        :disabled="!verificationCodeSent"
      />

      <br>
      <label for="newPassword">New Password</label>
      <input 
        type="password" 
        id="newPassword" 
        v-model="newPassword" 
        placeholder="Enter your new password"
        required
      />

      <br>
      <label for="repeatPassword">Confirm New Password</label>
      <input 
        type="password" 
        id="repeatPassword" 
        v-model="repeatPassword" 
        placeholder="Confirm your new password"
        required
      />

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Reset Password' }}
      </button>
    </div>
  </form>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      email: '',
      newPassword: '',
      repeatPassword: '',
      verification: '',
      verificationCode: '',
      verificationCodeSent: false,
      error: '',
      success: '',
      isSendingCode: false,
      isSubmitting: false
    }
  },
  methods: {
    async sendVerificationCode() {
      if (!this.email) {
        this.error = "Please enter an email address";
        return;
      }

      // Simple email validation
      if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        this.error = "Please enter a valid email address";
        return;
      }

      this.isSendingCode = true;
      this.error = '';
      this.success = '';

      try {
        // Check if email exists in Firestore
        const docRef = doc(db, "users", this.email);
        const exist = await getDoc(docRef);

        if (!exist.exists()) {
          this.error = "The email has not been registered!";
          this.isSendingCode = false;
          return;
        }

        // Generate a 6-digit verification code
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const templateParams = {
          to_email: this.email.trim(),
          code: this.verificationCode,
          from_name: "NUS Booking System",
        };
        console.log("Email to send:", this.email.trim());

        // Send email using EmailJS
        await emailjs.send(
          "service_sv8rxw8", // Replace with your service ID
          "template_cyly17h", // Replace with your template ID
          templateParams,
          "YO0o9lNnqrtx_5M2j" // Replace with your user ID
        );

        console.log(`Verification code for ${this.email}: ${this.verificationCode}`);
        this.success = "Verification code sent to your email!";
        this.verificationCodeSent = true;
      } catch (err) {
        console.error("Failed to send verification code:", err);
        this.error = "Failed to send verification code. Please try again.";
      } finally {
        this.isSendingCode = false;
      }
    },
    async handleSubmit() {
      this.error = '';
      this.isSubmitting = true;

      if (this.newPassword !== this.repeatPassword) {
        this.error = "Passwords don't match";
        this.isSubmitting = false;
        return;
      }

      if (this.newPassword.length < 6) {
        this.error = "Password must be at least 6 characters";
        this.isSubmitting = false;
        return;
      }

      if (this.verification !== this.verificationCode) {
        this.error = "Invalid verification code";
        this.isSubmitting = false;
        return;
      }

      try {
        const userDoc = doc(db, "users", this.email);
        await updateDoc(userDoc, {
          password: this.newPassword,
        });

        this.success = "Password reset successfully!";
        this.email = '';
        this.newPassword = '';
        this.repeatPassword = '';
        this.verification = '';
        this.verificationCode = '';
        this.verificationCodeSent = false;
      } catch (err) {
        console.error("Failed to reset password:", err);
        this.error = "Failed to reset password: " + err.message;
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.reset-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
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
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #3aa876;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 5px;
  font-size: 14px;
}

.success-message {
  color: #00C851;
  margin-top: 5px;
  font-size: 14px;
}
</style>