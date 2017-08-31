/**
 * Created by chenkang1 on 2017/8/30.
 */
import lodash from 'lodash'
import basicTableModel from './basic/basicTable.model'

const model = lodash.cloneDeep(basicTableModel);

export default {
  namespace: 'userMgmt',
  state: {
    ...model.state,
    modalVisible: false,
    batchModalVisible: false,
    createModalVisible: false,
  },

  effects: {
    ...model.effects,
  },

  reducers: {
    ...model.reducers,
  },
}
