/**
 * Created by chenkang1 on 2017/9/1.
 */
import {Form, Button, Modal} from 'antd'
import {BasicActionModalForm} from "../../../components/basic/BasicActionModalForm";

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

      this.props.submit.handleSubmit.call(this, values);
    }
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue} = this.props.form
    return (
      <span>
        <Button
          onClick={this.showModal}
          type="primary"
        >
          {this.props.btnText}
        </Button>

        <Modal
          visible={this.state.visible}
          title={this.props.modal.title}
          // okText="Create"
          footer={null}
          onCancel={this.handleCancel}
          // onOk={this.onCreate}
        >
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
                      rules: item.rules.map(rule => {
                        console.log()
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
        </Modal>
      </span>
    )
  }
}

export default Form.create()(AddUserModal)
