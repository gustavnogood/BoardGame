<template>
  <div>
    <div id="calendar">
      <Calendar v-model="eventDate" />
    </div>
    <div id="friend-list">
      <FriendList v-model="invitedFriends" />
    </div>
    <div id="board-game-list">
      <!-- Pass updateSelectedGames prop to BoardGameList -->
      <BoardGameList :updateSelectedGames="updateSelectedGames" />
    </div>
    <button @click="createEvent">Create Event</button>
    <router-link to="/events">Back to Events</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FriendList from './FriendList.vue';
import Calendar from './Calendar.vue';
import BoardGameList from './BoardGameList.vue';
import { createEvent as mockCreateEvent, getAllEvents } from './mockApi';

const eventDate = ref(new Date());
const invitedFriends = ref([]);
const selectedGames = ref([]);

const createEvent = () => {
  console.log('Entering createEvent function');

  const eventData = {
    date: eventDate.value,
    invitedFriends: invitedFriends.value,
    selectedGames: selectedGames.value,
  };

  console.log('Event data before creation:', eventData);

  mockCreateEvent(eventData);

  // Refresh the events array after creating a new event
  const events = getAllEvents();
  console.log('Event data after creation:', events);

  // Reset selected data
  eventDate.value = new Date();
  invitedFriends.value = [];
  selectedGames.value = [];

  console.log('Exiting createEvent function');
};

// Function to update selectedGames
const updateSelectedGames = (games) => {
  selectedGames.value = games;
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>