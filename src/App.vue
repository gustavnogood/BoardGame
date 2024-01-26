<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  // Redirect to the event page by default
  if (route.path === '/') {
    router.push('/events');
  }
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>