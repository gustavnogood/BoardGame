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
import { useStore } from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/event-planner' },
    { path: '/event-planner', component: EventPlanner },
    { path: '/events', component: EventPage },
  ],
});

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Set your GraphQL server endpoint
  cache: new InMemoryCache(),
});

const app = createApp(App);

// Provide the Apollo Client using the DefaultApolloClient key
app.use(router).use(setupCalendar, {}).provide(DefaultApolloClient, apolloClient);

// Use the store
const store = useStore();
app.use(store);

app.mount('#app');
