<!--
<template>
  <router-view/>
</template>

<style>
/* Add global styles here if needed */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  background-image: url('https://content.presspage.com/uploads/2580/1920_utown.jpg?10000');
}
</style>
-->
<template>
  <div id="app">
    <div class="top-links" v-if="showButtons">
      <router-link class="link" to="/" @click.native="logout">Logout</router-link>
      <router-link v-if="!isMain" class="link" to="/main">Return to Home</router-link>
    </div>
    <router-view />
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const authPages = ['login', 'register', 'reset-password']
const showButtons = computed(() => !authPages.includes(route.name))
const isMain = computed(() => route.name === 'main')

function logout() {
  localStorage.removeItem('loggedIn')
}
</script>


<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  background-image: url('https://content.presspage.com/uploads/2580/1920_utown.jpg?10000');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.top-links {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.link {
  background: rgba(255, 255, 255, 0.7);
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  color: #333;
  transition: background 0.3s;
}

.link:hover {
  background: rgba(255, 255, 255, 0.9);
}
</style>
