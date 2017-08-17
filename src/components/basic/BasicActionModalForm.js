/**
 * Created by chenkang1 on 2017/8/17.
 */
import React from 'react'

export class BasicActionModalForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.submitAction(err, values)
    })
  };

  showModal = () => {
    this.setState({ visible: true })
  };
  handleCancel = () => {
    this.setState({ visible: false })
  };
}
