import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TextInput, Alert } from 'react-native';
import Text from '../custom-text/CustomText';
import { Button, ColorButton } from '../custom-button/CustomButton';
import HeaderTitle from '../header-title/HeaderTitle';

export default class HomeScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      color: '',
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: (<HeaderTitle test={navigation.getParam('title')} />),
    }
  }

  async handleInputChange(text) {
    await this.setState({ name: text });
    this.props.navigation.setParams({ title: this.state.name });
  }

  handleStartChat() {
    this.props.navigation.navigate('Chat', { color: this.state.color })
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/home.png')} style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text type='bold' size='title' style={styles.homeTitle}>CONVO</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={this.state.name} 
              placeholder='Your Name'
              onChangeText={(text) => this.handleInputChange(text)}
              style={styles.textInput}
            />
            
            <View style={styles.backgroundSelector}>
              <Text style={styles.backgroundText}>Choose Background Color:</Text>
              <View style={styles.colorButtonBox}>
                <ColorButton color='black' onPress={() => this.setState({ color: 'black' })} selected={this.state.color === 'black'}/>
                <ColorButton color='lilac' onPress={() => this.setState({ color: 'lilac' })} selected={this.state.color === 'lilac'}/>
                <ColorButton color='blue' onPress={() => this.setState({ color: 'blue' })} selected={this.state.color === 'blue'}/>
                <ColorButton color='green' onPress={() => this.setState({ color: 'green' })} selected={this.state.color === 'green'}/>
              </View>
            </View>

            <Button onPress={() => this.props.navigation.navigate('Chat', { color: this.state.color })} title='Start Chatting'/>
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
  backgroundText: {
    paddingBottom: 10,
  },
  backgroundSelector: {
    // backgroundColor: 'green',
  },
  colorButtonBox: {
    display: 'flex',
    flexDirection: 'row',
  }
});