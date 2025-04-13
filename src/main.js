import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App)
app.use(router)
app.use(Chartkick)
app.mount('#app')