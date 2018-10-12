<template>
  <div class="container">
    <h1>{{ subject }}</h1>
    <md-list>
      <md-list-item v-for="(item, index) in messages" :key="index">
        <span><b>{{ item.sender }}</b>: {{ item.message }}</span>
      </md-list-item> 
    </md-list>
  </div>
</template>

<script>
import { joinRoom, groupChatListener } from '../services/message-service'

export default {
  name: 'GroupChat',
  data () {
    return {
      messages: [],
      subject: ''
    }
  },
  created () {
    const address = this.$route.params.jid
    const room = { address }
    joinRoom(room)
    groupChatListener(address, (message) => {
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

<style>

</style>
