/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import {Select, Row, Col, Card, Button, Input, Icon} from "antd";

import DataTable from "../../components/BasicTable/DataTable";
import DropOption from "../../components/DropOption/DropOption";
import AddUserModal from "./modal/addUser";
import {fetchAndNotification} from "../../services/restfulService";

class UserMgmt extends React.Component {

  refresh = () => {
    this.props.dispatch({type: "userMgmt/refresh"});
  };

  init = () => {
    this.tableDataProps = {
      columns: [
        {
          title: "username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "time",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "Operation",
          key: "operation",
          width: 100,
          render: (text, record) => {
            return (
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  {key: "1", name: "Update"},
                  {key: "2", name: "Delete"}
                ]}
              />
            );
          }
        }
      ],
      fetchData: {
        url: "/user/users",
        params: null
      },
      errorMsg: "get user table error",
      refresh: this.props.modelProps.refresh,// basic model refresh count
      handleSelectItems: (selectedRowKeys, selectedItems) => {
        this.props.dispatch({
          type: "userMgmt/updateSelectItems",
          payload: {
            selectedRowKeys,
            selectedItems
          }
        });
      }
    };

    this.AddUserModal = {
      refresh: this.refresh,
      btnText: 'Add user',
      formItems: [
        {
          name: 'user_name',
          key: 'user_name',
          rules: [
            {required: true, message: 'Please input your username!'},
          ],
          render: function () {
            return (<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>)
          }
        },
        {
          name: 'user_pwd',
          key: 'user_pwd',
          rules: [
            {required: true, message: 'Please input your password!'},
            {
              validator: function checkConfirmPassword(rule, value, callback) {
                // console.log(this)
                const form = this.props.form;
                const pwd = form.getFieldValue('user_pwd_twice');
                if (value && pwd && value !== pwd) {
                  callback('Two passwords that you enter is inconsistent!');
                } else {
                  callback();
                }
              }
            }
          ],
          render: function () {
            return (
              <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>} placeholder="new password"/>)
          }
        },
        {
          name: 'user_pwd',
          key: 'user_pwd_twice',
          rules: [
            {required: true, message: 'Please input your password!'},
            {
              validator: function checkConfirmPassword(rule, value, callback) {
                const form = this.props.form;
                const pwd = form.getFieldValue('user_pwd');
                if (value && pwd && value !== pwd) {
                  callback('Two passwords that you enter is inconsistent!');
                } else {
                  callback();
                }
              }
            }
          ],
          render: function () {
            return (<Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           placeholder="confirm password"/>)
          }
        },
        {
          "name": "type",
          "key": "type",
          rules: [{required: true, message: 'Please select your gender!'}],
          render: function () {
            return (
              <Select
                showSearch
                style={{width: 200}}
                placeholder="Select user type"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="10">admin</Option>
                <Option value="0">ordinary</Option>
              </Select>
            )
          }
        }
      ],
      submit: {
        btnText: 'create',
        handleSubmit: function (values) {
          fetchAndNotification({
            url: 'user/user',
            method: 'post',
            params: values,
            notifications: {
              title: 'create Action',
              success: `创建${values.user_name} 操作成功！`,
              error: `创建${values.user_name} 操作失败！`,
            },
          }).then((result) => {
            //when the fetch successfully ,refresh the table
            this.props.form.resetFields();
            this.props.refresh()
          })
        }
      }
      ,
      modal: {
        title: 'Add User'
      }
      ,
      checkConfirmPassword: () => {
        console.log()
      }
    }
  };


  render() {
    this.init();

    return (
      <div className="content-inner">

        <Row gutter={32}>
          <Col lg={24} md={24}>
            <Card title="用户管理">
              <div className="action-btn-container">
                <Button type="primary" onClick={this.refresh} icon="reload"/>
                {/*list a sort of actions*/}
                <AddUserModal {...this.AddUserModal}/>
              </div>
              <DataTable {...this.tableDataProps} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

UserMgmt.propTypes = {
  loading: PropTypes.object,
  modelProps: PropTypes.object
};

export default connect(({userMgmt, loading}) => ({modelProps: userMgmt, loading}))(UserMgmt)
