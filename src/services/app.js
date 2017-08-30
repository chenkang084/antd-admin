import { request, config } from '../utils'
import {fetch, fetchAndNotification} from "./restfulService";
const { api } = config
const { user, userLogout, userLogin } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return fetchAndNotification({
    url: "/auth/signOut",
    method: 'put',
    data: params,
  })
}

export async function auth (params) {
  return await fetch({
    url: "/auth/auth",
    method: 'get',
    data: params,
  })
}
