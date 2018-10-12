<template>
  <div class="container">
    <md-field>
      <md-input v-model="friendJid"></md-input>
    </md-field>
    <md-button v-on:click="goToPrivateChat">Chat</md-button>
    <md-button v-on:click="goToSearchPage">Search for chat rooms</md-button>
  </div>
</template>

<script>
import { registerEventKey } from '../services/message-service'

export default {
  data () {
    return {
      friendJid: 'gihook@404.city'
    }
  },
  methods: {
    goToPrivateChat () {
      registerEventKey(`message:chat:${this.friendJid}`)
      this.$router.push(`/private-chat/${this.friendJid}`)
    },
    goToSearchPage () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
</style>

