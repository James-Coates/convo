import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../custom-text/CustomText';

setButtonColor = (color) => {
  switch(color) {
    case 'lilac':
      return '#474056';
    case 'blue':
      return '#8A95A5';
    case 'green':
      return '#B9C6AE';
    default:
      return '#090C08';
  }
}

const Button = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text type="bold" style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const ColorButton = (props) => {
    const { color, onPress } = props;
      const buttonColor = this.setButtonColor(color ? color : 'default');
    return (
        <TouchableOpacity onPress={onPress} style={[{backgroundColor: buttonColor}, styles.colorButton]}>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
      display: 'flex',
      height: 50,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#757083',
  },
  
  colorButton: {
      height: 50,
      width: 50,
      borderRadius: 50,
      marginRight: 20,
  },

  text: {
      fontSize: 16,
      textTransform: 'uppercase',
      color: '#FFFFFF',
  },
});

export { Button, ColorButton }; 