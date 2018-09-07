import React, { Component } from 'react'
import { createStackNavigator, withNavigation } from 'react-navigation'
import dismissableStackNavigator from 'helpers'
import {
  MainScreen,
  BackendScreen,
  SignUpAdminscreen,
  SignInAdminScreen,
  navigationOptions,
} from './Layout'
import Transition from './Transition'

const MainStackAdmin = createStackNavigator(
  {
    // Main: { screen: MainScreen },
    MainwithBackground: {
      screen: ({ navigation, screenProps }) =>
        MainScreen({
          screenProps, 
          navigation
        }),
    },
    Main2: {
      screen: ({ navigation, screenProps }) =>
        MainScreen({
          screenProps, 
          navigation
        }),
    },
    Backend: {
      screen: ({ navigation, screenProps }) =>
        BackendScreen({ navigation, screenProps }),
    },
  },
  {
    initialRouteName: 'MainwithBackground',
    transitionConfig: Transition,
    useNativeAnimations: false,
    navigationOptions: navigationOptions,
    cardStyle: { backgroundColor: '#2980B9' },
  }
)

const Signup = createStackNavigator(
  {
    Signup: {
      screen: ({ navigation, screenProps }) =>
        SignUpAdminscreen({
          screenProps, 
          withBackground: screenProps.withBackground,
          navigation: screenProps.navigation,
          title: screenProps.title,
        }),
    },
  },
  {
    initialRouteName: 'Signup',
    transitionConfig: Transition,
    useNativeAnimations: false,
    navigationOptions: navigationOptions,
    cardStyle: { backgroundColor: '#2980B9' },
  }
)
export { Signup, MainStackAdmin }
