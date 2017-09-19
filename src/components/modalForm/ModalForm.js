/**
 * Created by chenkang1 on 2017/9/1.
 */
import { Form, Button, Modal, Spin } from "antd";
import { isUndefined } from "../../utils/dataUtils";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setFields: null,
      modalVisible: false,
      spinning: true
    };

    this.initData = false;
  }

  prevValues = {};

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.handleModalHide();
        this.props.submit.handleSubmit.call(this, values);
      }
    });
  };

  submitAction(err, values) {
    if (!err) {
      console.log("Received values of form: ", values);
      this.handleCancel();

      this.props.submit.handleSubmit.call(this, values);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");

  }

  componentDidUpdate() {
    console.log("componentDidUpdate");

    if (this.state.setFields) {
      for (const field in this.state.setFields) {
        this.props.form.setFieldsValue({
          [field]: this.props.formItems[field].updateValue
        });
      }
    }

    // if (
    //   this.props.type === "edit" &&
    //   this.props.modalVisible &&
    //   !this.props.spinning
    // ) {
    //   console.log("...........");

    //   const values = this.props.form.getFieldsValue();
    //   for (const key in values) {
    //     const val = values[key];
    //     // val equals undefined
    //     if (isUndefined(val)) {
    //       // need update value ,updateValueFlag default is undefined
    //       if (isUndefined(this.props.formItems[key].updateValueFlag)) {
    //         this.prevValues[key] = this.props.formItems[key].updateValue;
    //         this.props.form.setFieldsValue({
    //           [key]: this.props.formItems[key].updateValue
    //         });
    //       }
    //     } else {
    //       // need update, prev value is not equals current value ,so use current value
    //       if (
    //         isUndefined(this.props.formItems[key].updateValueFlag) &&
    //         this.prevValues[key] !== this.props.formItems[key].updateValue
    //       ) {
    //         // update prev value
    //         this.prevValues[key] = this.props.formItems[key].updateValue;
    //         this.props.form.setFieldsValue({
    //           [key]: this.props.formItems[key].updateValue
    //         });
    //       }
    //     }
    //   }
    // }
  }

  handleModalShow = () => {
    this.setState({
      modalVisible: true
    });

    this.props.handleModalShow && this.props.handleModalShow.call(this);
  };

  handleModalHide = () => {
    this.initData = false;
    this.setState({
      modalVisible: false
    });
    this.props.handleModalHide && this.props.handleModalHide.call(this);
  };

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
        {this.props.btnTextShow ? (
          <Button
            onClick={this.handleModalShow}
            type="primary"
            disabled={!this.props.defaultCluster}
          >
            {this.props.btnText}
          </Button>
        ) : null}
        <Modal
          visible={this.state.modalVisible}
          title={this.props.modalTitle}
          // okText="Create"
          footer={null}
          onCancel={this.handleModalHide}
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

export default Form.create()(ModalForm);
