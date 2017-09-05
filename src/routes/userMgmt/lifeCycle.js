/**
 * Created by chenkang1 on 2017/9/4.
 */
import React from "react";

export default class LifeCycle extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    console.log("willMount")
  }

  componentDidMount(){
    console.log("componentDidMount")
  }

  componentWillReceiveProps(){
    console.log("componentWillReceiveProps")
  }

  componentWillUpdate(){
    console.log("componentWillUpdate")
  }

  componentDidUpdate(){
    console.log("componentDidUpdate")
  }


  render(){
    return (
      <div>
        {this.props.test}
        test
      </div>
    )
  }
}
