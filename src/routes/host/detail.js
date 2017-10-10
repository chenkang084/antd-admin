/**
 * Created by chenkang1 on 2017/8/21.
 */

import React from "react";
import { connect } from "dva";
import { Spin, Card } from "antd";
import { Link } from "dva/router";
import { fetchAndNotification } from "../../services/restfulService";
import { parseUrlParams } from "../../utils/dataUtils";
import { DetailPage } from "../../components/DetailPage/DetailPage";

class HostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: true
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
        data: this.convertDetailData(result.data)
      });
    });
  };

  convertDetailData = data => {
    console.log(data);
    let detailData = [];

    let card1 = {
      title: "基本信息",
      rows: [
        {
          key: "名称",
          value: data.hostname
        },
        {
          key: "外部IP",
          value: data.publicip
        }
      ]
    };

    detailData.push(card1);

    let card2 = {
      title: "主机组信息",
      rows: [
        {
          key: "主机组",
          value: data.group_name
        },
        {
          key: "存储介质",
          render: () => {
            return <Link to="/userMgmt">test</Link>;
          }
        }
      ]
    };

    detailData.push(card2);

    return detailData;
  };

  render() {
    return (
      <div>
        <DetailPage spinning={this.state.spinning} data={this.state.data} />
      </div>
    );
  }
}

HostDetail.propTypes = {};

export default connect(host => host)(HostDetail);
