import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TextInput } from 'react-native';
import Text from '../custom-text/CustomText';
import { Button, ColorButton } from '../custom-button/CustomButton';

export default class ChatScreen extends Component {
  render() {
    const { navigation } = this.props;

    switch(navigation.getParam('color', 'blue')) {
      case 'black':
        hexColor = '#090C08';
        break;
      case 'lilac':
        hexColor = '#474056';
        break;
      case 'blue':
        hexColor = '#8A95A5';
        break;
      case 'green':
        hexColor = '#B9C6AE';
    }

    return (
      <View style={[styles.wrapper, {backgroundColor: hexColor}]}>
        <Text>Chat Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});