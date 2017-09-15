/**
 * Created by chenkang1 on 2017/6/30.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import DataTable from "../../components/BasicTable/DataTable";
import {
  Modal,
  Row,
  Col,
  Card,
  Button,
  Input,
  Select,
  Icon,
  Switch
} from "antd";
import ModalForm from "../../components/modalForm/ModalForm";
import { ClusterList } from "../../components/clusterList/ClusterList";
import addHostModal from "./addHostModal";
import tableDataProps from "./tableProps";
import clusterListProps from "./clusterListProps";

class HostPage extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  componentWillMount() {
    this.setState({
      addHostModal: addHostModal.call(this)
    });
    // console.log(111)
  }

  componentDidMount() {}

  refresh = () => {
    this.props.dispatch({ type: "host/refresh" });
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
        let { dispatch } = this.props;
        dispatch({
          type: "host/hideModal",
          payload: {
            key: "modalVisible"
          }
        });
      }
    };

    this.tableDataProps = tableDataProps.call(this);

    this.clusterListProps = clusterListProps.call(this);
  };

  render() {
    this.init();

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="主机列表">
              <ClusterList {...this.clusterListProps} />
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload" />
                <ModalForm {...this.state.addHostModal} />
              </div>
              <DataTable {...this.tableDataProps} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ host }) {
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
