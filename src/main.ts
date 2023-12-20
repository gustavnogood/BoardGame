import { createApp } from 'vue';
import App from './App.vue';
import { setupCalendar } from 'v-calendar';
import { createRouter, createWebHistory } from 'vue-router';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import EventPlanner from './components/eventplanner/EventPlanner.vue';
import EventPage from './components/eventpage/EventPage.vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/event-planner' },
    { path: '/event-planner', component: EventPlanner },
    { path: '/events', component: EventPage },
  ],
});

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
});

const app = createApp(App);


app
  .use(router)
  .use(setupCalendar, {})
  .provide(DefaultApolloClient, apolloClient)
  .use(store);


store.dispatch('initializeStore').then(() => {
  app.mount('#app');
});