/**
 * Created by chenkang1 on 2017/7/2.
 */
export default {
  state: {
    selectedItems: [],
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
    updateSelectItems (state, { payload: selectedItems }) {
      return {
        ...state,
        selectedItems,
      }
    },
    refresh (state) {
      return {
        ...state,
        refresh: ++state.refresh,
      }
    },
  },
}
