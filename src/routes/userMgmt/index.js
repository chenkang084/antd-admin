/**
 * Created by chenkang1 on 2017/8/30.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "dva";
import {Select, Row, Col, Card, Button, Input, Icon} from "antd";
import DataTable from "../../components/BasicTable/DataTable";
import DropOption from "../../components/DropOption/DropOption";
import {fetchAndNotification} from "../../services/restfulService";
import ModalForm from "../../components/modalForm/ModalForm";
import LifeCycle from "./lifeCycle";

class UserMgmt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userUpdateModalvisible: false,
      userUpdateFetchData: null,
      addUserModal: null,
      updateUserModal: null
    };
  }

  componentWillMount() {

    this.lifeCycle = {
      test: this.state.test
    };

    this.addUserModal = {
      refresh: this.refresh,
      btnText: 'Add user',
      btnTextShow: true,
      formItems: [
        {
          name: 'user_name',
          key: 'user_name',
          rules: [
            {
              required: true, message: 'Please input your username!'
            },
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
        // should use function instead of es6 =>{} ,make sure get modalForm's current this
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
          }).then(() => {
            /*
             * when the fetch successfully ,refresh the table
             * current this is modalForm's runtime this
             */
            this.props.form.resetFields();
            this.props.refresh()
          })
        }
      },
      modal: {
        title: 'Add User'
      }
    }

    // this.setState({
    //   updateUserModal: this.updateUserModal
    // })
  }

  refresh = () => {
    this.props.dispatch({type: "userMgmt/refresh"});
  };

  /*
   * if the props will update in sometimes, should write in init or render method
   * if the props are constant, you can write it in componentWillMount
   */
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
                onMenuClick={e => {
                  console.log()
                  this.tableDataProps.handleMenuClick(record, e)
                }}
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
      },
      handleMenuClick: (record, e) => {
        if (e.key === "1") {
          fetchAndNotification({
            url: `user/userId/${record.id}`,
            method: 'get',
            notifications: {
              title: 'create Action',
              error: `获取用户${record.username}信息失败！`,
            }
          }).then((result) => {
            if (result.data && result.data.type === "success") {
              for (const key in result.data.items) {
                for (let i = 0; i < this.updateUserModal.formItems.length; i++) {
                  let _key = this.updateUserModal.formItems[i].key;
                  if (key === _key) {
                    this.updateUserModal.formItems[i].initialValue = result.data.items[key]
                    console.log(this.updateUserModal)
                    break;
                  }
                }
              }

              this.updateUserModal.modalVisible = true;
              this.setState({
                updateUserModal: this.updateUserModal
              })
            }
          })

        } else if (e.key === "2") {
          fetchAndNotification({
            url: `user/userId/${record.id}`,
            method: 'delete',
            notifications: {
              title: 'create Action',
              success: `删除${record.username} 操作成功！`,
              error: `删除${record.username} 操作失败！`,
            }
          })
            .then(() => {
              this.refresh()
            })
        }
      }
    };

    this.updateUserModal = {

      refresh: this.refresh,
      modalVisible: false,
      btnTextShow: false,
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
        // should use function instead of es6 =>{} ,make sure get modalForm's current this
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
          }).then(() => {
            /*
             * when the fetch successfully ,refresh the table
             * current this is modalForm's runtime this
             */
            this.props.form.resetFields();
            this.props.refresh()
          })
        }
      },
      modal: {
        title: 'Update User'
      },
      modalHandleCancel: () => {
        this.setState({
          userUpdateModalvisible: false,
        })
      }
    }
  }
  // this.updateUserModal.modalVisible = this.state.userUpdateModalvisible;


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
                <ModalForm {...this.addUserModal}/>
                {this.state.updateUserModal ? <ModalForm {...this.state.updateUserModal} /> : null}
                {/*<ModalForm {...this.updateUserModal} fetchModalData={this.state.userUpdateFetchData}/>*/}

                {/*<LifeCycle {...this.lifeCycle} fetchData={this.state.userUpdateFetchData}/>*/}
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
