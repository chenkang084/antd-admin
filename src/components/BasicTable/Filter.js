import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Row, Col, Input, Icon} from 'antd'

const ColProps = {
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
}

class Filter extends React.Component {

  refresh = this.props.refresh;

  componentWillMount() {
    this.state = {
      input: ''
    }
  }

  handleSubmit = () => {
    let fields = this.props.form.getFieldsValue();
    this.props.onFilterChange(fields);
  }

  onChangeUserName = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  clearInput = () => {
    this.props.form.resetFields();
    this.setState({
      input: ''
    });
    this.handleSubmit();
  };

  componentWillUpdate() {
    if (this.refresh !== this.props.refresh) {
      this.clearInput();
      this.refresh = this.props.refresh;
    }
  }

  render() {

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{span: 12}} md={{span: 12}}>
          <div>

          </div>
        </Col>
        <Col {...TwoColProps} xl={{span: 12}} md={{span: 12}} sm={{span: 9}}>
          <div className="search-container">
            {this.props.form.getFieldDecorator('name')(<Input placeholder="Search" size="large"
                                                              suffix={
                                                                this.state.input.length > 0 ?
                                                                  <Icon style={{cursor: 'pointer'}} type="close"
                                                                        onClick={this.clearInput}/>
                                                                  : <Icon style={{cursor: 'pointer'}} type="search"/>
                                                              }
                                                              onPressEnter={this.handleSubmit}
                                                              onChange={this.onChangeUserName}
                                                              style={{width: '200px', 'margin-right': '10px'}}
            />)}
            <Button type="primary" size="large" className="margin-right" onClick={this.handleSubmit}>Search</Button>
          </div>
        </Col>
      </Row>
    )
  }
}


Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
