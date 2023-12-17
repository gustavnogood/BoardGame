<template>
    <div>
      <h2>User Attending</h2>
      <p>User attending: {{ eventName }}</p>
      <ul>
        <li v-for="user in attendingUsers" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface User {
    id: number;
    name: string;
  }
  
  export const eventName = ref<string>('');
  export const attendingUsers = ref<User[]>([]);
  
  export const setEventName = (name: string) => {
    eventName.value = name;
  };
  
  export const setAttendingUsers = (users: User[]) => {
    attendingUsers.value = users;
  };
  </script>
  
  <style scoped>
  </style>
  