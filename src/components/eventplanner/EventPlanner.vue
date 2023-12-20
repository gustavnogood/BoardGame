<template>
  <div id="event-planner">
    <div>
      <TestLog/>
    </div>
    <div id="calendar">
      <Calendar v-model="eventDate" />
    </div>
    <div id="friend-list">
      <FriendList v-model="invitedFriends" />
    </div>
    <div id="board-game-list">
      <BoardGameList :updateSelectedGames="updateSelectedGames" />
    </div>
    <button @click="createEvent" to="/events">Create Event</button>
    <router-link to="/events">Back to Events</router-link>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import FriendList from './FriendList.vue';
import Calendar from './Calendar.vue';
import BoardGameList from './BoardGameList.vue';
import TestLog from './TestLog.vue' 

const store = useStore();
const eventDate = ref(new Date());
const invitedFriends = ref([]);
const selectedGames = ref([]);



const createEvent = () => {
  const eventData = {
    date: eventDate.value,
    invitedFriends: invitedFriends.value.slice(), 
  };

  store.dispatch('createEvent', eventData);

  // Reset selected data
  eventDate.value = new Date();
  invitedFriends.value = [];


};



const updateSelectedGames = (games) => {
  selectedGames.value = games;
};
</script>

<style>
 @import url('../../style.css');
</style>