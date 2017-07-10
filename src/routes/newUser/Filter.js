/**
 * Created by root on 17-6-27.
 */


import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from '../../components'
import { Form, Row, Col, Input, Button } from 'antd'

const Search = Input.Search
const ColProps = {
  xs: {
    span: 24,
    offset: 0,
  },
  sm: {
    span: 12,
    offset: 0,
  },
  style: {
    marginBottom: 16,
  },
}


const Filter = ({
  onAdd,
  refresh,
  loading,
  selectedRowKeys,
  hasSelected,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const { text } = filter

  return (
    <Row gutter={24} type="flex" justify="space-between" >
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('text', { initialValue: text })(<Search placeholder="Search for any field" size="large"
          onSearch={handleSubmit}
        />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4, offset: 16 }} md={{ span: 8, offset: 8 }} style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
        <Button type="danger" onClick={refresh} loading={loading}>Refresh</Button>
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <Button size="large" type="ghost" onClick={onAdd}>Create</Button>
      </Col>

    </Row>

  )
}


export default Form.create()(Filter)
