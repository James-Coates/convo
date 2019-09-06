import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './CustomText';

const Button = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text type="bold" style={[styles.text, textStyle]}>{props.title}</Text>
      </TouchableOpacity>
    );
};

const ColorButton = (props) => {
    const { color, onPress, selected } = props;
    return (
      <View style={[styles.colorButtonContainer, selected ? {borderColor: '#757083'} : null]}>
        <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.colorButton]} />
      </View>
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
  colorButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    marginRight: 15,
    borderRadius: 100,
    borderColor: '#fff',
  },
  colorButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },

  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});

export { Button, ColorButton }; 