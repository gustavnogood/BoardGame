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
  import { ref, computed } from 'vue';
  
  interface BoardGame {
    id: number;
    name: string;
  }
  
  const games = ref<BoardGame[]>([
    { id: 1, name: 'Game 1' },
    { id: 2, name: 'Game 2' },
  ]);
  
  const searchQuery = ref('');
  
  const filteredGames = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return games.value.filter((game) =>
      game.name.toLowerCase().includes(query)
    );
  });
  
  const selectedGames = ref<BoardGame[]>([]);
  
  const addGame = (game: BoardGame) => {
    if (!selectedGames.value.some((selectedGame) => selectedGame.id === game.id)) {
      selectedGames.value.push(game);
    }
  };
  
  const removeGame = (game: BoardGame) => {
    selectedGames.value = selectedGames.value.filter(
      (selectedGame) => selectedGame.id !== game.id
    );
  };
  </script>