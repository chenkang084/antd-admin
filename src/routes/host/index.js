/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import {Modal, Row, Col, Card, Button, Menu, Dropdown, Icon} from "antd";
import {Link} from "dva/router";
import DropOption from "../../components/DropOption/DropOption";
import BatchModal from "../../components/modals/BatchModal";
import {fetchAndNotification} from "../../services/restfulService";
import {ActionCollections} from "../../components/host/ActionCollections";
import {ClusterList} from "../../components/clusterList/ClusterList";

const confirm = Modal.confirm;

class HostPage extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

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
  actionCollectionsProps = {
    refresh: this.refresh
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
                <ActionCollections {...this.actionCollectionsProps}/>
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
