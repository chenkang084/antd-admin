/**
 * Created by chenkang1 on 2017/9/11.
 */
import {Modal, Row, Col, Card, Button, Menu, Dropdown, Icon} from "antd";

export const ClusterList = ({clusterList, defaultCluster, changeCluster}) => {

  function handleMenuClick(e) {
    // message.info('Click on menu item.');
    console.log('click', e);
    const currentCluster = clusterList.filter(cluster => {
      return cluster.id + '' === e.key
    })
    changeCluster(currentCluster)
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
