import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Good from '../views/Good.vue'
import Share from '../views/Share.vue'
import Ask from '../views/Ask.vue'
import Job from '../views/Job.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/good',
    name: 'Good',
    component: Good
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/ask',
    name: 'Ask',
    component: Ask
  },
  {
    path: '/job',
    name: 'Job',
    component: Job
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
