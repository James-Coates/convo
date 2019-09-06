import React, { Component } from 'react';
import { Text } from 'react-native';

class CustomText extends Component {

  // Set font type from props
  setFontType = (type) => {
    switch(type) {
      case 'bold':
        return 'Poppins600';
      default:
        return 'Poppins300'
    }
  }

  setFontSize = (size) => {
    switch(size) {
      case 'title':
        return 45;
      default:
        return 16
    }
  }

  render() {
    // Set fontFamily
    const font = this.setFontType(this.props.type ? this.props.type : 'default');
    // Set fontSize
    const fontSize = this.setFontSize(this.props.size ? this.props.size : 'default');
    // Pass font and any other styles to Text component
    const style = [{ fontFamily: font }, {fontSize: fontSize}, this.props.style || {}];
    // Pass additional props to Text component
    const allProps = Object.assign({}, this.props, { style })
    // Custom Text component with all props
    return <Text { ...allProps }>{ this.props.children }</Text>
  }
};

export default CustomText;