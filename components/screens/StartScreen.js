import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import firebaseConfig from '../utils/firebaseConfig';

// import custom components
import Text from '../ui-components/CustomText';
import { Button, ColorButton } from '../ui-components/CustomButton';
import HeaderTitle from '../ui-components/HeaderTitle';

// Firebase
const firebase = require('firebase');
require('firebase/firestore');

// Background image
const homeBackground = require('../../assets/home.png');

export default class StartScreen extends Component {
  // Set navigation options
  static navigationOptions = ({ navigation }) => {
    // Set title to nav param title
    const title = navigation.getParam('title', 'user');
    return {
      headerTitle: <HeaderTitle title={title} />,
    };
  };

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
          hex: '#090C08',
        },
        {
          name: 'lilac',
          hex: '#474056',
        },
        {
          name: 'blue',
          hex: '#8A95A5',
        },
        {
          name: 'green',
          hex: '#B9C6AE',
        },
      ],
    };
  }

  componentDidMount() {
    // authenticate users anon using firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase
          .auth()
          .signInAnonymously()
          .catch(err => Alert.alert(err));
      }
      // update user in state with active user
      this.setState({
        uid: user.uid,
      });
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  // Set user name from input to state and link to title param in nav
  handleInputChange = async text => {
    const { navigation } = this.props;
    await this.setState({ name: text });
    const { name } = this.state;
    navigation.setParams({ title: name });
  };

  // Set background color choice to state
  handleColorButtonPress = color => {
    this.setState({
      colorName: color.name,
      colorHex: color.hex,
    });
  };

  // Open chat screen
  handleStartChat = () => {
    const { navigation } = this.props;
    const { name, colorHex, uid } = this.state;
    navigation.navigate('Chat', {
      name: name || 'User', // default to user #temp fix
      color: colorHex,
      uid,
    });
  };

  render() {
    const { name, colors, colorName, uid } = this.state;
    return (
      <ImageBackground source={homeBackground} style={styles.wrapper}>
        {!uid ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={0}
            style={styles.container}
          >
            <View style={styles.title}>
              <Text type="bold" size="title" style={styles.titleText}>
                convo
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={name}
                  placeholder="Your Name"
                  onChangeText={text => this.handleInputChange(text)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.backgroundSelector}>
                <Text style={styles.backgroundText}>
                  Choose Background Color:
                </Text>
                <View style={styles.colorButtonBox}>
                  {/* create color button for each color in colors */}
                  {colors.map(color => (
                    <ColorButton
                      color={color.hex}
                      onPress={() => this.handleColorButtonPress(color)}
                      selected={colorName === color.name}
                      key={color.name}
                    />
                  ))}
                </View>
              </View>
              <View stylee={styles.buttonContainer}>
                <Button onPress={this.handleStartChat} title="Start Chatting" />
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
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
  colorButtonBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});

StartScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};
