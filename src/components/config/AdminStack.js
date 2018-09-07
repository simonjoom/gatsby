import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SignUpAdmin from 'views/admin/sign-up/SignUpContainer'
import RoutesBackend, { RunBackend } from 'views/admin/Backend'
// import SignInAdmin from 'views/admin/sign-in/SignInContainer'
import LoginAdmin from 'views/admin/login/Login'
import { Hamburger, Plus } from 'components/icons'
import { myicons } from 'components/layout'
import Colors from 'statics/colors'
import dismissableStackNavigator from 'helpers'
import { MainScreen } from './Layout'
import Transition from './Transition'

export const LoginAdminScreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: LoginAdmin,
    title: 'Login',
  })
export const SignUpAdminScreen = ({ navigation }) =>
  MainScreen({
    asScroll: false,
    navigation: navigation,
    ChildrenComp: SignUpAdmin,
    title: 'SignUp',
  })
/*
export const SignInAdminScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignInAdmin,
    title: 'SignIn',
  })*/

const navigationOptions = ({ navigation }) => ({
  headerTitle: 'Main',
  headerRight: (
    <Hamburger navigation={navigation} Icon={myicons.MaterialCommunityIcons} />
  ),
  headerLeft: (
    <Plus
      navigation={navigation}
      route="Login"
      Icon={myicons.MaterialCommunityIcons}
    />
  ),
  headerTitleStyle: {
    color: Colors.$white,
  },
})

//SignInAdminScreen.navigationOptions =
SignUpAdminScreen.navigationOptions = LoginAdminScreen.navigationOptions = navigationOptions

const arr = {
  Filter: [],
  Country: [],
  Category: [],
  Organization: ['User', 'Person', 'Country', 'Category'],
  User: ['Organization'],
  Person: ['User', 'Picture', 'Product', 'Deal'],
  Product: ['User', 'Deal'],
  Deal: ['User', 'Person', 'Product', 'Stage', 'Organization'],
  Picture: [],
  Stage: ['Pipeline'],
  Pipeline: ['Deal'],
  APIREADME: [],
}

const newScene = new RoutesBackend(arr)
const ta = Object.keys(arr)
ta.push('APIREADME')
const Backend = ({ navigation }) => (
  <RunBackend Routes={ta} navigation={navigation} />
)

Backend.navigationOptions = navigationOptions

export const BackendScreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: Backend,
    title: 'SignIn',
  })

export const mRoute = newScene.createRouteScene()

const ModalNavigator = dismissableStackNavigator(mRoute, {
  headerMode: 'none',
})

const ModalStack = dismissableStackNavigator(
  {
    Backend: {
      path: '',
      screen: BackendScreen,
    },
    Modal: { screen: ModalNavigator },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)
console.log('mRoute', ModalNavigator)
//LoginAdminScreen
const MainStackAdmin = ({ screen, title,Icons }) =>
  createStackNavigator(
    {
      // Main: { screen: MainScreen },
      Login: {
        path: '',
        screen: ({ navigation, screenProps }) =>
          MainScreen({
            screenProps,
            navigation,
            ChildrenComp: screen,
            title: title,
          }),
      },
      SignUp: {
        screen: SignUpAdminScreen,
      },
      /*  SignIn: {
      screen: SignInAdminScreen,
    },*/
      Backend: {
        screen: ModalStack,
      },
    },
    {
      initialRouteName: 'Login',
      transitionConfig: Transition,
      useNativeAnimations: false,
      //mode: 'modal',
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Main',
          headerRight: (
            <Hamburger
              navigation={navigation}
              Icon={Icons}
            />
          ),
          headerLeft: (
            <Plus
              navigation={navigation}
              route="Login"
              Icon={Icons}
            />
          ),
          headerStyle: {
            backgroundColor: Colors.$green,
          },
        }
      },
      cardStyle: { backgroundColor: '#2980B9' },
    }
  )

  MainStackAdmin.defaultProps = {
    Icons: 'div',
  }
export default MainStackAdmin
