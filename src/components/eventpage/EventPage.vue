<template>
  <div>
    <h1>Event Page</h1>

    <!-- Display the latest event information -->
    <div v-if="latestEvent">
      <p>Date: {{ latestEvent.date }}</p>
      <p>Invited Friends: {{ invitedFriends.map((friend) => friend.name).join(', ') }}</p>
      <p>Selected Games: {{ selectedGames.map((game) => game.name).join(', ') }}</p>
    </div>

    <!-- Link to the event planner page -->
    <router-link to="/event-planner">Create Event</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Use computed properties derived from the store's state
const invitedFriends = computed(() => store.getters.invitedFriends);
const selectedGames = computed(() => store.getters.selectedGames);

const latestEvent = ref(store.getters.latestEvent);

// Watch for changes in the events array and update the latestEvent accordingly
watch(() => store.state.events, (newEvents) => {
  console.log('New Events:', newEvents);
  if (newEvents.length > 0) {
    latestEvent.value = newEvents[newEvents.length - 1];
    console.log('Latest Event:', latestEvent.value);
  }
}, { immediate: true });

// Get the latest event on component mount
onMounted(() => {
  if (store.state.events.length > 0) {
    latestEvent.value = store.state.events[store.state.events.length - 1];
    console.log('Latest Event on Mount:', latestEvent.value);
  }
});

// Type definition for the Event structure
interface Event {
  date: Date;
  invitedFriends: string[];
  selectedGames: { id: number; name: string }[];
  // Add other properties as needed
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>