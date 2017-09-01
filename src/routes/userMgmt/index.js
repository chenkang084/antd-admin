/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import {Modal, Row, Col, Card, Button} from "antd";
import DataTable from "../../components/BasicTable/DataTable";
import DropOption from "../../components/DropOption/DropOption";
import {ActionCollections} from "../../components/host/ActionCollections";
import AddUserModal from "./modal/addUser";

class UserMgmt extends React.Component {

  refresh = () => {
    this.props.dispatch({type: "userMgmt/refresh"});
  };

  init = () => {
    this.tableDataProps = {
      columns: [
        {
          title: "username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "time",
          dataIndex: "time",
          key: "time",
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
                  {key: "1", name: "Update"},
                  {key: "2", name: "Delete"}
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
      refresh: this.props.modelProps.refresh,// basic model refresh count
      handleSelectItems: (selectedRowKeys, selectedItems) => {
        this.props.dispatch({
          type: "userMgmt/updateSelectItems",
          payload: {
            selectedRowKeys,
            selectedItems
          }
        });
      }
    };

    this.AddUserModal = {
      refresh: this.refresh
    }
  };


  render() {
    this.init();

    return (
      <div className="content-inner">

        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="用户管理">
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload"/>
                {/*list a sort of actions*/}
                <AddUserModal {...this.AddUserModal}/>
              </div>
              <DataTable {...this.tableDataProps} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

UserMgmt.propTypes = {
  loading: PropTypes.object,
  modelProps: PropTypes.object
};

export default connect(({userMgmt, loading}) => ({modelProps: userMgmt, loading}))(UserMgmt)
