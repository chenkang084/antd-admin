/**
 * Created by chenkang1 on 2017/10/09.
 */

import React from "react";
import { Spin, Card, Row, Col } from "antd";
import "./DetailPage.less";

export class DetailPage extends React.Component {
  render() {
    return (
      <Spin spinning={this.props.spinning}>
        <div className="content-inner detail-page-container">
          {this.props.data &&
            this.props.data.map(item => {
              //console.log(item);
              return (
                <Card
                  title={item.title}
                  style={{ width: "100%", border: "0px", marginBottom: "2px" }}
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
            })}
        </div>
      </Spin>
    );
  }
}
