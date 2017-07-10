/**
 * Created by chenkang1 on 2017/6/30.
 */
import lodash from 'lodash'
import basicTableModel from './basic/basicTable.model'

const model = lodash.cloneDeep(basicTableModel)

export default {
  namespace: 'host',
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
