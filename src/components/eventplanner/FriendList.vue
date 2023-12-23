<template>
  <div id="friendsList">
    <h2>Friend List</h2>
    <ul v-if="loading">Loading...</ul>
    <ul v-else>
      <li v-for="friend in friends" :key="friend.id">
        {{ friend.name }}
        <button id="inviteFriend" @click="inviteFriend(friend)">Invite</button>
      </li>
    </ul>
    <h3>Invited Friends</h3>
    <ul>
      <li v-for="invitedFriend in invitedFriends" :key="invitedFriend.id">
        {{ invitedFriend.name }}
        <button id="uninviteFriend" @click="uninviteFriend(invitedFriend)">Uninvite</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUpdated } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_USERS } from '../../../server/queries';

interface Friend {
  id: number;
  name: string;
}

const friends = ref<Friend[]>([]);
const invitedFriends = ref<Friend[]>([]);

const { loading, onResult } = useQuery(GET_USERS);

onMounted(async () => {
  await nextTick();
  console.log('Component mounted - friends:', friends.value.map(friend => ({ ...friend })));
});

onUpdated(async () => {
  await nextTick();
  console.log('FriendList.vue updated - friends:', friends.value.map(friend => ({ ...friend })));
});

onResult((result) => {
  if (!result.loading && result.data) {
    friends.value = result.data.users;
    console.log('Fetched friends:', friends.value.map(friend => ({ ...friend })));
  } else if (!result.loading && result.error) {
    console.error('Error fetching data:', result.error);
  }
});

const inviteFriend = (friend: Friend) => {
  if (!invitedFriends.value.some(invitedFriend => invitedFriend.id === friend.id)) {
    invitedFriends.value.push(friend);
  }
};

const uninviteFriend = (friend: Friend) => {
  invitedFriends.value = invitedFriends.value.filter(invitedFriend => invitedFriend.id !== friend.id);
};
</script>
<style scoped>
 @import url('../../style.css');
</style>