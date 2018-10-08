<template>
  <div id="app">
    <router-link tag="a" to="/">
      Go To Home
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'my-project'
}
</script>

<style>
/* CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
