<template>
  <div class="container">
    <div class="message-list">
      <ul>
        <li v-for="(item, index) in messages" :key="index">{{ item.from }} {{ item.message }}</li>
      </ul>
    </div>
    <form @submit.prevent="sendMessage" class="messaging-area">
      <textarea name="message-area" cols="30" rows="10" v-model="newMessage"></textarea>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { sendPrivateMessage, privateMessageListener } from '../services/message-service'
// const { ipcRenderer } = require('electron')

export default {
  data () {
    return {
      newMessage: '',
      messages: []
    }
  },
  methods: {
    sendMessage () {
      const recipient = 'gihook@404.city'
      sendPrivateMessage({ message: this.newMessage, to: recipient })
      this.messages = [...this.messages, { from: 'test-gihhok@404.city', message: this.newMessage }]
    }
  },
  created () {
    privateMessageListener((message) => {
      this.messages = [...this.messages, message]
    })
    // ipcRenderer.on('receive-message', (sender, message) => {
    //   this.messages = [...this.messages, message]
    // })
  }
}
</script>

<style lang="scss" scoped>
  .message-list {
    width: 100%;
    padding: 5px;
    margin-bottom: 20px;
    border: 2px solid black;
  }

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
</style>
