/**
 * Created by root on 17-6-23.
 */

import React from 'react'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import List from './newUser'

const Index = ({newUser,dispatch, location, loading})=>{
  const {listFrontPage,paginationFront,sortedInfo} = newUser;
  const { query = {}, pathname } = location;

  function tryClick(id) {

    console.log(id)
  }

  const listProps = {
    scroll:true,
    pagination:false,
    dataSource: listFrontPage,
    loading: loading.effects['newUser/query'],
  ...paginationFront,
    sortedInfo,
    // onChange (page) {
    //   dispatch(routerRedux.push({
    //     pathname,
    //     query: {
    //       ...query,
    //       page: page.current,
    //       pageSize: page.pageSize,
    //     },
    //   }))
    // },
  }

  return (<div className="content-inner">

    <p>NewUser</p>
    <div>
      <a onClick={tryClick.bind(null,paginationFront.pageSize)}>tryme</a>
    </div>
    <List {...listProps}/>
  </div>)
};

Index.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({newUser,loading})=>({newUser,loading}))(Index)
