/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './CustomText';

class CustomActions extends Component {
  // constructor(props) {
  //   super(props);
  // };

  onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Photo',
      'Share Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    const { actionSheet } = this.context;
    const { pickImage, takePhoto, sendLocation } = this.props;
    actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            sendLocation();
            break;
          default:
        }
      },
    );
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onActionPress}
        style={[styles.container]}
        accessible
        accessibilityLabel="More Options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        accessibilityRole="button"
      >
        <View style={styles.wrapper}>
          <Text type="bold" style={styles.icon}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  icon: {
    color: '#b2b2b2',
    fontSize: 24,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -5,
    paddingLeft: 1,
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

export default CustomActions;
