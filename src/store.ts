import { createStore, Store } from 'vuex';

interface AppState {
  invitedFriends: string[];
  selectedGames: { id: number; name: string }[];
}

const store = createStore({
  state: {
    invitedFriends: [],
    selectedGames: [],
  } as AppState,
  mutations: {
    setInvitedFriends(state: AppState, friends: string[]) {
      state.invitedFriends = friends;
    },
    setSelectedGames(state: AppState, games: { id: number; name: string }[]) {
      state.selectedGames = games;
    },
  },
  actions: {},
  getters: {},
});

export function useStore(): Store<AppState> {
  return store as Store<AppState>;
}