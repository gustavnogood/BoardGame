import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupCalendar } from 'v-calendar'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "mapbox-gl/dist/mapbox-gl.css"

createApp(App).use(setupCalendar, {}).mount('#app')

