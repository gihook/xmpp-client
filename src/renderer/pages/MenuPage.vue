<template>
  <div class="container">
    <button v-on:click="goToPrivateChat">Chat</button>
    <button v-on:click="goToSearchPage">Search for chat rooms</button>
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
  button {
    width: 100%;
    height: 50px;
  }
</style>

