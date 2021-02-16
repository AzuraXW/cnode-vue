import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftMenuVisible: false,
    title: '全部'
  },
  mutations: {
    changeMenuVisible (state) {
      state.leftMenuVisible = !state.leftMenuVisible
    },
    changeTitle (state, payload) {
      state.title = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
