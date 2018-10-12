<template>
  <div class="container">
    <div class="message-list">
      <md-list>
        <md-list-item v-for="(item, index) in messages" :key="index">
          <span class="md-list-item-text" v-bind:class="{ 'mine-message': isMine(item) }">{{ item.message }}</span>
        </md-list-item> 
      </md-list>
    </div>
    <form @submit.prevent="sendMessage" class="messaging-area">
      <md-field>
        <md-textarea v-model="newMessage"></md-textarea>
      </md-field>
      <md-button type="submit">Send</md-button>
    </form>
  </div>
</template>

<script>
import { sendPrivateMessage, privateMessageListener } from '../services/message-service'

export default {
  data () {
    return {
      newMessage: '',
      messages: [],
      recipient: '',
      loggedInUser: 'test-gihhok@404.city'
    }
  },
  methods: {
    sendMessage () {
      sendPrivateMessage({ message: this.newMessage, to: this.recipient })
      this.messages = [...this.messages, { from: this.loggedInUser, message: this.newMessage }]
    },
    isMine (message) {
      return message.from === this.loggedInUser
    }
  },
  created () {
    this.recipient = this.$route.params.jid
    privateMessageListener(this.recipient, (message) => {
      this.messages = [...this.messages, message]
    })
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;

  &>textarea {
    width: 100%;
  }

  &>button {
    width: 100%;
  }
}

.md-list {
  width: 520px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}

.mine-message {
  color: blue;
}
</style>
