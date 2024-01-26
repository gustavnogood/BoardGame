<template>
  <div id="eventPage">
    <h1 id="eventHeader">Vuealizers Boardgame</h1>

    <!-- Display the latest event information -->
    <div v-if="latestEvent">
      <!-- <pre>{{ latestEvent }}</pre> -->
      <p>Date: {{ latestEvent.date }}</p>
      <p>Invited Friends: {{ latestEvent.invitedFriends.join(', ') }}</p>

      <!-- Display the selected games -->
      <p>Selected Games: {{ latestEvent.selectedGames.map(game => game.name).join(', ') }}</p>
    </div>

    <!-- Link to the event planner page -->
    <router-link to="/event-planner" class="event-link">Create Event</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getAllEvents } from '../eventplanner/mockApi';

interface Event {
  date: Date;
  invitedFriends: string[];
  selectedGames: { id: number; name: string }[];
  // Add other properties as needed
}

const events = ref(getAllEvents()); // Ensure events are correctly fetched
const latestEvent = ref<Event | null>(null);

// Watch for changes in the events array and update the latestEvent accordingly
watch(events, (newEvents) => {
  if (newEvents.length > 0) {
    latestEvent.value = newEvents[newEvents.length - 1];
  }
});

// Get the latest event on component mount
onMounted(() => {
  if (events.value.length > 0) {
    latestEvent.value = events.value[events.value.length - 1];
  }
});
</script>
<style scoped>
 @import url('../../style.css');
</style>