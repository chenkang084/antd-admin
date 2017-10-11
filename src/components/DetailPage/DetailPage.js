/**
 * Created by chenkang1 on 2017/10/09.
 * 
 * detail page 分为2种：含tabs，不含tabs
 * 含tabs的数据结构为：
    detailData = {
      tabs: ["a"],
      contents: {
        a: [
          {
            title: "xx",
            rows: []
          }
        ]
      }
    }; 
  
 * 
 * 不含tabs的数据结构为：
    detailData = {
      contents: [
        {
          title: "xx",
          rows: []
        }
      ]
    };  
 */

import React from "react";
import { Spin, Card, Row, Col, Tabs } from "antd";

import "./DetailPage.less";

export class DetailPage extends React.Component {
  render() {
    const TabPane = Tabs.TabPane;

    const renderContent = content => {
      return content.map(item => {
        return (
          <Card
            title={item.title}
            style={{
              width: "100%",
              border: "0px",
              marginBottom: "2px"
            }}
          >
            {item.rows &&
              item.rows.length > 0 &&
              item.rows.map(row => {
                return (
                  <Row gutter={12}>
                    <Col className="row" span={3}>
                      {row.key}
                    </Col>
                    <Col className="row" span={9}>
                      {row.render ? row.render() : row.value}
                    </Col>
                  </Row>
                );
              })}
          </Card>
        );
      });
    };

    return (
      <Spin spinning={this.props.spinning}>
        <div className="content-inner detail-page-container">
          {this.props.data &&
            (this.props.data.tabs && this.props.data.tabs.length > 0
              ? this.props.data.tabs.map(item => {
                  return (
                    <Tabs defaultActiveKey={this.props.data.tabs[0]}>
                      <TabPane tab={item} key={item}>
                        {renderContent(this.props.data.contents[item])}
                      </TabPane>
                    </Tabs>
                  );
                })
              : renderContent(this.props.data.contents))}
        </div>
      </Spin>
    );
  }
}
