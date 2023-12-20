<template>
  <div>
    <DatePicker v-model="date" />
    <button id="addDate" @click="saveDateToPostgres()">Add Date</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const date = ref(new Date());

const saveDateToPostgres = async () => {
  try {
    const response = await fetch('/api/v1/saveDateToPostgres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date.value.toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save date to PostgreSQL');
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error saving date to PostgreSQL', error);
  }
};
</script>

<style scoped>
 @import url('../../style.css');
</style>