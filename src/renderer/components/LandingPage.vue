<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <form @submit.prevent="registerUser">
          <div class="form-item">
            <label for="domain">Domain</label>
            <input type="text" name="domain" v-model="domain">
          </div>
          <div class="form-item">
            <label for="username">Username</label>
            <input type="text" name="username" v-model="username">
          </div>
          <div class="form-item">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">
          </div>
          <button>Connect</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'LandingPage',
  data () {
    return {
      domain: '404.city',
      username: 'test-gihhok@404.city',
      password: 'Impeo123'
    }
  },
  methods: {
    registerUser () {
      const data = { domain: this.domain, username: this.username, password: this.password }
      ipcRenderer.send('register', data)
      this.$router.push('/private-chat')
    }
  }
}
</script>

<style scoped>
form {
  margin: 0;
  padding: 10px;
  width: 100%;
}

.form-item {
  width: 100%;
  padding: 20px;
  border: 1px solid black;
  margin-bottom: 5px;
}

button {
  width: 100%;
  height: 50px;
}
</style>