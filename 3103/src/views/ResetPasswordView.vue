<template>
    <div class="reset-container">
      <h1>Reset Password</h1>
      <ResetPasswordForm />
      <div class="links">
        <router-link to="/">Back to Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import ResetPasswordForm from '@/components/ResetPasswordForm.vue'
  
  export default {
    components: {
      ResetPasswordForm
    }
  }
  </script>
  
  <style scoped>
  .reset-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .links {
    margin-top: 20px;
  }
  
  a {
    color: #42b983;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>