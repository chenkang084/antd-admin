/**
 * Created by chenkang1 on 2017/8/21.
 */

import React from "react";
import { connect } from "dva";
import { Spin, Card } from "antd";
import { fetchAndNotification } from "../../services/restfulService";
import { parseUrlParams } from "../../utils/dataUtils";
import { DetailPage } from "../../components/DetailPage";

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
      <div>
        <DetailPage />
      </div>
    );
  }
}

HostDetail.propTypes = {};

export default connect(host => host)(HostDetail);
