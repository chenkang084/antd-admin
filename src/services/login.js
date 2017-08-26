import {fetchAndNotification} from "./restfulService";

export async function login(params) {
  return fetchAndNotification({
    url: 'auth/signId',
    method: 'post',
    params,
  })
}
