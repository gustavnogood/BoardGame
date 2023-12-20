import { createStore } from 'vuex';

interface RootState {
  invitedFriends: Friend[];
  selectedGames: Game[];
  friends: Friend[];
  events: Event[];
}

interface Friend {
  id: number;
  name: string;
}

interface Game {
  id: number;
  name: string;
  category: string;
  numberOfPlayers: number;
  time: string;
}

interface Event {
  date: Date;
  invitedFriends: Friend[];
  selectedGames: Game[];
}

const localStorageKey = 'events';

export default createStore<RootState>({
  state: {
    invitedFriends: [],
    selectedGames: [],
    friends: [],
    events: [],
  },
  mutations: {
    addInvitedFriend(state, friend: Friend) {
      state.invitedFriends.push(friend);
    },
    removeInvitedFriend(state, friend: Friend) {
      state.invitedFriends = state.invitedFriends.filter((f: Friend) => f.id !== friend.id);
    },
    addSelectedGame(state, game: Game) {
      state.selectedGames.push(game);
    },
    removeSelectedGame(state, game: Game) {
      state.selectedGames = state.selectedGames.filter((g: Game) => g.id !== game.id);
    },
    createEvent(state, eventData: Event) {
      console.log('Received Event Data:', eventData);
      state.events.push(eventData);
      // Save events to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(state.events));
    },
    loadEvents(state) {
      // Load events from localStorage on startup
      console.log('Loading events from localStorage');
      const storedEvents = localStorage.getItem(localStorageKey);
      if (storedEvents) {
        state.events = JSON.parse(storedEvents);
        console.log('Loaded events:', state.events);
      } else {
        console.log('No events found in localStorage');
      }
    },
  },
  actions: {
    createEvent({ commit }, eventData: Event) {
      commit('createEvent', eventData);
    },
    loadEvents({ commit }) {
      console.log('Dispatching loadEvents action');
      commit('loadEvents');
    },
  },
  getters: {
    invitedFriends: (state) => state.invitedFriends,
    selectedGames: (state) => state.selectedGames,
    latestEvent: (state) => {
      return state.events.length > 0 ? state.events[state.events.length - 1] : null;
    },
  },
});