/**
 * Created by chenkang1 on 2017/7/2.
 */
import React from 'react';
import {Modal, notification} from 'antd';
import {fetch} from "../../services/restfulService";

class BatchModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  // onOk = () => {
  //   let {url, method} = this.props.fetchData;
  //   this.props.selectedItems.forEach((item) => {
  //     fetch({
  //       url: url,
  //       method: method,
  //       params: {ids: item.id}
  //     })
  //       .then((result) => {
  //         console.log(result)
  //
  //         notification.open({
  //           message: 'Notification Title',
  //           description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
  //           duration: 0,
  //           type:'success'
  //         });
  //
  //       })
  //   })
  // };

  render() {
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
    );
  }

}


BatchModal.propTypes = {};

export default BatchModal
