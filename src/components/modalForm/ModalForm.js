/**
 * Created by chenkang1 on 2017/9/1.
 */
import {Form, Button, Modal, Spin} from 'antd'
import {fetchAndNotification} from "../../services/restfulService";

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ModalForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      spinning: false
    };
  }

  formData = null;
  id = null;
  // fecthFormDataOption = null;

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  showModal = () => {
    this.setState({visible: true})
  };
  handleCancel = () => {
    this.setState({visible: false})
    if (this.props.fetchModalData) {
      // this.formData = null;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.submitAction(err, values)
    })
  };

  submitAction(err, values) {
    if (!err) {
      console.log('Received values of form: ', values);
      this.handleCancel();

      this.props.submit.handleSubmit.call(this, values);
    }
  }

  queryModalData(options) {
    this.setState({spinning: true})
    fetchAndNotification(options).then((result) => {
      this.formData = result;
      this.setState({spinning: false})
    })
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
    if (this.props.fetchModalData) {
      if (!this.state.visible && !this.formData) {
        this.showModal()
        this.queryModalData(this.props.fetchModalData)
      }

      // visible is false,and this.formData !=null ,that means user click the modal close btn manually ,so we need reset formData to null
      if (!this.state.visible && this.formData) {
        this.formData = null;
      }
    }
  }


  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form

    return (
      <span>
        {
          this.props.btnTextShow ? <Button
            onClick={this.showModal}
            type="primary"
          >
            {this.props.btnText}
          </Button>
            : null
        }
        <Modal
          // visible={this.state.visible}
          visible={this.props.modalVisible}
          title={this.props.modal.title}
          // okText="Create"
          footer={null}
          onCancel={this.handleCancel}
          // onOk={this.onCreate}
        >
          <Spin tip="Loading..." spinning={this.state.spinning}>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
            {
              this.props.formItems && this.props.formItems.map((item) => {
                const error = isFieldTouched(item.key) && getFieldError(item.key);
                const element = item.render();
                return (
                  <FormItem
                    validateStatus={error ? 'error' : ''}
                    help={error || ''}
                  >
                    {getFieldDecorator(item.key, {
                      initialValue: item.initialValue,
                      rules: item.rules.map(rule => {
                        if (rule.validator && typeof rule.validator === 'function') {
                          return rule.validator.bind(this)
                        }
                        return rule
                      }),
                    })(
                      element
                    )}
                  </FormItem>
                )
              })
            }
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
    )
  }
}

export default Form.create()(ModalForm)
