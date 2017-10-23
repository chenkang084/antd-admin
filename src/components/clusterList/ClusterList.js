/**
 * Created by chenkang1 on 2017/9/11.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Button, Menu, Dropdown, Icon} from "antd";

export const ClusterList = ({clusterList, defaultCluster, changeCluster}) => {

  function handleMenuClick(e) {
    changeCluster(clusterList.filter(cluster => {
      return cluster.id + '' === e.key
    }))
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        clusterList.map((cluster) => {
          return (
            <Menu.Item key={cluster.id}>{cluster.name}</Menu.Item>
          )
        })
      }
    </Menu>
  );

  return (
    <div style={{
      'line-height': '40px',
      'margin-bottom': '20px',
      'border-bottom': '1px solid #f4f4f4',
      'padding-bottom': '10px'
    }}>
      集群：
      <Dropdown overlay={menu}>
        <Button style={{marginLeft: 8}}>
          {defaultCluster ? defaultCluster.name : '' } <Icon type="down"/>
        </Button>
      </Dropdown>
    </div>
  )
}
