<template>
    <button @click="logData">Log Data</button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const invitedFriends = ref([]);
  const selectedGames = ref([]);
  
  const logData = () => {
    console.log('Invited Friends:', invitedFriends.value.slice());
    console.log('Selected Games:', selectedGames.value.slice());
  };
  </script>