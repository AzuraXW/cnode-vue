import { get } from '../http'

/**
 * 获取用户详情
 * @param {String} username 用户名
 */
export function getUserDetail (username) {
  return get(`/user/${username}`)
}
