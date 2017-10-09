/**
 * Created by chenkang1 on 2017/8/21.
 */

import React from "react";
import { connect } from "dva";
import { Spin } from "antd";
import { fetchAndNotification } from "../../services/restfulService";
import { parseUrlParams } from "../../utils/dataUtils";

class HostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: true
      // data: null,
      // id: window.location.pathname
      //   ? window.location.pathname.substr(
      //       window.location.pathname.lastIndexOf("/") + 1
      //     )
      //   : ""
    };
  }

  componentDidMount() {
    const params = parseUrlParams(window.location.search);
    this.fetchDetail(params);
  }

  fetchDetail = params => {
    fetchAndNotification({
      url: `ceph/clusters/${params.clusterId}/servers/${params.hostId}`,
      method: "get",
      api: "v2",
      notifications: {
        error: `获取数据失败！`
      }
    }).then(result => {
      this.setState({
        spinning: false,
        data: result.data
      });
    });
  };

  render() {
    return (
      <Spin spinning={this.state.spinning}>
        <div className="content-inner">
          <p>name:{this.state.data ? this.state.data.name : null}</p>
          <p>age:{this.state.data ? this.state.data.age : null}</p>
        </div>
      </Spin>
    );
  }
}

HostDetail.propTypes = {};

export default connect(host => host)(HostDetail);
