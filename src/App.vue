<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {

  if (route.path === '/') {
    router.push('/events');
  }
});
</script>

<style scoped>
   @import url('./style.css');
</style>