import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
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
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    props: true,
    children: [
      {
        path: '',
        name: 'UserLately',
        component: () => import(/* webpackChunkName: "user" */ '../views/UserLately.vue')
      },
      {
        path: 'collect',
        name: 'UserCollect',
        component: () => import(/* webpackChunkName: "user" */ '../views/UserCollect.vue'),
        props: true
      },
      {
        path: 'message',
        name: 'UserMessage',
        component: () => import(/* webpackChunkName: "user" */ '../views/UserMessage.vue'),
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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    props: (route) => ({
      from: route.query.from
    })
  },
  {
    path: '/topic/create',
    name: 'CreateTopic',
    component: () => import(/* webpackChunkName: "topic" */ '../views/CreateTopic.vue')
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: () => import(/* webpackChunkName: "topic" */ '../views/Topic.vue'),
    props: true
  },
  {
    path: '/topic/:id/edit',
    name: 'EditTopic',
    component: () => import(/* webpackChunkName: "topic" */ '../views/CreateTopic.vue'),
    props: (route) => ({
      topicEditId: route.params.id
    }),
    beforeEnter (to, from, next) {
      setTimeout(() => {
        if (store.state.loginStatus) {
          next()
        } else {
          router.back()
        }
      }, 500)
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  base: process.env.NODE_ENV === 'production' ? 'cnode-vue' : '/',
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
