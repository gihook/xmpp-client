<template>
  <div class="container">
    <md-button v-on:click="goToPrivateChat">Chat</md-button>
    <md-button v-on:click="goToSearchPage">Search for chat rooms</md-button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPrivateChat () {
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

