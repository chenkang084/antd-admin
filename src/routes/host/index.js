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
import tableProps from "./tableProps";
import clusterListProps from "./clusterListProps";

class HostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // addHostModal: addHostModal.call(this),
      // addHostModalVisible: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  refresh = () => {
    this.props.dispatch({
      type: "host/refresh"
    });
  };

  init = () => {
    this.modalProps = {
      visible: this.props.model.modalVisible,
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

    this.tableProps = tableProps.call(this);

    this.clusterListProps = clusterListProps.call(this);

    this.addHostModal = addHostModal.call(this);
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
                <ModalForm {...this.addHostModal} />
              </div>
              <DataTable {...this.tableProps} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ host }) {
  return {
    model: host
  };
}

HostPage.propTypes = {
  cluster: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  model: PropTypes.object
};

export default connect(mapStateToProps)(HostPage);
