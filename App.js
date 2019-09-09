import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

// React Navigation Components
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import Screens
import StartScreen from './components/screens/StartScreen';
import ChatScreen from './components/screens/ChatScreen';

// Create default stack navigator and map routes
const AppNavigator = createStackNavigator(
  {
    Start: StartScreen,
    Chat: ChatScreen,
  },
);

// Create App container for enhanced root control
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    // wait for font then set fontLoaded true
    await Font.loadAsync({
      'Poppins300': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins600': require('./assets/fonts/Poppins-SemiBold.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  
  render() {
    // wait for fontLoaded then return app
    if (!this.state.fontLoaded) return <View><ActivityIndicator size='large' /></View>;
    return (
      <AppContainer />
    );
  }
}