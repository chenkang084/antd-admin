/**
 * Created by chenkang1 on 2017/7/2.
 */
import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

class BatchModal extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
        >
          {
            this.props.selectedItems.map((item) => (<p>{item.name}</p>))
          }
        </Modal>
      </div>
    )
  }

}


BatchModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.boolean,
  onOk: PropTypes.function,
  onCancel: PropTypes.function,
  selectedItems: PropTypes.array,
}

export default BatchModal
