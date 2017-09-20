/**
 * Created by chenkang1 on 2017/9/18.
 */
import { Select, Row, Col, Card, Button, Input, Icon } from "antd";
import { fetchAndNotification } from "../../services/restfulService";
import { isUndefined } from "../../utils/dataUtils";
const formItems = {
  user_name: {
    name: "user_name",
    key: "user_name",
    rules: [
      {
        required: true,
        message: "Please input your username!"
      }
    ],
    render: function() {
      return (
        <Input
          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
          placeholder="Username"
        />
      );
    }
  },
  user_pwd: {
    name: "user_pwd",
    key: "user_pwd",
    updateValueFlag: false,
    rules: [
      { required: true, message: "Please input your password!" },
      {
        validator: function checkConfirmPassword(rule, value, callback) {
          // console.log(this)
          const form = this.props.form;
          const pwd = form.getFieldValue("user_pwd_twice");
          if (value && pwd && value !== pwd) {
            callback("Two passwords that you enter is inconsistent!");
          } else {
            callback();
          }
        }
      }
    ],
    render: function() {
      return (
        <Input
          type="password"
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          placeholder="new password"
        />
      );
    }
  },
  user_pwd_twice: {
    name: "user_pwd_twice",
    key: "user_pwd_twice",
    updateValueFlag: false,
    rules: [
      { required: true, message: "Please input your password!" },
      {
        validator: function checkConfirmPassword(rule, value, callback) {
          const form = this.props.form;
          const pwd = form.getFieldValue("user_pwd");
          if (value && pwd && value !== pwd) {
            callback("Two passwords that you enter is inconsistent!");
          } else {
            callback();
          }
        }
      }
    ],
    render: function() {
      return (
        <Input
          type="password"
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          placeholder="confirm password"
        />
      );
    }
  },
  type: {
    name: "type",
    key: "type",
    rules: [{ required: true, message: "Please select your gender!" }],
    render: function() {
      return (
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select user type"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value="10">admin</Option>
          <Option value="0">ordinary</Option>
        </Select>
      );
    }
  }
};

export default function updateUserModal() {
  return {
    record: this.state.updateUserModal.record,
    refresh: this.refresh,
    btnTextShow: false,
    type: "edit",
    modalTitle: "Edit user",
    formItems: formItems,
    modalVisible: this.state.updateUserModal.modalVisible,
    submit: {
      btnText: "update",
      // should use function instead of es6 =>{} ,make sure get modalForm's current this
      handleSubmit: async function(values) {
        await fetchAndNotification({
          url: "user/user",
          method: "put",
          params: {
            ...values,
            id: this.props.record.id
          },
          notifications: {
            title: "create Action",
            success: `创建${values.user_name} 操作成功！`,
            error: `创建${values.user_name} 操作失败！`
          }
        });

        /*
           * when the fetch successfully ,refresh the table
           * current this is modalForm's runtime this
           */
        this.props.form.resetFields();
        this.props.refresh();
      }
    },
    handleModalShow: () => {},
    handleModalHide: () => {
      this.setState({
        updateUserModal: {
          modalVisible: false
        }
      });
    },
    componentDidMountCb: async function() {
      const result = await fetchAndNotification({
        url: `user/userId/${this.props.record.id}`,
        notifications: {
          title: "create Action",
          error: `获取用户${this.props.record.username}信息失败！`
        }
      });

      Object.keys(this.props.formItems).forEach(key => {
        if (isUndefined(this.props.formItems[key].updateValueFlag)) {
          this.props.form.setFieldsValue({
            [key]: result.data.items[key]
          });
        }
      });

      this.setState({
        spinning: false
      });
    }
  };
}
