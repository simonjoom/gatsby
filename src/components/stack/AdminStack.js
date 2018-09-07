import React, { Component } from 'react'
import { createStackNavigator, withNavigation } from 'react-navigation'
import {
  MainScreen,
  BackendScreen,
  SignUpAdminscreen,
  SignInAdminScreen,
  navigationOptions,
} from './Layout'
import Transition from './Transition'

const mainStackAdmin = ({ view, title, type, screenProps, navigation }) => { 
  return createStackNavigator(
    {
      // Main: { screen: MainScreen },
      MainwithBackground: {
        screen: ({ navigation, screenProps }) =>
          MainScreen({
            withBackground: true,
            navigation,
            ChildrenComp: view,
            title: title,
          }),
      },
      Backend: {
        screen: BackendScreen,
      },
    },
    {
      initialRouteName: 'MainwithBackground',
      //   transitionConfig: Transition,
      useNativeAnimations: false,
      navigationOptions: navigationOptions,
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )
}
 
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
      }
    },
    {
      initialRouteName: 'Main2',
      //   transitionConfig: Transition,
      useNativeAnimations: false,
      navigationOptions: navigationOptions,
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )
}

const signup = ({ view, title, type, screenProps, navigation }) => { 
  return createStackNavigator(
    { 
      Signup: {
        screen: ({ navigation, screenProps }) =>
          SignUpAdminscreen({
            navigation,
            screenProps,
            type: 'noBackground',
          }),
      }
    },
    {
      initialRouteName: 'Signup',
      //   transitionConfig: Transition,
      useNativeAnimations: false,
      navigationOptions: navigationOptions,
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )
}
export {signup,main2,mainStackAdmin}
