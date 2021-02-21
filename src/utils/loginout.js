import store from '@/store/index'

export default function () {
  store.commit('setLoginStatus', false)
  store.commit('setUserInfo', {})
  store.commit('setAccesstoken', '')
  localStorage.setItem('accesstoken', '')
  return true
}
