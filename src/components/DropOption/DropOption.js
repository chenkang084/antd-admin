import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Button, Icon, Menu } from "antd";

class DropOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onMenuClick = e => {
    this.setState(prevState => {
      return {
        visible: true
      };
    });

    if (e.key) {
      this.props.onMenuClick(e);
      this.setState(prevState => {
        return {
          visible: false
        };
      });
    }
  };

  handleDropDown = () => {
    this.setState(prevState => {
      return {
        visible: !prevState.visible
      };
    });
  };

  hideDropDown = () => {
    this.setState(prevState => {
      return {
        visible: false
      };
    });
  };

  handleOnBlur = () => {
    // add 100ms delay, so that onMenuClick fire before then hide the drop menu
    setTimeout(() => {
      this.setState(prevState => {
        return {
          visible: false
        };
      });
    }, 100);
  };

  render() {
    const { menuOptions, dropdownProps, buttonStyle } = this.props;

    const menu = menuOptions.map(item => (
      <Menu.Item key={item.key}>{item.name}</Menu.Item>
    ));
    return (
      <Dropdown
        overlay={<Menu onClick={this.onMenuClick}>{menu}</Menu>}
        {...dropdownProps}
        visible={this.state.visible}
        onBlur={this.handleOnBlur}
      >
        <Button style={{ ...buttonStyle }} onClick={this.handleDropDown}>
          <Icon style={{ marginRight: 2 }} type="bars" />
          <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object
};

export default DropOption;
