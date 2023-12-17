<template>
  <div>
    <button @click="createEvent">Create Event</button>

    <user-attending :eventName="eventData.name" :attendingUsers="eventData.attendingUsers" />
  </div>
</template>

<script setup lang="ts">
import UserAttending from './UserAttending.vue';
import { ref } from 'vue';

const eventData = ref({
  name: 'Your Event Name',
  attendingUsers: [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // Add more users as needed
  ],
});

const createEvent = () => {
  console.log('Event created!');
};
</script>
