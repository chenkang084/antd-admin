/**
 * Created by chenkang1 on 2017/7/2.
 * the model supplies some basic and common state,reducers,effects
 */
export default {
  state: {
    // the selected items of table
    selectedItems: [],
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
    updateSelectItems (state, { payload: selectedItems }) {
      return {
        ...state,
        selectedItems,
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
