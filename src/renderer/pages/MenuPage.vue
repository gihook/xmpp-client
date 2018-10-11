<template>
  <div class="container">
    <input type="text" v-model="friendJid">
    <md-button v-on:click="goToPrivateChat">Chat</md-button>
    <md-button v-on:click="goToSearchPage">Search for chat rooms</md-button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {
      friendJid: 'gihook@404.city'
    }
  },
  methods: {
    goToPrivateChat () {
      ipcRenderer.send('registerEventKey', `message:chat:${this.friendJid}`)
      this.$router.push('/private-chat')
    },
    goToSearchPage () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
</style>

