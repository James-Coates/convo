import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TextInput } from 'react-native';
import Text from '../custom-text/CustomText';
import { Button, ColorButton } from '../custom-button/CustomButton';

export default class HomeScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/home.png')} style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text type='bold' size='title' style={styles.homeTitle}>CONVO</Text>
          </View>
          <View style={styles.form}>
            <TextInput value={this.state.name} placeholder='Your Name' style={styles.textInput}/>
            
            <View style={styles.backgroundSelector}>
              <Text size={'default'}>Custom Background Color:</Text>
              <View style={styles.colorButtonBox}>
                <ColorButton color='black' />
                <ColorButton color='lilac' />
                <ColorButton color='blue' />
                <ColorButton color='green' />
              </View>
            </View>

            <Button title='Start Chatting'/>
          </View>
        </View>
      </ImageBackground>
    );
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
  container: {
    width: '88%',
    height: '92%',
    display: 'flex',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
  },
  form: {
    height: '44%',
    backgroundColor: 'white',
    paddingHorizontal: '6%',
    paddingTop: '7%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: '#757083',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    fontSize: 16,
  },
  homeTitle: {
    color: 'white',
  },
  backgroundSelector: {
    // backgroundColor: 'green',
  },
  colorButtonBox: {
    display: 'flex',
    flexDirection: 'row',
  }
});