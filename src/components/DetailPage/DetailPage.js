/**
 * Created by chenkang1 on 2017/10/09.
 */

import React from "react";
import { Spin, Card } from "antd";

export class DetailPage extends React.Component {

    render(){
        return (
            <Spin spinning={true}>
            <div className="content-inner">
              <Card
                loading
                title="Card title"
                style={{ width: "100%", border: "0px" }}
              >
                Whatever content
              </Card>
              <Card
                loading
                title="Card title"
                style={{ width: "100%", border: "0px" }}
              >
                Whatever content
              </Card>
            </div>
          </Spin>
        )
    }
}
