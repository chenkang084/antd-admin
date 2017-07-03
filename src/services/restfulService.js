/**
 * Created by chenkang1 on 2017/6/29.
 */
import request from "../utils/request";
import config from "../config";
import {notification} from 'antd';


export async function fetch({url, params = null, method = 'get'}) {
  return request({
    url: config.uri.api + url,
    method: method,
    data: params,
  })
}

export async function fetchAndNotification({url, params = null, method = 'get', notifications}) {
  request({
    url: config.uri.api + url,
    method: method,
    data: params,
  })
    .then((result) => {
      // console.log(result)
      notification.open({
        message: notifications.title,
        description: notifications.success,
        duration: 0,
        type: 'success'
      });
    })
    .catch((error) => {
      notification.open({
        message: notifications.title,
        description: notifications.error,
        duration: 0,
        type: 'error'
      });
    })
}


