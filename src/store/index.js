import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftMenuVisible: false,
    title: '全部',
    loginStatus: false,
    accesstoken: '',
    // 当前登录用户的信息
    userInfo: {},
    // 用户页面用户的信息
    pageUserInfo: {}
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
    },
    setPageUserInfo (state, payload) {
      state.pageUserInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
