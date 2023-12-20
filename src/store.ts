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

      localStorage.setItem('invitedFriends', JSON.stringify(state.invitedFriends));
      console.log('Added invited friend:', friend);
      console.log('Invited friends after mutation:', state.invitedFriends);
    },
    
    removeInvitedFriend(state, friend: Friend) {
      state.invitedFriends = state.invitedFriends.filter(f => f.id !== friend.id);

      localStorage.setItem('invitedFriends', JSON.stringify(state.invitedFriends));
      console.log('Removed invited friend:', friend);
      console.log('Invited friends after mutation:', state.invitedFriends);
    },
    addSelectedGame(state, game: Game) {
      state.selectedGames.push(game);
    },
    removeSelectedGame(state, game: Game) {
      state.selectedGames = state.selectedGames.filter(g => g.id !== game.id);
    },
    createEvent(state, eventData: Event) {
      console.log('Received Event Data:', eventData);
      state.events.push(eventData);

      localStorage.setItem(localStorageKey, JSON.stringify(state.events));
    },

    removeSelectedGames(state, selectedGames) {
      state.selectedGames = selectedGames;
    },

    removeInvitedFriends(state, invitedFriends) {
      state.invitedFriends = invitedFriends;
    },

    setInitialData(state) {
      const storedEvents = localStorage.getItem(localStorageKey);
      if (storedEvents) {
        state.events = JSON.parse(storedEvents);
        const latestEvent = state.events[state.events.length - 1];
        if (latestEvent) {
          state.invitedFriends = latestEvent.invitedFriends || [];
          state.selectedGames = latestEvent.selectedGames || [];
        }
      }
    
      const storedFriends = localStorage.getItem('friends');
      if (storedFriends) {
        state.friends = JSON.parse(storedFriends);
      }
    

      const storedInvitedFriends = localStorage.getItem('invitedFriends');
      if (storedInvitedFriends) {
        state.invitedFriends = JSON.parse(storedInvitedFriends);
      }

      localStorage.setItem('invitedFriends', JSON.stringify(state.invitedFriends));
    },
    loadInvitedFriends(state) {
      const storedInvitedFriends = localStorage.getItem('invitedFriends');
      if (storedInvitedFriends) {
        state.invitedFriends = JSON.parse(storedInvitedFriends);
        console.log('Loaded invited friends:', state.invitedFriends);
      } else {
        console.log('No invited friends found in localStorage');
      }
    },
    loadEvents(state) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        state.events = JSON.parse(storedEvents);
        console.log('Loaded events:', state.events);
      } else {
        console.log('No events found in localStorage');
      }
    },
  },
  actions: {
    createEvent({ commit, state }, eventData: Event) {

      const invitedFriendsCopy = state.invitedFriends.slice();
      const selectedGamesCopy = state.selectedGames.slice();


      const eventDataWithArrays = {
        ...eventData,
        invitedFriends: invitedFriendsCopy,
        selectedGames: selectedGamesCopy,
      };

      commit('createEvent', eventDataWithArrays);


      commit('removeSelectedGames', state.selectedGames);
      commit('removeInvitedFriends', state.invitedFriends);
    },
  
    initializeStore({ commit, dispatch }) {
      console.log('Dispatching initializeStore action');
      commit('loadEvents');

      dispatch('loadInvitedFriends'); 
    },
    addInvitedFriend({ commit }, friend) {
      commit('addInvitedFriend', friend);
    },
    removeInvitedFriend({ commit }, friend) {
      commit('removeInvitedFriend', friend);
    },
    loadInvitedFriends({ commit }) {
      console.log('Dispatching loadInvitedFriends action');
      const storedInvitedFriends = localStorage.getItem('invitedFriends');
      console.log('Stored invited friends:', storedInvitedFriends);
      if (storedInvitedFriends) {
        const invitedFriends = JSON.parse(storedInvitedFriends);
        commit('loadInvitedFriends', invitedFriends);
        console.log('Loaded invited friends:', invitedFriends);
      } else {
        console.log('No invited friends found in localStorage');
      }
    }
  },
  getters: {
    invitedFriends: (state) => state.invitedFriends,
    selectedGames: (state) => state.selectedGames,
    latestEvent: (state) => {
      return state.events.length > 0 ? state.events[state.events.length - 1] : null;
    },
    allFriends: (state) => state.friends,
  },
});