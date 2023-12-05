<template>
    <l-map ref="map">
       <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      />
    </l-map>
  </template>
  <script>

  import { LMap, LTileLayer} from "vue2-leaflet";
  export default {
    components: {
      LMap,
      LTileLayer
    },
    data() {
      return {
        tileProvider: {
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      }
    }
  };
  </script>