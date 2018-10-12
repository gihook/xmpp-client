<template>
  <div class="container">
    <form @submit.prevent="searchForChatRooms">
      <md-field>
        <md-input v-model="server"></md-input>
      </md-field>
      <md-button type="submit">Search</md-button>
    </form>
    <div class="rooms">
      <md-list>
        <md-list-item v-for="(room, index) in rooms" :key="index">
          <router-link :to="{ name: 'group-chat', params: { jid: room.address} }">
            <span class="md-list-item-text">{{ room.name }} {{ room.address }}</span>
          </router-link>
        </md-list-item> 
      </md-list>
    </div>
  </div>
</template>

<script>
import {
  searchForChatRooms,
  searchChatRoomsListener
} from '../services/message-service'

export default {
  name: 'SearchPage',
  data () {
    return {
      server: 'muc.xmpp.org',
      rooms: []
    }
  },
  methods: {
    searchForChatRooms () {
      this.rooms = []
      searchForChatRooms(this.server)
      searchChatRoomsListener(this.server, (rooms) => {
        this.rooms = rooms
      })
    }
  }
}
</script>

<style lang="scss">
.rooms {
  padding: 20px;
}

.rooms li {
  border-bottom: 1px solid black;
  margin: 2px;
}

.md-list {
  width: 520px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
  cursor: pointer;
}

.md-list-item:hover {
  color: gray;
}
</style>
