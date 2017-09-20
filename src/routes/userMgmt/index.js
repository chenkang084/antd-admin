/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Select, Row, Col, Card, Button, Input, Icon } from "antd";
import DataTable from "../../components/BasicTable/DataTable";
import DropOption from "../../components/DropOption/DropOption";
import { fetchAndNotification } from "../../services/restfulService";
import ModalForm from "../../components/modalForm/ModalForm";
import LifeCycle from "./lifeCycle";
import addUserModal from "./addUserModal";
import updateUserModal from "./updateUserModal";

class UserMgmt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateUserModal: {
        modalVisible: false
      },
      addUserModal: {
        modalVisible: false
      }
    };
  }

  refresh = () => {
    this.props.dispatch({ type: "userMgmt/refresh" });
  };

  /*
   * if the props will update in sometimes, should write in init or render method
   * if the props are constant, you can write it in componentWillMount
   */
  init = () => {
    this.tableDataProps = {
      columns: [
        {
          title: "username",
          dataIndex: "username",
          key: "username"
        },
        {
          title: "type",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "time",
          dataIndex: "time",
          key: "time"
        },
        {
          title: "Operation",
          key: "operation",
          width: 100,
          render: (text, record) => {
            return (
              <DropOption
                onMenuClick={e => {
                  console.log();
                  this.tableDataProps.handleMenuClick(record, e);
                }}
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
        url: "/user/users",
        params: null
      },
      errorMsg: "get user table error",
      refresh: this.props.model.refresh, // basic model refresh count
      handleSelectItems: (selectedRowKeys, selectedItems) => {
        this.props.dispatch({
          type: "userMgmt/updateSelectItems",
          payload: {
            selectedRowKeys,
            selectedItems
          }
        });
      },
      handleMenuClick: (record, e) => {
        if (e.key === "1") {
          this.setState({
            updateUserModal: {
              modalVisible: true,
              record
            }
          });
        } else if (e.key === "2") {
          fetchAndNotification({
            url: `user/userId/${record.id}`,
            method: "delete",
            notifications: {
              title: "create Action",
              success: `删除${record.username} 操作成功！`,
              error: `删除${record.username} 操作失败！`
            }
          }).then(() => {
            this.refresh();
          });
        }
      }
    };

    this.addUserModal = addUserModal.call(this);
    this.updateUserModal = updateUserModal.call(this);
  };

  render() {
    this.init();
    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="用户管理">
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload" />
                {/*list a sort of actions*/}
                <ModalForm {...this.addUserModal} />
                {this.state.updateUserModal.modalVisible && (
                  <ModalForm {...this.updateUserModal} />
                )}
              </div>
              <DataTable {...this.tableDataProps} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

UserMgmt.propTypes = {
  loading: PropTypes.object,
  model: PropTypes.object
};

export default connect(({ userMgmt, loading }) => ({
  model: userMgmt,
  loading
}))(UserMgmt);
