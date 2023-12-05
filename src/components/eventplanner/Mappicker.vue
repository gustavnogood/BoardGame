<template>
  <div>
    <div ref="map" class="map-container"></div>
    <div class="pin-info" ref="pinInfo">
      <p>Pin Location:</p>
      <p>{{ getCoordinatesInfo() }}</p>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "Mappicker",
  props: {
    value: {
      type: Object,
      required: false,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 8.9806,
        lng: 38.7578,
      }),
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      userLocation: {},
      address: null,
    };
  },
  computed: {
    initialCenter() {
      return this.value || this.userLocation || this.defaultLocation;
    },
  },
  mounted() {
    mapboxgl.accessToken = "pk.eyJ1IjoiZ3VsbGVndXJyYSIsImEiOiJjbHBzOXp6NDMwMWw4MnBxbXUwcG9heGhzIn0.ZZr-JrbhXCVrZcZAlW_DTg";

    this.initMap().then(() => {
      this.getUserPosition();
    });
  },
  watch: {
    value: {
      deep: true,
      async handler(position) {
        this.address = await this.getAddress();
        this.marker.setLngLat([position.lng, position.lat]);
        this.map.setCenter([position.lng, position.lat]);
        this.updatePinInfo();
        this.$emit("input", { position, address: this.address });
      },
    },
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
    async getUserPosition() {
      if (navigator.geolocation) {
        try {
          const pos = await this.getCurrentPosition();
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          if (this.map) {
            this.map.setCenter([this.userLocation.lng, this.userLocation.lat]);
          }
        } catch (error) {
          console.error("Error getting user position:", error.message);
        }
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    async getAddress() {
      // Assuming you have a method to get the address based on lngLat
      // Replace this with your actual implementation
      return "123 Main Street, City";
    },
    getCoordinatesInfo() {
      if (this.marker) {
        const lngLat = this.marker.getLngLat();
        return `Lat: ${lngLat.lat.toFixed(6)}, Lng: ${lngLat.lng.toFixed(6)}`;
      }
      return "No coordinates available";
    },

    updatePinInfo() {
      this.$refs.pinInfo.innerHTML = `<p>Pin Location:</p><p>${this.getCoordinatesInfo()}</p>`;
    },
  },
};

</script>

<style scoped>
.map-container {
  height: 400px;
}

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
