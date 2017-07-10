/**
 * Created by chenkang1 on 2017/6/29.
 */
import config from '../config'
import { notification } from 'antd'
import axios from 'axios'

let instance = axios.create({
  baseURL: config.uri.api,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, (error) => {
  // Do something with response error
  return Promise.reject(error)
})

function request ({ method, url, params }) {
  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(url, {
        params,
      })
    case 'delete':
      return instance.delete(url, { data: params })
    case 'post':
      return instance.post(url, params)
    case 'put':
      return instance.put(url, params)
    case 'patch':
      return instance.patch(url, params)
    default:
      return instance(options)
  }
}

export async function fetch ({ url, params = null, method = 'get' }) {
  return request({
    url,
    method,
    params,
  })
}

export async function fetchAndNotification ({ url, params = null, method = 'get', notifications = {} }) {
  request({
    url,
    method,
    params,
  })
    .then((result) => {
      notification.open({
        message: notifications.title,
        description: notifications.success,
        duration: 0,
        type: 'success',
      })
    })
    .catch((error) => {
      notification.open({
        message: notifications.title,
        description: notifications.error,
        duration: 0,
        type: 'error',
      })
    })
}

