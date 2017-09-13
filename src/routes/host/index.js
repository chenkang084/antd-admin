/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import {Modal, Row, Col, Card, Button, Input, Select, Icon, Switch} from "antd";

import BatchModal from "../../components/modals/BatchModal";
import {fetchAndNotification} from "../../services/restfulService";
import ModalForm from "../../components/modalForm/ModalForm";
import {ClusterList} from "../../components/clusterList/ClusterList";
import addHostModal from "./addHostModal";
import tableDataProps from "./tableProps";
import clusterListProps from "./clusterListProps";

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
      addHostModal: addHostModal.call(this, formItems)
    })
  }

  componentDidMount() {

  }



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

    this.tableDataProps = tableDataProps.call(this);

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

    this.clusterListProps = clusterListProps.call(this);
  };


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
