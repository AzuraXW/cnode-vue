import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import UserLately from '../views/UserLately.vue'
import UserCollect from '../views/UserCollect.vue'
import Login from '../views/Login.vue'
import CreateTopic from '../views/CreateTopic.vue'
import Topic from '../views/Topic.vue'
import UserMessage from '../views/UserMessage.vue'
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
    component: User,
    props: true,
    children: [
      {
        path: '',
        name: 'UserLately',
        component: UserLately
      },
      {
        path: 'collect',
        name: 'UserCollect',
        component: UserCollect,
        props: true
      },
      {
        path: 'message',
        name: 'UserMessage',
        component: UserMessage,
        props: true,
        beforeEnter (to, from, next) {
          setTimeout(() => {
            if (to.params.username === store.state.userInfo.loginname) {
              next()
            } else {
              router.back()
            }
          }, 500)
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: (route) => ({
      from: route.query.from
    })
  },
  {
    path: '/topic/create',
    name: 'CreateTopic',
    component: CreateTopic
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: Topic,
    props: true
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
