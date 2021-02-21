import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftMenuVisible: false,
    title: '全部',
    loginStatus: false,
    accesstoken: '',
    userInfo: {}
  },
  mutations: {
    changeMenuVisible (state) {
      state.leftMenuVisible = !state.leftMenuVisible
    },
    changeTitle (state, payload) {
      state.title = payload
    },
    setLoginStatus (state, payload) {
      state.loginStatus = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    setAccesstoken (state, payload) {
      state.accesstoken = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
