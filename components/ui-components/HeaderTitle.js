import React from 'react';
import { StyleSheet, View, ImageBackground, TextInput, Alert } from 'react-native';
import Text from './CustomText';

function HeaderTitle(props) {
  const { title } = props;
  return (
    <View style={styles.navHeader}>
      <Text style={styles.navText} type='bold'>{ title }</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  navHeader: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navText: {
    fontSize: 30,
    textTransform: 'uppercase',
  }
});

export default HeaderTitle;