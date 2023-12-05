<template>
  <div ref="mapElement"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L, { Map } from 'leaflet';

const mapElement = ref<HTMLElement | null>(null);
let map: Map | undefined;

onMounted(() => {
  if (mapElement.value) {
    map = L.map(mapElement.value, {
      center: [51.505, -0.09],
      zoom: 13,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } else {
    console.error('Error: mapElement is null or undefined');
  }
});
</script>