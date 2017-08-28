/**
 * Created by chenkang1 on 2017/7/2.
 * the model supplies some basic and common state,reducers,effects
 */
export default {
  state: {
    // the selected items of table
    selectedItems: [],
    selectedRowKeys:[],
    // calculate the refresh count
    refresh: 1,
  },

  effects: {},

  reducers: {
    showModal (state, { payload: { key: key } }) {
      return { ...state, [key]: true }
    },
    hideModal (state, { payload: { key: key } }) {
      return { ...state, [key]: false }
    },
    //update selected items of the table
    updateSelectItems (state, { payload: {selectedRowKeys,selectedItems} }) {
      return {
        ...state,
        selectedItems,
        selectedRowKeys
      }
    },
    //refresh the table data
    refresh (state) {
      return {
        ...state,
        refresh: ++state.refresh,
      }
    },
  },
}
