import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },
  subscriptions: {

    setup ({ dispatch }) {
      // console.log("xxxxxxxxxxxxxxxxxxx")
      // dispatch({type:'login'})
    },

  },
  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const result = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if (result.data.type === 'success') {
        const from = queryURL('from')
        // yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
