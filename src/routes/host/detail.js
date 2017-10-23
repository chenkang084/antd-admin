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
import Highcharts from "../../services/highcharts";

class HostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: true
    };
  }

  initChart(element) {
    Highcharts.chart(element, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Browser market shares January, 2015 to May, 2015"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Microsoft Internet Explorer",
              y: 56.33
            },
            {
              name: "Chrome",
              y: 24.03,
              sliced: true,
              selected: true
            },
            {
              name: "Firefox",
              y: 10.38
            },
            {
              name: "Safari",
              y: 4.77
            },
            {
              name: "Opera",
              y: 0.91
            },
            {
              name: "Proprietary or Undetectable",
              y: 0.2
            }
          ]
        }
      ]
    });
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
    let detailData = {},
      content0 = [];
    const tabs = ["信息"];

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

    content0.push(card1);

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

    content0.push(card2);

    detailData = {
      tabs: tabs,
      contents: {
        [tabs[0]]: content0
      }
      // contents: content0
    };

    return detailData;
  };

  render() {
    return (
      <div>
        <DetailPage spinning={this.state.spinning} data={this.state.data} />
        <div ref={this.initChart} />
      </div>
    );
  }
}

HostDetail.propTypes = {};

export default connect(host => host)(HostDetail);
