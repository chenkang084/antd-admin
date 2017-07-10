import modelExtend from 'dva-model-extend'
import { query } from '../services/newUser'
import { pageFrontModel } from './commonFrontPage'

export default modelExtend(pageFrontModel, {

  namespace: 'newUser',

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/newUser') {
          dispatch({
            type: 'query', payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      // throw new Error('haha')
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: 1,
              total: Number(data.data.length),
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})
