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

/**
 * 收藏
 *
 * @export
 * @param {*} { accesstoken, topicId }
 * @return {*}
 */
export function collect ({ accesstoken, topicId }) {
  return post('/topic_collect/collect', {
    accesstoken,
    topic_id: topicId
  })
}

/**
 * 取消收藏
 *
 * @export
 * @param {*} { accesstoken, topicId }
 * @return {*}
 */
export function deCollect ({ accesstoken, topicId }) {
  return post('/topic_collect/de_collect', {
    accesstoken,
    topic_id: topicId
  })
}

export function getCollects (username) {
  return get(`/topic_collect/${username}`)
}

export function getMessage (accesstoken) {
  return get('/messages', {
    accesstoken
  })
}
