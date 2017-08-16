/**
 * Created by chenkang1 on 2017/8/14.
 */
import React from 'react';

// export default (props) =>{
//   console.log('xxxxxxxxxxxxxxxvvvvvvvv11')
//   console.log(props.children)
//   return (
//     <div>
//       test
//     </div>
//   )
// }

export default class Mytest extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this)
    this.state = {age: 10, count: 0}
  }

  getInitialState() {
    return {
      name: 'jack'
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  handleClick = () => {
    console.log(this.state.count)
    this.setState((prevState, props) => {
      count:prevState.count++
    })
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps")
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  render() {
    console.log('render')
    return (
      <div >
        <button onClick={this.handleClick}>click</button>
        test
        {this.state.count}
        <MyText count={this.state.count}/>
      </div>
    )
  }
}


class MyText extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps() {
    console.log("MyText componentWillReceiveProps")
  }

  componentWillUpdate() {
    console.log("MyText componentWillUpdate")
  }

  componentDidUpdate() {
    console.log("MyText componentDidUpdate")
  }

  render() {
    console.log("MyText render")
    return (
      <div >
        Mytext:{this.props.count}
      </div>
    )
  }
}
