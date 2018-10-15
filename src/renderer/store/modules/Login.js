const state = {
  username: ''
}

const mutations = {
  SET_LOGIN (state, username) {
    console.log('setting username', username)
    state.username = username
  },
  CLEAR_USERNAME (state) {
    state.username = ''
  }
}

export default {
  state,
  mutations
}
