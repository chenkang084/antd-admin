/**
 * Created by chenkang1 on 2017/6/29.
 */
import axiosFactory from './axios'
import qs from 'qs'
import config from '../config'
import {notification} from 'antd'

const v1Instance = axiosFactory({api: config.uri.api.v1});
const v2Instance = axiosFactory({api: config.uri.api.v2,header:{'X-Requested-With':'XMLHttpRequest'}});

function request({method, url, params,api}) {
  let instance = v1Instance;
  if (api && api === 'v2') {
    instance = v2Instance;
  }

  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(url, {
          params,
          'paramsSerializer': function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          },
        },
      )
    case 'delete':
      return instance.delete(url, {data: params})
    case 'post':
      return instance.post(url, params)
    case 'put':
      return instance.put(url, params)
    case 'patch':
      return instance.patch(url, params)
    default:
      return instance.get(url, {
        params,
      })
  }
}

export async function fetch({url, params = null, method = 'get', api}) {
  return await request({
    url,
    method,
    params,
    api
  })
    .catch((result) => {
      signStatusCheck(result);
      return Promise.reject(result);
    })
}

export async function fetchAndNotification({url, params = null, method = 'get', notifications = {}, api}) {
  return await request({
    url,
    method,
    params,
    api
  })
    .then((result) => {
      if (notifications.success) {
        notification.open({
          message: notifications.title,
          description: notifications.success,
          duration: 10,
          type: 'success',
        });
      }
      return result;
    })
    .catch((result) => {
      signStatusCheck(result);
      if (notifications.error) {
        notification.open({
          message: notifications.title,
          description: notifications.error,
          duration: 10,
          type: 'error',
        });
      }
      return Promise.reject(result);
    })
}

const signStatusCheck = (result) => {
  if (result && result.response && result.response.status === 401) {
    sessionStorage.setItem(`loadingStatus`, false);
    window.location.href = `${window.location.origin}/login`;
  }
};
