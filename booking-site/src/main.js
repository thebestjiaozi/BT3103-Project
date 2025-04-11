import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'  // updated import path

createApp(App).use(router).mount('#app')
