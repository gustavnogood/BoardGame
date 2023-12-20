<template>
  <div id="eventPage">
    <h1>Event Page</h1>


    <div v-if="latestEvent">
      <p>Date: {{ latestEvent.date }}</p>
      <p>Invited Friends: {{ invitedFriends.map((friend) => friend.name).join(', ') }}</p>
      <p>Selected Games: {{ selectedGames.map((game) => game.name).join(', ') }}</p>
    </div>


    <router-link to="/event-planner">Create Event</router-link>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();


const invitedFriends = computed(() => store.getters.invitedFriends);
const selectedGames = computed(() => store.getters.selectedGames);

const latestEvent = ref(store.getters.latestEvent);


watch(() => store.getters.selectedGames, (newSelectedGames) => {
  console.log('Selected Games:', newSelectedGames);
}, { immediate: true });
watch(() => store.getters.invitedFriends, (newInvitedFriends) => {
  console.log('Selected Games:', newInvitedFriends);
}, { immediate: true });



onMounted(() => {
  store.dispatch('initializeStore');
});


</script>

<style scoped>
 @import url('../../style.css');
 </style>