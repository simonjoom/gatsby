import React from 'react'
import { createStackNavigator } from 'react-navigation'
import {
  MainScreen,
  BackendScreen,
  SignUpAdminscreen,
  SignInAdminScreen,
  navigationOptions,
} from './Layout'
import Transition from './Transition'

const MainStackAdmin = ({ screen, title, type }) =>
  createStackNavigator(
    {
      // Main: { screen: MainScreen },
      Main: {
        path: '',
        screen: ({ navigation, screenProps }) => {
          console.log(navigation)
          return MainScreen({
            isMainPage: type == 'Main',
            screenProps,
            navigation,
            ChildrenComp: screen,
            title: title,
          })
        },
      },
      SignUp: {
        screen: ({ navigation, screenProps }) => {
          console.log(navigation)
          return MainScreen({
            isMainPage: type == 'Main',
            asScroll: false,
            navigation: navigation,
            ChildrenComp: SignUpAdminscreen,
            title: 'SignUp',
          })
        },
      },
      SignIn: {
        screen: SignInAdminScreen,
      },
      Backend: {
        screen: BackendScreen,
      },
    },
    {
      initialRouteName: 'Main',
      transitionConfig: Transition,
      useNativeAnimations: false,
      navigationOptions: navigationOptions,
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )

MainStackAdmin.defaultProps = {
}
export default MainStackAdmin
