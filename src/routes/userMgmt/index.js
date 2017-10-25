/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Select, Row, Col, Card, Button, Input, Icon } from "antd";
import DataTable from "../../components/BasicTable/DataTable";
import ModalForm from "../../components/modalForm/ModalForm";
import LifeCycle from "./lifeCycle";
import tableProps from "./tableProps";
import addUserModal from "./addUserModal";
import updateUserModal from "./updateUserModal";
import socketService from "../../services/socketService";

// socketService();

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
    this.tableDataProps = tableProps.call(this);

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
