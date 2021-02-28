import axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status === 403) {
      Message({
        type: 'error',
        message: '网络请求超时，请刷新页面！'
      })
    } else if (error.response.status === 401) {
      Message({
        type: 'error',
        message: error.response.data.error_msg
      })
    }
    return Promise.reject(error)
  }
)

/**
 * get方法 对应get请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post方法 对应post请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, QS.stringify(params)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
