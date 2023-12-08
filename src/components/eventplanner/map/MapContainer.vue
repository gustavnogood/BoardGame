<template>
    <div>
      <div ref="map" class="map-container"></div>
      <PinInfo ref="pinInfo" :marker="marker" :map="map" @dragend="onMarkerDragend" />
    </div>
  </template>
  
  <script>
  import mapboxgl from "mapbox-gl";
  import PinInfo from "./PinInfo.vue";
  
  export default {
    props: {
      defaultLocation: Object,
    },
    data() {
      return {
        map: null,
        marker: null,
      };
    },
    mounted() {
      console.log("MapContainer component mounted");
      mapboxgl.accessToken = "pk.eyJ1IjoiZ3VsbGVndXJyYSIsImEiOiJjbHBzOXp6NDMwMWw4MnBxbXUwcG9heGhzIn0.ZZr-JrbhXCVrZcZAlW_DTg";
      this.initMap();
    },
    methods: {
      async initMap() {
        await this.$nextTick();
  
        if (!this.map) {
          const fixedInitialCenter = {
            lat: 8.9806,
            lng: 38.7578,
          };
  
          this.map = new mapboxgl.Map({
            container: this.$refs.map,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [fixedInitialCenter.lng, fixedInitialCenter.lat],
            zoom: 18,
          });
  
          this.marker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([fixedInitialCenter.lng, fixedInitialCenter.lat])
            .addTo(this.map);
  
          this.marker.on("dragend", () => {
            const lngLat = this.marker.getLngLat();
            this.$emit("input", { lat: lngLat.lat, lng: lngLat.lng });
          });
  
          this.map.on("click", (e) => {
            const lngLat = e.lngLat;
            this.$emit("input", { lat: lngLat.lat, lng: lngLat.lng });
            this.marker.setLngLat([lngLat.lng, lngLat.lat]);
          });
  
          this.map.on("load", () => {
            console.log("Map loaded");
            this.updatePinInfo();
          });
        }
      },
      updatePinInfo() {
        if (this.$refs.pinInfo) {
          this.$refs.pinInfo.$refs.pinInfo.innerHTML = `<p>Pin Location:</p><p>${this.getCoordinatesInfo()}</p>`;
        }
      },
      onMarkerDragend(lngLat) {
        this.$emit("markerDragend", lngLat);
      },
      getCoordinatesInfo() {
        if (this.marker) {
          const lngLat = this.marker.getLngLat();
          return `Lat: ${lngLat.lat.toFixed(6)}, Lng: ${lngLat.lng.toFixed(6)}`;
        }
        return "No coordinates available";
      },
    },
    components: {
      PinInfo,
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    height: 400px;
  }
  </style>
  