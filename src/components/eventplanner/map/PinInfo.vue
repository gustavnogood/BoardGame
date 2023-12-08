<template>
  <div>
    <div class="pin-info" ref="pinInfo">
      <p>Pin Location:</p>
      <p>{{ coordinatesInfo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marker: Object,
    map: Object,
  },
  computed: {
    coordinatesInfo() {
      if (this.marker) {
        const lngLat = this.marker.getLngLat();
        return `Lat: ${lngLat.lat.toFixed(6)}, Lng: ${lngLat.lng.toFixed(6)}`;
      }
      return "No coordinates available";
    },
  },
  watch: {
    marker: {
      handler() {
        this.updatePinInfo();
      },
      immediate: true,
    },
  },
  methods: {
    updatePinInfo() {
      // Ensure that this.$refs.pinInfo is defined before updating its content
      if (this.$refs.pinInfo) {
        this.$refs.pinInfo.innerHTML = `<p>Pin Location:</p><p>${this.coordinatesInfo}</p>`;
      }
    },
  },
};
</script>

<style scoped>
.pin-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
