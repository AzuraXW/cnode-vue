import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeAll',
    component: Home
  },
  {
    path: '/:tab',
    name: 'Home',
    component: Home,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from) => {
  // 切换路由时 改变导航栏状态 隐藏
  if (store.state.leftMenuVisible) {
    store.commit('changeMenuVisible')
  }
})
export default router
