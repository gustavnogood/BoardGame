<template>
  <div id="gameList">
    <h2>Board Game List</h2>
    <ul v-if="loading">Loading...</ul>
    <ul v-else>
      <li v-for="game in games" :key="game.id">
        {{ game.name }}
        <button id="addGame" @click="addGameFromList(game)">Add</button>
      </li>
    </ul>
    <h3>Selected Games</h3>
    <ul>
      <li v-for="selectedGame in selectedGames" :key="selectedGame.id">
        {{ selectedGame.name }}
        <button id="removeGame" @click="removeGame(selectedGame)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUpdated } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_GAMES } from '../../../server/queries';

interface Game {
  id: number;
  name: string;
  category: string;
  numberOfPlayers: number;
  time: string;
}

const games = ref<Game[]>([]);
const selectedGames = ref<Game[]>([]);

const { loading, onResult } = useQuery(GET_GAMES);

onMounted(async () => {
  await nextTick();
  console.log('Component mounted - games:', games.value.map(game => ({ ...game })));
});

onUpdated(async () => {
  await nextTick();
  console.log('BoardGameList.vue updated - games:', games.value.map(game => ({ ...game })));
});

onResult((result) => {
  if (!result.loading && result.data) {
    games.value = result.data.games;
    console.log('Fetched games:', games.value.map(game => ({ ...game })));
  } else if (!result.loading && result.error) {
    console.error('Error fetching data:', result.error);
  }
});

const addGameFromList = (game: Game) => {
  if (!selectedGames.value.some(selectedGame => selectedGame.id === game.id)) {
    selectedGames.value.push(game);
  }
};

const removeGame = (game: Game) => {
  selectedGames.value = selectedGames.value.filter(selectedGame => selectedGame.id !== game.id);
};




</script>
<style scoped>
 @import url('../../style.css');
</style>