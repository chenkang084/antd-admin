import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'

const Search = Input.Search

const ColProps = {
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
}

const Filter = ({
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                  },
                }) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
        <div>

        </div>
      </Col>
      <Col {...TwoColProps} xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 9 }}>
        <div className="search-container">
          {getFieldDecorator('name', { initialValue: name })(<Search placeholder="Search" size="large"
            onSearch={handleSubmit}
            style={{ width: '200px', 'margin-right': '10px' }}
          />)}
          <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
