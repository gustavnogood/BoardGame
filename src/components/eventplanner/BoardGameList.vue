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


<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_GAMES, CREATE_GAME } from '../../../server/queries';

// Type annotations
interface Game {
  id: number;
  name: string;
  category: string;
  numberOfPlayers: number;
  time: string;
}

const { loading, error, data } = useQuery(GET_GAMES);
const games = ref<Game[]>([]); // Provide the type for games

if (data && 'games' in data.value) {
  games.value = data.value.games as Game[]; // Cast the value to Game[]
}

const searchQuery = ref('');

const filteredGames = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return games.value.filter((game) =>
    game.name.toLowerCase().includes(query)
  );
});

const selectedGames = ref<Game[]>([]); // Provide the type for selectedGames

const { mutate: createGame } = useMutation(CREATE_GAME);

const addGame = async (game: Game) => {
  try {
    const result = await createGame({
      input: {
        name: game.name,
        category: game.category,
        numberOfPlayers: game.numberOfPlayers,
        time: game.time,
      },
    });

    // Check if result.data exists before accessing properties
    if (result && result.data && result.data.createGame) {
      selectedGames.value.push(result.data.createGame as Game);
    } else {
      console.error('Error adding new game: Invalid result data');
    }
  } catch (error) {
    console.error('Error adding new game:', error);
  }
};

const removeGame = (game: Game) => { // Provide the type for game
  selectedGames.value = selectedGames.value.filter(
    (selectedGame) => selectedGame.id !== game.id
  );
};

onUpdated(() => {
  console.log('BoardGameList.vue updated - selectedGames:', selectedGames.value);
});
</script>