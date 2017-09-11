/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import {Modal, Row, Col, Card, Button} from "antd";
import {Link} from "dva/router";
import DropOption from "../../components/DropOption/DropOption";
import BatchModal from "../../components/modals/BatchModal";
import {fetchAndNotification} from "../../services/restfulService";
import {ActionCollections} from "../../components/host/ActionCollections";

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
      visible: this.props.modelProps.modalVisible,
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
                <Button type="danger" icon="delete">delete</Button>
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
        url: "ceph/clusters/1/servers/",
        params: null,
        api:'v2'
      },
      errorMsg: "get host table error",
      refresh: this.props.modelProps.refresh,
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
      visible: this.props.modelProps.batchModalVisible,
      maskClosable: true,
      title: "Batch Action Modal",
      wrapClassName: "vertical-center-modal",
      selectedItems: this.props.modelProps.selectedItems,
      fetchData: {
        url: "host",
        method: "delete"
      },
      onOk: data => {
        this.batchModalProps.onCancel();
        this.props.modelProps.selectedItems.forEach(item => {
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
      visible: this.props.modelProps.createModalVisible,
      maskClosable: true,
      title: "Batch Action Modal",
      wrapClassName: "vertical-center-modal",
      selectedItems: this.props.modelProps.selectedItems,
      fetchData: {
        url: "host",
        method: "delete"
      },
      onOk: data => {
        this.batchModalProps.onCancel();
        this.props.modelProps.selectedItems.forEach(item => {
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
            <Card title="远程数据">
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload"/>
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this, "batchModalVisible")}
                  disabled={this.props.modelProps.selectedItems.length === 0}
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
        {this.props.modelProps.modalVisible && <Modal {...this.modalProps} />}
        {this.props.modelProps.batchModalVisible &&
        <BatchModal {...this.batchModalProps} />}
      </div>
    );
  }
}

function mapStateToProps({host}) {
  return {
    modelProps: host
  };
}

HostPage.propTypes = {
  cluster: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  modelProps: PropTypes.object
};

export default connect(mapStateToProps)(HostPage);
