<template>
    <div class="login-container">
      <h1>Login</h1>
      <LoginForm />
      <div class="links">
        <router-link to="/reset-password">Forgot Password?</router-link>
        <router-link to="/register">Create Account</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue'
  
  export default {
    components: {
      LoginForm
    }
  }
  </script>
  
  <style scoped>
  .login-container {
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
    display: flex;
    justify-content: space-between;
  }
  
  a {
    color: #42b983;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>