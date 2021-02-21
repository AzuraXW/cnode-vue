import store from '@/store/index'
import { getUserDetail, login } from '@/api/user'
import { Message } from 'element-ui'

export default async function (accesstoken) {
  if (!accesstoken) {
    accesstoken = localStorage.getItem('accesstoken')
  }
  if (accesstoken) {
    return new Promise((resolve, reject) => {
      login(accesstoken).then(loginInfo => {
        if (loginInfo.success) {
          // 验证accesstoken成功
          store.commit('setLoginStatus', true)
          // 获取登录的用户的个人信息
          getUserDetail(loginInfo.loginname).then(userInfo => {
            // 将信息保存自vuex
            store.commit('setUserInfo', userInfo.data)
            store.commit('setAccesstoken', accesstoken)
            resolve(true)
          })
        }
      }).catch(e => {
        // 验证accesstoken失败
        Message({
          message: e.response.data.error_msg,
          type: 'error'
        })
        reject(new Error(e.response.data))
      })
    })
  }
}
