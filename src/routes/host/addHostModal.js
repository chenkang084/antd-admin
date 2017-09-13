/**
 * Created by chenkang1 on 2017/9/13.
 */

import {fetchAndNotification} from "../../services/restfulService";
export default function addHostModal(formItems) {
  return {
    id: '',
    cluster: this.props.modalProps.defaultCluster,
    refresh: this.refresh,
    btnText: 'Add Host',
    btnTextShow: true,
    formItems: formItems,
    submit: {
      btnText: 'create',
      // should use function instead of es6 =>{} ,make sure get modalForm's current this
      handleSubmit: async function (values) {

        console.log(values)
        await fetchAndNotification({
          url: `ceph/clusters/${this.props.cluster.id}/servers/`,
          method: 'post',
          api: 'v2',
          params: {
            ...values,
            backup_node: true
          },
          notifications: {
            title: 'create Action',
            success: `创建${values.servername} 操作成功！`,
            error: `创建${values.servername} 操作失败！`,
          },
        });

        this.props.form.resetFields();
        this.props.refresh();
      }
    },
    modalTitle: 'Add User',
    modalVisible: false,
    spinning: false,
    hostGroup: [],
    hostRacks: [],
    handleModalShow: async () => {
      this.setState(prevState => {
        const addHostModal = prevState.addHostModal;
        addHostModal.modalVisible = true;
        addHostModal.cluster = this.props.modalProps.defaultCluster;
        return {
          addHostModal
        }
      });

      const result = await Promise.all([
        fetchAndNotification({
          url: `ceph/clusters/${this.props.modalProps.defaultCluster.id}/groups/`,
          api: 'v2'
        }),
        fetchAndNotification({
          url: `ceph/clusters/${this.props.modalProps.defaultCluster.id}/racks`,
          api: 'v2'
        })
      ]);

      this.setState(prevState => {
        const addHostModal = prevState.addHostModal;
        addHostModal.hostGroup = result[0].data.items;
        addHostModal.hostRacks = result[1].data.items;
        return {
          addHostModal: prevState.addHostModal
        }
      });
    },
    handleModalHide: () => {
      this.setState(prevState => {
        const addHostModal = prevState.addHostModal;
        addHostModal.modalVisible = false;
        return {
          addHostModal
        }
      })
    }
  }
}
