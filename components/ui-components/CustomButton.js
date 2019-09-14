import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './CustomText';

const Button = ({ title = 'Enter', onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <Text type="bold" style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ColorButton = ({ color, onPress, selected }) => {
  return (
    <View
      style={[
        styles.colorButtonContainer,
        selected ? { borderColor: '#757083' } : null,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[{ backgroundColor: color }, styles.colorButton]}
      />
    </View>
  );
};

const ActionsButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.actionButtonContainer]}>
      <View style={styles.actionButtonWrapper}>
        <Text type="bold" style={styles.actionButtonIcon}>
          +
        </Text>
      </View>
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
  actionButtonContainer: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  actionButtonWrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  actionButtonIcon: {
    color: '#b2b2b2',
    fontSize: 24,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -5,
    paddingLeft: 1,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: '#757083',
  },
});

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};
Button.defaultProps = {
  title: 'Enter',
};
ColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export { Button, ColorButton, ActionsButton };
