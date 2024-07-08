import { createApp } from 'vue'
import AppVue from './App.vue'
import createRouter from './router'
import './assets/styles.css'

const app = createApp(AppVue)
app.use(createRouter())
app.mount('#app')
