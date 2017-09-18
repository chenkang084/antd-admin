/**
 * Created by chenkang1 on 2017/6/30.
 */
import lodash from "lodash";
import basicTableModel from "./basic/basicTable.model";
import { fetchAndNotification } from "../services/restfulService";

const model = lodash.cloneDeep(basicTableModel);

export default {
  namespace: "host",
  state: {
    ...model.state,
    modalVisible: false,
    batchModalVisible: false,
    createModalVisible: false,
    tableData: undefined,
    tableLoading: true
  },
  subscriptions: {
    ...model.subscriptions
  },

  effects: {
    ...model.effects,
    *queryPageData({ defaultCluster }, { call, put }) {
      yield put({ type: "queryTableData", defaultCluster });
    },
    *queryTableData({ defaultCluster }, { call, put }) {
      yield put({ type: "tableLoading", tableLoading: true });

      const tableData = yield fetchAndNotification({
        url: `ceph/clusters/${defaultCluster.id}/servers/`,
        params: null,
        api: "v2"
      });
      console.log(tableData);
      yield put({ type: "setTableData", tableData: tableData.data.items });
    }
  },

  reducers: {
    ...model.reducers,
    setTableData(state, { tableData }) {
      return {
        ...state,
        tableLoading: false,
        tableData
      };
    },
    tableLoading(state, { tableLoading }) {
      return {
        ...state,
        tableLoading
      };
    }
  }
};
