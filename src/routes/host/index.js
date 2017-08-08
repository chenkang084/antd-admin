/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import { Modal, Row, Col, Card, Button } from "antd";
import { Link } from "dva/router";
import DropOption from "../../components/DropOption/DropOption";
import BatchModal from "../../components/modals/BatchModal";
import { fetchAndNotification } from "../../services/restfulService";
import { CollectionsPage } from "../../components/host/CreateModal";

const confirm = Modal.confirm;

class HostPage extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount() {}

  handleMenuClick = (record, e) => {
    if (e.key === "1") {
      let { dispatch } = this.props;
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
    let { dispatch } = this.props;
    dispatch({
      type: "host/showModal",
      payload: {
        key
      }
    });
  };

  refresh = () => {
    this.props.dispatch({ type: "host/refresh" });
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
        let { dispatch } = this.props;
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
          title: "Avatar",
          dataIndex: "avatar",
          key: "avatar",
          // width: 64,
          render: text => <img alt={"avatar"} width={24} src={text} />
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          // width: 120,
          render: (text, record) =>
            <Link to={`user/${record.id}`}>
              {text}
            </Link>
        },
        {
          title: "NickName",
          dataIndex: "nickName",
          key: "nickName",
          sorter: true
          // width: 100,
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          sorter: true
          // width: 64,
        },
        {
          title: "Gender",
          dataIndex: "isMale",
          key: "isMale",
          render: text =>
            <span>
              {text ? "Male" : "Female"}
            </span>
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "CreateTime",
          dataIndex: "createTime",
          key: "createTime"
        },
        {
          title: "Operation",
          key: "operation",
          width: 100,
          render: (text, record) => {
            return (
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  { key: "1", name: "Update" },
                  { key: "2", name: "Delete" }
                ]}
              />
            );
          }
        }
      ],
      fetchData: {
        url: "host",
        params: null
      },
      errorMsg: "get host table error",
      refresh: this.props.modelProps.refresh,
      handleSelectItems: selectedRows => {
        this.props.dispatch({
          type: "host/updateSelectItems",
          payload: selectedRows
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
            params: { ids: item.id },
            notifications: {
              title: "batch Action",
              success: `${item.name} 操作成功！`,
              error: `${item.name} 操作失败！`
            }
          });
        });
      },
      onCancel: () => {
        let { dispatch } = this.props;
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
            params: { ids: item.id },
            notifications: {
              title: "batch Action",
              success: `${item.name} 操作成功！`,
              error: `${item.name} 操作失败！`
            }
          });
        });
      },
      onCancel: () => {
        let { dispatch } = this.props;
        dispatch({
          type: "host/hideModal",
          payload: {
            key: "createModalVisible"
          }
        });
      }
    };
  };

  render() {
    this.init();

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="远程数据">
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload" />
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this, "batchModalVisible")}
                  disabled={this.props.modelProps.selectedItems.length === 0}
                >
                  Batch Action
                </Button>
                <CollectionsPage />
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

function mapStateToProps({ host }) {
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
