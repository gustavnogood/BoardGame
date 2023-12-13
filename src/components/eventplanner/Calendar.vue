<script lang="ts">
  import { Calendar, DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';
  import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
  
  
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
  methods: {
    async saveDateToFirestore() {
      try {
        const db = getFirestore();
        const datesCollection = collection(db, 'dates'); // Replace 'dates' with your Firestore collection name

        await addDoc(datesCollection, {
          selectedDate: this.date,
          timestamp: serverTimestamp(),
        });

        console.log('Date saved to Firestore');
      } catch (error) {
        console.error('Error saving date to Firestore', error);
      }
    },
  },
};
</script>

<template>
    <DatePicker v-model="date"/>
    <button @click="saveDateToFirestore()">Add Date</button>
</template>