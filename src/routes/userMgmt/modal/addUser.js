/**
 * Created by chenkang1 on 2017/9/1.
 */
import {Form, Icon, Input, Button, Modal, Menu, Dropdown, Select} from 'antd'
import {BasicActionModalForm} from "../../../components/basic/BasicActionModalForm";
import {fetchAndNotification} from "../../../services/restfulService";

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class AddUserModal extends BasicActionModalForm {

  constructor(props) {
    super(props);
  }

  submitAction(err, values) {
    if (!err) {
      console.log('Received values of form: ', values);
      this.handleCancel();

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

  // the two password whether the same
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    const pwd = form.getFieldValue('user_pwd');
    if (value && pwd && value !== pwd) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  // the two password whether the same
  checkConfirmPassword = (rule, value, callback) => {
    const form = this.props.form;
    const pwd = form.getFieldValue('user_pwd_twice');
    if (value && pwd && value !== pwd) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue} = this.props.form

    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('user_pwd') && getFieldError('user_pwd')
    const passwordTwiceError = isFieldTouched('user_pwd_twice') && getFieldError('user_pwd_twice')
    const emailError = isFieldTouched('email') && getFieldError('email')


    const menu = (
      <Menu >
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3d menu item</Menu.Item>
      </Menu>
    );

    return (
      <span>
        <Button
          onClick={this.showModal}
          type="primary"
        >
          Add User
        </Button>

        <Modal
          visible={this.state.visible}
          title="Add User"
          // okText="Create"
          footer={null}
          onCancel={this.handleCancel}
          // onOk={this.onCreate}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('user_name', {
                rules: [
                  {required: true, message: 'Please input your username!'},
                ],
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
              )}
            </FormItem>

            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('user_pwd', {
                rules: [
                  {required: true, message: 'Please input your username!'},
                  {validator: this.checkConfirmPassword}
                ],
              })(
                <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>} placeholder="new password"/>
              )}
            </FormItem>

            <FormItem
              validateStatus={passwordTwiceError ? 'error' : ''}
              help={passwordTwiceError || ''}
            >
              {getFieldDecorator('user_pwd_twice', {
                rules: [
                  {required: true, message: 'Please input your username!'},
                  {validator: this.checkPassword}
                ],
              })(
                <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                       placeholder="confirm new password"
                />
              )}
            </FormItem>

            <FormItem
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {
                getFieldDecorator('type', {
                  rules: [{required: true, message: 'Please select your gender!'}],
                })(
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
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                create
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(AddUserModal)
