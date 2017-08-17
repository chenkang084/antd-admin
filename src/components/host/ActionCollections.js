/**
 * Created by chenkang1 on 2017/7/4.
 */
import React from 'react'
import ModalForm from './ModalForm'
/**
 * action collections
 */
export class ActionCollections extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <span>
        <ModalForm
          refresh={this.props.refresh}
        />
      </span>
    )
  }
}
