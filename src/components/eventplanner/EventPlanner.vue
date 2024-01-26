<template>
  <div id="event-planner">
    <div class="row">
      <div id="calendar">
        <Calendar v-model="eventDate" />
      </div>
      <div id="friend-list">
        <FriendList v-model="invitedFriends" />
      </div>
    </div>
    <div class="row">
      <div id="board-game-list">
        <BoardGameList :updateSelectedGames="updateSelectedGames" />
      </div>
    </div>
    <div class="row">
      <button id="createEvent" @click="createEvent">Create Event</button>
    </div>
    <div class="row">
      <router-link to="/events">Back to Events</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FriendList from './FriendList.vue';
import Calendar from './Calendar.vue';
import BoardGameList from './BoardGameList.vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_GAMES, GET_USERS } from '../../../server/queries';
import { createEvent as mockCreateEvent, getAllEvents } from './mockApi';

const eventDate = ref(new Date());
const invitedFriends = ref([]);
const selectedGames = ref([]);

const { result: gamesResult } = useQuery(GET_GAMES);
const { result: friendsResult } = useQuery(GET_USERS);

onMounted(() => {
  if (gamesResult.value) {
    // Handle gamesResult.value.data.games
  }

  if (friendsResult.value) {
    // Handle friendsResult.value.data.friends
  }
});

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
 @import url('../../style.css');
</style>