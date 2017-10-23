/**
 * Created by chenkang1 on 2017/7/4.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Modal } from "antd";
import PropTypes from "prop-types";
import { fetchAndNotification } from "../../services/restfulService";
import { BasicActionModalForm } from "../basic/BasicActionModalForm";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NormalLoginForm extends BasicActionModalForm {
  constructor(props) {
    super(props);
  }

  /**
   * when passes the form validation , then call the function
   * @param err
   * @param values
   */
  submitAction(err, values) {
    if (!err) {
      console.log("Received values of form: ", values);
      this.handleCancel();

      fetchAndNotification({
        url: "create",
        method: "post",
        params: values,
        notifications: {
          title: "create Action",
          success: `创建${values.userName} 操作成功！`,
          error: `创建${values.userName} 操作失败！`
        }
      }).then(result => {
        //when the fetch successfully ,refresh the table
        this.props.form.resetFields();
        this.props.refresh();
      });
    }
  }

  // saveFormRef(form){
  //   this.props.form = form;
  // }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    const emailError = isFieldTouched("email") && getFieldError("email");

    return (
      <div style={{ display: "inline-block" }}>
        <Button type="primary" onClick={this.showModal}>
          Create
        </Button>
        <Modal
          visible={this.state.visible}
          title="Create a new collection"
          okText="Create"
          footer={null}
          onCancel={this.handleCancel}
          // onOk={this.onCreate}
        >
          <Form
            ref={this.saveFormRef}
            layout="vertical"
            onSubmit={this.handleSubmit}
          >
            <FormItem
              validateStatus={userNameError ? "error" : ""}
              help={userNameError || ""}
            >
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? "error" : ""}
              help={passwordError || ""}
            >
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem
              validateStatus={emailError ? "error" : ""}
              help={emailError || ""}
            >
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                  { type: "email", message: "The input is not valid E-mail!" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="text"
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.function,
  visible: PropTypes.boolean
};

export default Form.create()(NormalLoginForm);
