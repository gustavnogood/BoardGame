<template>
    <div>
      <MapContainer :defaultLocation="defaultLocation" @markerDragend="onMarkerDragend" />
    </div>
  </template>
  
  <script>
  import MapContainer from "./MapContainer.vue"; // Adjusted import statement
  
  export default {
    name: "MapPicker",
    props: {
      value: Object,
      defaultLocation: Object,
    },
    methods: {
      onMarkerDragend(lngLat) {
        this.$emit("input", { lat: lngLat.lat, lng: lngLat.lng });
      },
    },
    components: {
      MapContainer, // Adjusted component registration
    },
  };
  </script>
  
  <style scoped>
  /* Add styles specific to MapPicker.vue here */
  </style>
  