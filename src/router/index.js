import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeAll',
    component: Home
  },
  {
    path: '/home/:tab',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/user/:username',
    name: 'User',
    component: User,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: (route) => ({
      from: route.query.from
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach((to, from) => {
  Nprogress.done()
  // 切换路由时 改变导航栏状态 隐藏
  if (store.state.leftMenuVisible) {
    store.commit('changeMenuVisible')
  }
})
export default router
