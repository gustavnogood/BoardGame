<template>
  <div>
    <div id="calendar">
      <Calendar v-model="eventDate" />
    </div>
    <div id="friend-list">
      <FriendList v-model="invitedFriends" />
    </div>
    <div id="board-game-list">
      <BoardGameList :updateSelectedGames="updateSelectedGames" />
    </div>
    <button @click="createEvent">Create Event</button>
    <router-link to="/events">Back to Events</router-link>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, onMounted, toRefs, Ref, nextTick  } from 'vue';
import FriendList from './FriendList.vue';
import Calendar from './Calendar.vue';
import BoardGameList from './BoardGameList.vue';

const store = useStore();
const eventDate = ref(new Date());
const invitedFriends: Ref<{ id: number; name: string }[]> = ref([]);
const selectedGames: Ref<{ id: number; name: string }[]> = ref([]);

// Load events from localStorage on component setup
store.dispatch('loadEvents');

const createEvent = () => {
  const eventData = {
    date: eventDate.value,
    invitedFriends: invitedFriends.value,
    selectedGames: selectedGames.value,
  };

  console.log('Event Data:', eventData);

  // Dispatch the createEvent action from the Vuex store
  store.dispatch('createEvent', eventData);

  // Reset selected data
  eventDate.value = new Date();
  invitedFriends.value = [];
  selectedGames.value = [];
};

const updateSelectedGames = (games) => {
  selectedGames.value = games;
};

// Watch for changes in the Vuex store events and update local state
onMounted(() => {
  const events = store.state.events;

  // Update local state when events change in the store
  if (events.length > 0) {
    const latestEvent = events[events.length - 1];
    const { invitedFriends: iFriends, selectedGames: sGames } = toRefs(latestEvent);

    eventDate.value = new Date(latestEvent.date);
    invitedFriends.value = iFriends.value;
    selectedGames.value = sGames.value;
  }
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>