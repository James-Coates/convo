import React, { Component } from 'react';
import { View, ImageBackground, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';

// Import custom components
import Text from '../ui-components/CustomText';
import { Button, ColorButton } from '../ui-components/CustomButton';
import HeaderTitle from '../ui-components/HeaderTitle';

class HomeScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
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
      name: this.state.name, 
      color: this.state.colorHex,
    });
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/home.png')} style={styles.wrapper}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
          <View style={styles.title}>
            <Text type='bold' size='title' style={styles.titleText}>CONVO</Text>
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