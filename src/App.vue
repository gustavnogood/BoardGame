<template>
  <div>
    <div id="calendar">
      <Calendar />
    </div>
    <div id="friend-list">
      <FriendList />
    </div>
    <div id="board-game-list">
      <BoardGameList />
    </div>
    <div id="attending">
      <Attending />
    </div>
    <div id="create-event">
      <CreateEvent />
    </div>
  </div>
</template>

<script setup lang="ts">
import FriendList from './components//eventplanner/FriendList.vue';
import Calendar from './components/eventplanner/Calendar.vue';
import BoardGameList from './components/eventplanner/BoardGameList.vue';
import Attending from './components/eventplanner/Attending.vue';
import CreateEvent from './components/eventplanner/CreateEvent.vue';
</script>

<style scoped>
</style>