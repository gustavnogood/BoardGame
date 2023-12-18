<template>
  <div>
    <h2>Board Game List</h2>
    <input v-model="searchQuery" placeholder="Search board games..." />
    <ul>
      <li v-for="game in filteredGames" :key="game.id">
        {{ game.name }}
        <button @click="addGame(game)">Add</button>
      </li>
    </ul>

    <h3>Selected Games</h3>
    <ul>
      <li v-for="selectedGame in selectedGames" :key="selectedGame.id">
        {{ selectedGame.name }}
        <button @click="removeGame(selectedGame)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, onUpdated, PropType } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_GAMES } from '../../../server/queries';

interface BoardGame {
  id: number;
  name: string;
}

interface BoardGameData {
  games: BoardGame[]; // Assuming 'games' is the property returned by your GraphQL query
}

interface Game {
  id: number;
  name: string;
  category: string;
  numberOfPlayers: number;
  time: string;
}

export default {
  props: {
    updateSelectedGames: {
      type: Function as PropType<(games: BoardGame[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const { loading, error, data } = useQuery<BoardGameData>(GET_GAMES);

    const games = ref<Game[]>([]);

    if (data && 'games' in data.value) {
    games.value = data.value.games;
    }

    console.log('Data:', data);

    const searchQuery = ref('');

    const filteredGames = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return games.value.filter((game) =>
        game.name.toLowerCase().includes(query)
      );
    });

    const selectedGames = ref<Game[]>([]);

    const addGame = (game: Game) => {
      if (!selectedGames.value.some((selectedGame) => selectedGame.id === game.id)) {
        selectedGames.value.push(game);
        props.updateSelectedGames(selectedGames.value);
      }
    };

    const removeGame = (game: Game) => {
      selectedGames.value = selectedGames.value.filter(
        (selectedGame) => selectedGame.id !== game.id
      );
      props.updateSelectedGames(selectedGames.value);
    };

    onUpdated(() => {
      console.log('BoardGameList.vue updated - selectedGames:', selectedGames.value);
    });

    return {
      searchQuery,
      filteredGames,
      selectedGames,
      addGame,
      removeGame,
      loading,
      error,
    };
  },
};
</script>