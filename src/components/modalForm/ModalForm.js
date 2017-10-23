/**
 * Created by chenkang1 on 2017/9/1.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Form, Button, Modal, Spin } from "antd";
import { isUndefined } from "../../utils/dataUtils";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalForm extends React.Component {
  constructor(props) {
    super(props);

    const state = this.props.state || {};

    this.state = {
      ...state,
      spinning: true
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.props.componentDidMountCb && this.props.componentDidMountCb.call(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.handleModalHide();
        this.props.submit.handleSubmit.call(this, values);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    this.props.componentWillReceivePropsCb &&
      this.props.componentWillReceivePropsCb.call(this);
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        {this.props.btnShow ? (
          <Button
            onClick={this.props.handleModalShow.bind(this)}
            type="primary"
            disabled={this.props.btnDisabled}
          >
            {this.props.btnText}
          </Button>
        ) : null}
        <Modal
          visible={this.props.modalVisible}
          title={this.props.modalTitle}
          // okText="Create"
          footer={null}
          onCancel={this.props.handleModalHide}
          // onOk={this.onCreate}
        >
          <Spin tip="Loading..." spinning={this.state.spinning}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              {this.props.formItems &&
                Object.keys(this.props.formItems).map(key => {
                  const item = this.props.formItems[key];
                  const error =
                    isFieldTouched(item.key) && getFieldError(item.key);
                  const element = item.render.call(this);

                  return (
                    <FormItem
                      {...formItemLayout}
                      validateStatus={error ? "error" : ""}
                      help={error || ""}
                      label={item.name}
                    >
                      {getFieldDecorator(item.key, {
                        initialValue: item.initialValue,
                        rules: item.rules.map(rule => {
                          if (
                            rule.validator &&
                            typeof rule.validator === "function"
                          ) {
                            return rule.validator.bind(this);
                          }
                          return rule;
                        })
                      })(element)}
                    </FormItem>
                  );
                })}
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  {this.props.submit.btnText}
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default Form.create({})(ModalForm);
