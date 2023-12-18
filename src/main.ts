
import { createApp } from 'vue';
import App from './App.vue';
import { setupCalendar } from 'v-calendar';


createApp(App).use(setupCalendar, {}).mount('#app');

