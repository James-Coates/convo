import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

// React Navigation Components
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import Screens
import StartScreen from './components/screens/StartScreen';
import ChatScreen from './components/screens/ChatScreen';

// Require fonts
const Poppins300 = require('./assets/fonts/Poppins-Light.ttf');
const Poppins600 = require('./assets/fonts/Poppins-SemiBold.ttf');

// Create default stack navigator and map routes
const AppNavigator = createStackNavigator({
  Start: StartScreen,
  Chat: ChatScreen,
});

// Create App container for enhanced root control
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    // wait for font then set fontLoaded true
    await Font.loadAsync({
      Poppins300,
      Poppins600,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    // wait for fontLoaded then return app
    const { fontLoaded } = this.state;
    if (!fontLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <AppContainer />;
  }
}
