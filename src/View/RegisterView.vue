<template>
    <div class="register-container">
      <h1>Register</h1>
      <RegisterForm />
      <div class="links">
        <router-link to="/">Back to Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import RegisterForm from '@/components/RegisterForm.vue'
  

  export default {
    components: {
      RegisterForm
    }
  }
  </script>
  
  <style scoped>
  .register-container {
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