import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftMenuVisible: false
  },
  mutations: {
    changeMenuVisible (state) {
      state.leftMenuVisible = !state.leftMenuVisible
    }
  },
  actions: {
  },
  modules: {
  }
})
