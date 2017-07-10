/**
 * Created by root on 17-6-27.
 */

import modelExtend from 'dva-model-extend'
import { config } from '../utils'

const { pageSize } = config

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageFrontModel = modelExtend(model, {

  state: {
    listFiltered: [],
    list: [],
    pagination: {
      pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['3', '4', '5', '6'],
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
    sortedInfo: null,
    filteredInfo: null,
    selectedRowKeys: [],
    filter: {},
    modalType: 'create',
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        listFiltered: list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        selectedRowKeys: [],
      }
    },
    change (state, { payload }) {
      return {
        ...state,
        pagination: payload.pagination,
        sortedInfo: payload.sorter,
        filteredInfo: payload.filters,
      }
    },
    filter (state, { payload }) {
      let listFiltered = payload.filter.length ? state.list.filter(filterForAnyField(payload.filter)) : state.list
      return {
        ...state,
        listFiltered,
        pagination: {
          ...state.pagination,
          current: 1,
          total: listFiltered.length,
        },
      }
    },
  },

})

const filterForAnyField = (text) => function (item) {
  const searchingString = String(text)
  for (let value of Object.values(item)) {
    if (typeof(value) === 'string' && value.indexOf(searchingString) > -1) {
      return true
    }
  }
  return false
}


module.exports = {
  pageFrontModel,
}
