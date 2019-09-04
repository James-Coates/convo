import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import Text from './components/custom-text/CustomText';

// React Navigation Components
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import Screens
import HomeScreen from './components/home-screen/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Poppins300': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins600': require('./assets/fonts/Poppins-SemiBold.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  
  render() {
    if (!this.state.fontLoaded) return <View><ActivityIndicator size='large' /></View>;
    return (
      <AppContainer />
    );
  }
}