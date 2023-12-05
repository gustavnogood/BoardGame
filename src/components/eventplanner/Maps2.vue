<template>
    <div>
        <h1>Your Location</h1>
        <p> {{ coordinates.lat }} Latitude,  {{ coordinates.lng }} Longitude </p>
    </div>

</template>

<script lang="ts">
    export default {
        data() {
            return {
                coordinates: {
                    lat: 0,
                    lng: 0
                } as { lat: number; lng: number }
            };
        },
        created() {
            // Your logic here
        }
    };
</script>