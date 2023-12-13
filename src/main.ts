
import { createApp } from 'vue';
import App from './App.vue';
import { setupCalendar } from 'v-calendar';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAWm7Xv3C5ZApabF4AtqjyB3uvLr0PuRg",
  authDomain: "boardgame-60717.firebaseapp.com",
  projectId: "boardgame-60717",
  storageBucket: "boardgame-60717.appspot.com",
  messagingSenderId: "322941278304",
  appId: "1:322941278304:web:bead91af0aa8261f64cb05",
  measurementId: "G-G6G65H6C9P"
};

// Initialize Firebase
// @ts-ignore
const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);

createApp(App).use(setupCalendar, {}).mount('#app');

