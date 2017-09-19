/**
 * Created by chenkang1 on 2017/9/18.
 */

export const formItems = {
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
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="10">admin</Option>
            <Option value="0">ordinary</Option>
          </Select>
        );
      }
    }
  };

export default function addUserModal() {
    
}
