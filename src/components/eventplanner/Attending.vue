<template>
    <div>
      <h2>Attending Component</h2>
      
      <button @click="toggleAttendance">Toggle Attendance</button>
      
      <p>Status: {{ attendanceStatus }}</p>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      isAttending: false,
    };
  },
  methods: {
    toggleAttendance() {
      this.isAttending = !this.isAttending;
      this.logAttendance();
    },
    logAttendance() {
      console.log(`Attending status: ${this.isAttending ? 'Attending' : 'Not Attending'}`);
    },
  },
  computed: {
    attendanceStatus() {
      return this.isAttending ? 'Attending' : 'Not Attending';
    },
  },
  mounted() {
    this.logAttendance();
  },
};
</script>

<style scoped>
</style>