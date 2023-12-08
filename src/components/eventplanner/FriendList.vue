<template>
    <div>
      <h2>Friend List</h2>
      <input v-model="searchQuery" placeholder="Search friends..." />
      <ul>
        <li v-for="friend in filteredFriends" :key="friend.id">
          {{ friend.name }}
          <button @click="inviteFriend(friend)">Invite</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, computed } from 'vue';


interface Friend {
  id: number;
  name: string;
}
  
  const friends = ref([
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
  ]);
  
  const searchQuery = ref('');
  
  const filteredFriends = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return friends.value.filter((friend) =>
      friend.name.toLowerCase().includes(query)
    );
  });
  
  const inviteFriend = (friend: Friend) => {
    console.log(`Inviting ${friend.name} to the event`);
  };
  </script>