<script lang="ts">
  import { Calendar, DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';
  
  console.log("denna kommer från komponenten")
  
  export default {
    components: {
      Calendar,
      DatePicker,
    },
    data() {
      return {
        date: new Date(),
      };
    },
  }
</script>

<template>
    <DatePicker v-model="date"/>
</template>