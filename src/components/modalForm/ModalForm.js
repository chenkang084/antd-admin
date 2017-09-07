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
    // this.state = {
    //   visible: false,
    //   spinning: false
    // };
  }

  formData = null;
  id = null;
  // fecthFormDataOption = null;

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  // showModal = () => {
  //   this.setState({visible: true})
  // };
  // handleCancel = () => {
  //   this.setState({visible: false})
  //   if (this.props.fetchModalData) {
  //     // this.formData = null;
  //   }
  // };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleModalHide();
        this.props.submit.handleSubmit.call(this, values)
      }
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
    // this.setState({spinning: true})
    fetchAndNotification(options).then((result) => {
      this.formData = result;
      // this.setState({spinning: false})
    })
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
    if (this.props.type === 'edit' && this.props.modalVisible && !this.props.spinning) {
      console.log('...........')

      const user_name = this.props.form.getFieldValue('user_name');

      if (!user_name){
        this.props.form.setFieldsValue({
          user_name: `21231`,
        });
      }


    }
  }


  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form

    return (
      <span>
        {
          this.props.btnTextShow ? <Button
            onClick={this.props.handleModalShow}
            type="primary"
          >
            {this.props.btnText}
          </Button>
            : null
        }
        <Modal
          visible={this.props.modalVisible}
          title={this.props.modalTitle}
          // okText="Create"
          footer={null}
          onCancel={this.props.handleModalHide}
          // onOk={this.onCreate}
        >
          <Spin tip="Loading..." spinning={this.props.spinning}>
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
