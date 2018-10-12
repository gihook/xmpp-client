<template>
  <div class="container">
    <h1>{{ subject }}</h1>
    <h2>{{ this.address }}</h2>
    <ul>
      <li v-for="(item, index) in loggedUsers" :key="index">
        <span v-bind:class="{ active: item.status }">{{ item.from }} {{ item.status }}</span>
      </li>
    </ul>
    <md-list>
      <md-list-item v-for="(item, index) in messages" :key="index">
        <span><b>{{ item.sender }}</b>: {{ item.message }}</span>
      </md-list-item> 
    </md-list>
    <form @submit.prevent="sendMessage">
      <md-field>
        <md-textarea v-model="newMessage"></md-textarea>
      </md-field>
      <md-button type="submit">Send</md-button>
    </form>
  </div>
</template>

<script>
import { joinRoom, groupChatListener, sendGroupChatMessage } from '../services/message-service'

export default {
  name: 'GroupChat',
  data () {
    return {
      messages: [],
      subject: '',
      newMessage: '',
      address: '',
      loggedUsers: []
    }
  },
  methods: {
    sendMessage () {
      sendGroupChatMessage({ message: this.newMessage, to: this.address })
    }
  },
  created () {
    this.address = this.$route.params.jid
    const room = { address: this.address }
    joinRoom(room, (user) => {
      this.loggedUsers = [...this.loggedUsers, user]
    })
    groupChatListener(this.address, (message) => {
      if (message.sender) {
        this.messages = [...this.messages, message]
      }

      if (message.subject) {
        this.subject = message.subject
      }
    })
  }
}
</script>

<style scoped>
.active {
  color: green;
}
</style>
