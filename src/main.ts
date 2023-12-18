import { createApp } from 'vue';
import App from './App.vue';
import { setupCalendar } from 'v-calendar';
import { createRouter, createWebHistory } from 'vue-router';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import EventPlanner from './components/eventplanner/EventPlanner.vue';
import EventPage from './components/eventpage/EventPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/event-planner' },
    { path: '/event-planner', component: EventPlanner },
    { path: '/events', component: EventPage },
  ],
});

createApp(App).use(router).use(setupCalendar, {}).mount('#app');