/**
 * Created by chenkang1 on 2017/9/4.
 */
import React from "react";

export default class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privateCount: this.props.count
    };
    console.log(props);
  }

  componentWillMount() {
    console.log("willMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  handleLife = () => {
    this.setState((prevState, props) => {
      return {
        privateCount: prevState.privateCount + 1
      };
    });
  };

  render() {
    return (
      <div>
        {this.props.count}
        test
        <button onClick={this.handleLife}>click</button>
        privateCount:{this.state.privateCount}
      </div>
    );
  }
}
