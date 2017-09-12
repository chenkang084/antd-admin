/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import {Modal, Row, Col, Card, Button, Input, Select, Icon, Switch} from "antd";
import DropOption from "../../components/DropOption/DropOption";
import BatchModal from "../../components/modals/BatchModal";
import {fetchAndNotification} from "../../services/restfulService";
import ModalForm from "../../components/modalForm/ModalForm";
import {ClusterList} from "../../components/clusterList/ClusterList";

const confirm = Modal.confirm;

class HostPage extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  componentWillMount() {

    const formItems = {
      user_name: {
        name: '主机',
        key: 'servername',
        rules: [
          {
            required: true, message: 'Please input servername!'
          },
        ],
        render: function () {
          return (<Input prefix={<Icon type="" style={{fontSize: 13}}/>} placeholder="servername"/>)
        }
      },
      user_pwd: {
        name: '用户名',
        key: 'username',
        // updateValueFlag: false,
        rules: [
          {required: true, message: 'Please input username!'},
        ],
        render: function () {
          return (
            <Input type="text" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                   placeholder="username"/>)
        }
      },
      user_pwd_twice: {
        name: '密码',
        key: 'passwd',
        updateValueFlag: false,
        rules: [
          {required: true, message: 'Please input your password!'},
        ],
        render: function () {
          return (<Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                         placeholder="password"/>)
        }
      },
      group_id: {
        "name": "主机组",
        "key": "group_id",
        rules: [{required: true, message: 'Please select your gender!'}],
        render: () => {
          return (
            <Select
              showSearch
              style={{width: 200}}
              placeholder="Select Host group"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                this.state.addHostModal.hostGroup.map(group => {
                  return (
                    <Option value={group.id}>{group.name}</Option>
                  )
                })
              }
            </Select>
          )
        }
      },
      rack_name: {
        "name": "机架",
        "key": "rack_name",
        rules: [{required: true, message: 'Please select your gender!'}],
        render: () => {
          return (
            <Select
              showSearch
              style={{width: 200}}
              placeholder="Select Host group"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                this.state.addHostModal.hostRacks.map(rack => {
                  return (
                    <Option value={rack}>{rack}</Option>
                  )
                })
              }
            </Select>
          )
        }
      },
      publicip: {
        "name": "外网IP",
        "key": "publicip",
        rules: [
          {required: true, message: 'Please select your gender!'},
          {
            validator: function (rule, value, callback) {

              const reg = new RegExp(/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/)
              const check = reg.exec(value);
              if (check) {
                callback();
              } else {
                callback('请输入正确的IP!');
              }
            }
          }
        ],
        render: () => {
          return (
            <Input type="text" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                   placeholder="外网IP"/>)

        }
      },
      clusterip: {
        "name": "集群IP",
        "key": "clusterip",
        rules: [
          {required: true, message: 'Please select your gender!'},
          {
            validator: function (rule, value, callback) {

              const reg = new RegExp(/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/)
              const check = reg.exec(value);
              if (check) {
                callback();
              } else {
                callback('请输入正确的IP!');
              }
            }
          }
        ],
        render: () => {
          return (
            <Input type="text" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                   placeholder="外网IP"/>)

        }
      },
      backup_node: {
        "name": "设为备份节点",
        "key": "backup_node",
        rules: [
          {required: true, message: 'Please select your gender!'},
        ],
        render: () => {
          return (
            <Switch defaultChecked={true} onChange={e => {
              console.log(e)
            }}/>)
        }
      }
    };

    this.setState({
      addHostModal: {
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
    })
  }

  componentDidMount() {
  }

  handleMenuClick = (record, e) => {
    if (e.key === "1") {
      let {dispatch} = this.props;
      dispatch({
        type: "host/showModal",
        payload: {
          key: "modalVisible"
        }
      });
    } else if (e.key === "2") {
      confirm({
        title: "Are you sure delete this record?",
        onOk() {
          console.log(record);
        }
      });
    }
  };

  showModal = key => {
    let {dispatch} = this.props;
    dispatch({
      type: "host/showModal",
      payload: {
        key
      }
    });
  };

  refresh = () => {
    this.props.dispatch({type: "host/refresh"});
  };


  init = () => {
    this.modalProps = {
      visible: this.props.modalProps.modalVisible,
      maskClosable: true,
      title: "test",
      wrapClassName: "vertical-center-modal",
      onOk: data => {
        console.log(data);
      },
      onCancel: () => {
        let {dispatch} = this.props;
        dispatch({
          type: "host/hideModal",
          payload: {
            key: "modalVisible"
          }
        });
      }
    };

    this.tableDataProps = {
      columns: [
        {
          title: "名称",
          dataIndex: "hostname",
          key: "hostname",
          // width: 64,
          // render: text => <img alt={"avatar"} width={24} src={text}/>
        },
        {
          title: "机架",
          dataIndex: "rack_name",
          key: "rack_name",
          // width: 120,
          // render: (text, record) =>
          //   <Link to={`host/${record.id}`}>
          //     {text}
          //   </Link>
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          sorter: true
          // width: 100,
        },
        {
          title: "外网IP",
          dataIndex: "publicip",
          key: "publicip",
          sorter: true
          // width: 64,
        },
        {
          title: "监视器角色",
          dataIndex: "mons[0].role",
          key: "mons[0].role",
          // render: mons =>
          //   <span>
          //     {mons.role}
          //   </span>
        },
        {
          title: "存储单元数量",
          dataIndex: "osds_num",
          key: "osds_num"
        },
        {
          title: "处理器使用率（%）",
          dataIndex: "cpuUsage",
          key: "cpuUsage"
        },
        {
          title: "内存使用率（%）",
          dataIndex: "ramUsage",
          key: "ramUsage"
        },
        {
          title: "创建时间",
          dataIndex: "created_at",
          key: "created_at"
        },
        {
          title: "操作",
          key: "operation",
          // width: 100,
          render: (text, record) => {
            return (
              <span>
                <Button type="danger" icon="delete"
                        onClick={e => this.tableDataProps.showDeleteConfirm(record, e)}>delete</Button>
                <DropOption
                  onMenuClick={e => this.handleMenuClick(record, e)}
                  menuOptions={[
                    {key: "1", name: "Update"},
                    {key: "2", name: "Delete"}
                  ]}
                />
              </span>
            );
          }
        }
      ],
      fetchData: {
        url: this.props.modalProps.defaultCluster ? `ceph/clusters/${this.props.modalProps.defaultCluster.id}/servers/` : '',
        params: null,
        api: 'v2'
      },
      showDeleteConfirm: (record, e) => {
        console.log(this)
        confirm({
          title: 'Are you sure delete this host?',
          // content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
            // console.log('OK');
            console.log(record);
            console.log(this);
            console.log(this.props.modalProps.defaultCluster.id);
            fetchAndNotification({
              url: `ceph/clusters/${this.props.modalProps.defaultCluster.id}/servers/${record.id}`,
              method: 'delete',
              api: 'v2',
              notifications: {
                title: "Delete Host",
                success: `删除主机 ${record.hostname} 操作成功！`,
                error: `删除主机 ${record.hostname} 操作失败！`
              }
            })
              .then(() => {
                this.refresh();
              })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      errorMsg: "get host table error",
      refresh: this.props.modalProps.refresh,
      handleSelectItems: (selectedRowKeys, selectedItems) => {
        this.props.dispatch({
          type: "host/updateSelectItems",
          payload: {
            selectedRowKeys,
            selectedItems
          }
        });
      }
    };

    this.batchModalProps = {
      visible: this.props.modalProps.batchModalVisible,
      maskClosable: true,
      title: "Batch Action Modal",
      wrapClassName: "vertical-center-modal",
      selectedItems: this.props.modalProps.selectedItems,
      fetchData: {
        url: "host",
        method: "delete"
      },
      onOk: data => {
        this.batchModalProps.onCancel();
        this.props.modalProps.selectedItems.forEach(item => {
          fetchAndNotification({
            url: "host",
            method: "delete",
            params: {ids: item.id},
            notifications: {
              title: "batch Action",
              success: `${item.name} 操作成功！`,
              error: `${item.name} 操作失败！`
            }
          });
        });
      },
      onCancel: () => {
        let {dispatch} = this.props;
        dispatch({
          type: "host/hideModal",
          payload: {
            key: "batchModalVisible"
          }
        });
      }
    };

    this.createModalProps = {
      visible: this.props.modalProps.createModalVisible,
      maskClosable: true,
      title: "Batch Action Modal",
      wrapClassName: "vertical-center-modal",
      selectedItems: this.props.modalProps.selectedItems,
      fetchData: {
        url: "host",
        method: "delete"
      },
      onOk: data => {
        this.batchModalProps.onCancel();
        this.props.modalProps.selectedItems.forEach(item => {
          fetchAndNotification({
            url: "host",
            method: "delete",
            params: {ids: item.id},
            notifications: {
              title: "batch Action",
              success: `${item.name} 操作成功！`,
              error: `${item.name} 操作失败！`
            }
          });
        });
      },
      onCancel: () => {
        let {dispatch} = this.props;
        dispatch({
          type: "host/hideModal",
          payload: {
            key: "createModalVisible"
          }
        });
      }
    };

    this.clusterListProps = {
      clusterList: this.props.modalProps.clusterList,
      defaultCluster: this.props.modalProps.defaultCluster,
      changeCluster: cluster => {
        console.log(cluster)
        let {dispatch} = this.props;
        dispatch({
          type: "host/updateDefaultCluster",
          cluster: cluster[0]
        });
        this.refresh();
      }
    }
  };

  //define common props of actions btn
  // actionCollectionsProps = {
  //   refresh: this.refresh
  // };

  render() {
    this.init();

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="主机列表">
              <ClusterList {...this.clusterListProps}/>
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload"/>
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this, "batchModalVisible")}
                  disabled={this.props.modalProps.selectedItems.length === 0}
                >
                  Batch Action
                </Button>
                {/*list a sort of actions*/}
                {/*<ActionCollections {...this.actionCollectionsProps}/>*/}

                <ModalForm {...this.state.addHostModal}/>
              </div>
              <DataTable {...this.tableDataProps} />
            </Card>
          </Col>
        </Row>
        {this.props.modalProps.modalVisible && <Modal {...this.modalProps} />}
        {this.props.modalProps.batchModalVisible &&
        <BatchModal {...this.batchModalProps} />}
      </div>
    );
  }
}

function mapStateToProps({host}) {
  return {
    modalProps: host
  };
}

HostPage.propTypes = {
  cluster: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  modalProps: PropTypes.object
};

export default connect(mapStateToProps)(HostPage);
