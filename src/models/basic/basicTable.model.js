/**
 * Created by chenkang1 on 2017/7/2.
 * the model supplies some basic and common state,reducers,effects
 */
import {fetchAndNotification} from "../../services/restfulService";
export default {
  state: {
    // the selected items of table
    selectedItems: [],
    selectedRowKeys: [],
    // calculate the refresh count
    refresh: 1,
    clusterList: [],
    defaultCluster: null
  },

  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'queryClusterList'})
    },
  },

  effects: {
    *queryClusterList({}, {call, put}){
      const clusters = yield fetchAndNotification({
        url: 'ceph/clusters/',
        api: 'v2'
      })

      if (clusters && clusters.data && clusters.data.items) {
        yield put({type: 'updateClusters', clusters: clusters.data.items})
      }
    },


  },


  reducers: {
    showModal (state, {payload: {key}}) {
      return {...state, [key]: true}
    },
    hideModal (state, {payload: {key}}) {
      return {...state, [key]: false}
    },
    //update selected items of the table
    updateSelectItems (state, {payload: {selectedRowKeys, selectedItems}}) {
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
    updateClusters(state, {clusters}){
      return {
        ...state,
        clusterList: clusters,
        defaultCluster: clusters[0]
      }
    },
    updateDefaultCluster(state, {cluster}){
      return {
        ...state,
        defaultCluster: cluster
      }
    }
  },
}
