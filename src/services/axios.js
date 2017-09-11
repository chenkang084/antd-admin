/**
 * Created by chenkang1 on 2017/9/11.
 */
import axios from 'axios'
import {isFunction, isUndefined} from "../utils/dataUtils";

export default function axiosFactory({api, requestInterceptors, responseInterceptors}) {
  const instance = axios.create({
    baseURL: api,
    // withCredentials: true
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  })

  instance.interceptors.request.use((_config) => {
    // Do something before request is sent
    if (!isUndefined(requestInterceptors) && isFunction(requestInterceptors)) requestInterceptors();
    return _config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })

// Add a response interceptor
  instance.interceptors.response.use((response) => {
    // Do something with response data
    if (!isUndefined(responseInterceptors) && isFunction(responseInterceptors)) responseInterceptors();
    return response
  }, (error) => {
    // Do something with response error
    return Promise.reject(error)
  })

  return instance;
}
