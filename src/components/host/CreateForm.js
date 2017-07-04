/**
 * Created by chenkang1 on 2017/7/4.
 */
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NormalLoginForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onCreate = ()=>{
    console.log(this)
  };

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const emailError = isFieldTouched('email') && getFieldError('email');

    return (
      <Modal
        visible={this.props.visible}
        title="Create a new collection"
        okText="Create"
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.onCreate}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
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
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [
                {required: true, message: 'Please input your Password!'},
                {type: 'email', message: 'The input is not valid E-mail!',}
              ],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="text" placeholder="Email"/>
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
    );
  }
}

let CollectionCreateForm = Form.create()(NormalLoginForm);

export default CollectionCreateForm;
