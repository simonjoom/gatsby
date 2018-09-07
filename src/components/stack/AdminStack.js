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
          withBackground: screenProps.withBackground,
          navigation: screenProps.navigation,
          ChildrenComp: screenProps.view,
          title: screenProps.title,
        }),
    },
    Main2: {
      screen: ({ navigation, screenProps }) =>
        MainScreen({
          withBackground: screenProps.withBackground,
          navigation: screenProps.navigation,
          ChildrenComp: screenProps.view,
          title: screenProps.title,
        }),
    },
    Backend: {
      screen: BackendScreen,
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

/*
const main2 = ({ view, title, screenProps, navigation }) => {
  return createStackNavigator(
    {
      Main2: {
        screen: ({ navigation, screenProps }) => {
          return MainScreen({
            withBackground: false,
            screenProps,
            navigation,
            ChildrenComp: view,
            title: title,
          })
        },
      },
    },
    {
      initialRouteName: 'Main2',
      transitionConfig: Transition,
      useNativeAnimations: false,
      navigationOptions: navigationOptions,
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )
}
*/
const Signup = createStackNavigator(
  {
    Signup: {
      screen: ({ navigation, screenProps }) =>
        SignUpAdminscreen({
          withBackground: screenProps.withBackground,
          navigation: screenProps.navigation,
          ChildrenComp: screenProps.view,
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
