import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import api from './api'
import localPlugin from './plugins'
import './ElementUI'
import '@/assets/styles/common.css'
import '@/assets/styles/iconfont.css'
import 'normalize.css'
import { dateSub } from './plugins/filters/date.js'
import noData from '@/components/noData'

const NoData = Vue.extend(noData)
Vue.config.productionTip = false
// Vue.prototype.$api = api
Vue.prototype.$nodata = (selector) => {
  new NoData().$mount(selector)
}
Vue.use(localPlugin)
Vue.filter('datesub', dateSub)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
