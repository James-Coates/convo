import React, { Component } from 'react';
import { View, ImageBackground, TextInput, KeyboardAvoidingView, StyleSheet, ActivityIndicator } from 'react-native';

import firebaseConfig from '../utils/firebaseConfig';

const firebase = require('firebase');
require('firebase/firestore');

// Import custom components
import Text from '../ui-components/CustomText';
import { Button, ColorButton } from '../ui-components/CustomButton';
import HeaderTitle from '../ui-components/HeaderTitle';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    // initialise app with firebase
    firebase.initializeApp(firebaseConfig);
    this.state = {
      name: '',
      uid: 0,
      colorName: '',
      colorHex: '',
      colors: [
        { 
          name: 'black',
          hex : '#090C08',
        },
        { 
          name: 'lilac',
          hex : '#474056',
        },
        { 
          name: 'blue',
          hex : '#8A95A5',
        },
        { 
          name: 'green',
          hex : '#B9C6AE',
        },
      ]
    };
  };

  componentDidMount() {
     // authenticate users anon using firebase
     this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously()
          .catch((err) => console.log(err));
      }
      // update user in state with active user
      this.setState({
        uid: user.uid,
      });
      console.log(this.state.uid)
    });
  }

  // Set navigation options
  static navigationOptions = ({navigation}) => {
    // Set title to nav param title
    const title = navigation.getParam('title', 'user');
    return {
      headerTitle: (<HeaderTitle title={ title } />),
    };
  };

  // Set user name from input to state and link to title param in nav
  handleInputChange = async (text) => {
    await this.setState({ name: text });
    this.props.navigation.setParams({ title: this.state.name });
  };

  // Set background color choice to state
  handleColorButtonPress = (color) => {
    this.setState({ 
      colorName: color.name,
      colorHex: color.hex,
    });
  };

  // Open chat screen
  handleStartChat = () => {
    this.props.navigation.navigate('Chat', { 
      name: this.state.name ? this.state.name : 'User', // default to user #temp fix
      color: this.state.colorHex,
      uid: this.state.uid,
    });
  };

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/home.png')} style={styles.wrapper}>
        { !this.state.uid ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator 
              size='large'
            />
          </View>
        ) : (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
            <View style={styles.title}>
              <Text type='bold' size='title' style={styles.titleText}>convo</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.name} 
                  placeholder='Your Name'
                  onChangeText={(text) => this.handleInputChange(text)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.backgroundSelector}>
                <Text style={styles.backgroundText}>Choose Background Color:</Text>
                <View style={styles.colorButtonBox}>
                  {/* create color button for each color in colors */}
                  {this.state.colors.map(color => (
                    <ColorButton 
                      color={color.hex}
                      onPress={() => this.handleColorButtonPress(color)}
                      selected={this.state.colorName === color.name}
                      key={color.name}
                    />
                  ))}
                </View>
              </View>
              <View stylee={styles.buttonContainer}>
                <Button onPress={this.handleStartChat} title='Start Chatting'/>
              </View>
            </View>
          </KeyboardAvoidingView>
        ) }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '88%',
    display: 'flex',
    marginBottom: 25,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '66%',
    flexShrink: 1,
  },
  titleText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    height: '44%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingVertical: 20,
  },
  inputContainer: {
    flexShrink: 0,
  },
  textInput: {
    borderColor: '#757083',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 3,
    fontSize: 16,
    height: 50,
  },
  backgroundText: {
    paddingBottom: 5,
  },
  backgroundSelector: {
  },
  colorButtonBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
  }
});

export default HomeScreen;