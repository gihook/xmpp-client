<template>
  <div id="wrapper">
    <md-card>
      <form @submit.prevent="registerUser">
        <md-field>
          <label>Domain</label>
          <md-input v-model="domain"></md-input>
        </md-field>
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="password"></md-input>
        </md-field>
        <md-button type="submit" class="md-raised" :md-ripple="false">Connect</md-button>
      </form>
    </md-card>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

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
      const credentials = { domain: this.domain, username: this.username, password: this.password }
      ipcRenderer.send('registerClient', credentials)
      this.$store.commit('SET_LOGIN', this.username)
      this.$router.push('/menu')
    }
  }
}
</script>

<style scoped>
.md-card {
  margin: 20px;
}

form {
  margin: 0;
  padding: 10px;
  width: 100%;
}
</style>