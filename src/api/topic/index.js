import { get, post } from '../http'

/**
 * 获取主题首页
 * @param {Object} options 请求参数 page页数 tab分类 limit数量
 */
export function getTopics (options) {
  return get('/topics', options)
}

/**
 * 获取主题详情
 * @param {Object} options 请求参数
 */
export function getTopicsDateil (options) {
  return get(`/topic/${options.topicId}`, options)
}

/**
 * 新建主题
 * @param {Object} options 请求参数
 */
export function createTopic (options) {
  return post('/topics', options)
}

/**
 * 创建回复
 *
 * @export
 * @param {*} options
 * @return {*}
 */
export function createTopicReply (options) {
  const { accesstoken, content, replyId, topicId } = options
  return post(`/topic/${topicId}/replies`, {
    accesstoken,
    content,
    reply_id: replyId
  })
}

export function ups (options) {
  const { accesstoken, replyId } = options
  return post(`/reply/${replyId}/ups`, {
    accesstoken
  })
}
