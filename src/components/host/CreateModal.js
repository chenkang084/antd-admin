/**
 * Created by chenkang1 on 2017/7/4.
 */
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import CollectionCreateForm from './CreateForm';
const FormItem = Form.Item;


export class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({visible: true});
  };
  handleCancel = () => {
    this.setState({visible: false});
  };
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({visible: false});
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    return (
      <span>
        <Button type="primary" onClick={this.showModal}>Create</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </span>
    );
  }
}
