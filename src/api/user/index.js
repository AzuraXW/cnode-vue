import { get, post } from '../http'

/**
 * 获取用户详情
 * @param {String} username 用户名
 */
export function getUserDetail (username) {
  return get(`/user/${username}`)
}

/**
 *
 *
 * 登录
 * @param {*} accesstoken 密钥
 * @return {*}
 */
export function login (accesstoken) {
  return post('/accesstoken', { accesstoken })
}
