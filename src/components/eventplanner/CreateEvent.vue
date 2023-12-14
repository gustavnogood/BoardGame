<template>
    <div>
      <button @click="createEvent">Create Event</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      createEvent() {
        console.log('Event created!');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  