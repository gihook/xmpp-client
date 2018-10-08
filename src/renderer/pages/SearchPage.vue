<template>
  <div class="container">
    <form @submit.prevent="searchForChatRooms">
      <div class="input-container">
        <input type="text" v-model="server">
        <button>Search</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data () {
    return {
      server: 'muc.xmpp.org',
      rooms: []
    }
  },
  methods: {
    searchForChatRooms () {
      this.rooms = []
    }
  }
}
</script>

<style>
form {
  width: 100%;
  padding: 20px;
}

.input-container {
  width: 100%;
  border: 1px solid black;
  height: 100px;
}

input {
  height: 100%;
  width: 100%;
}

button {
  width: 100%;
  height: 50px;
}
</style>
