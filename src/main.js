import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import './ElementUI'
import '@/assets/styles/common.css'
import '@/assets/styles/iconfont.css'
import 'normalize.css'
import { dateSub } from './filters/date.js'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.filter('datesub', dateSub)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
