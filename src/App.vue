<script setup lang="ts">
import Calendar from './components/eventplanner/Calendar.vue'
import Mapview from './components/eventplanner/Mapview.vue'
import Korv from './components/eventplanner/Korv.vue'
import MapPicker from './components/eventplanner/map/MapPicker.vue'


</script>

<template>
  <div id="calendar"><Calendar/></div>
  <div id="map"><Mapview/></div>
  <div id="korv"> <Korv /></div>
  <div id="mappicker"><MapPicker/></div>
  

</template>

<style scoped>

</style>
