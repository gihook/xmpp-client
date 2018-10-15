<template>
  <div id="app">
    <div class="app-header">
      <h3 v-if="loggedInUser">Logged in as {{ loggedInUser }}</h3>
      <router-link tag="a" to="/">
        Go To Home
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'my-project',
  computed: {
    loggedInUser () {
      return this.$store.state['Login'].username
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div.app-header {
  display: flex;
  justify-content: space-between;
}
</style>
