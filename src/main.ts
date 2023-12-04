import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupCalendar } from 'v-calendar';

createApp(App).use(setupCalendar, {}).mount('#app')

