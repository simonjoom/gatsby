import React from 'react'
import dismissableStackNavigator from 'helpers'
import { Button } from 'react-native'
import { Hamburger, Plus } from 'components/icons'
import Colors from 'statics/colors'
import { myicons } from 'src/components/layout'
import LayoutScreen from './layoutscreen/Container'

export const MainScreen = ({
  navigation,
  screenProps,
  ChildrenComp,
  title,
}) => {
  return (
    <LayoutScreen
      title={title}
      navigation={navigation}
      screenProps={screenProps}
    >
      <ChildrenComp navigation={navigation} />
      <Button onPress={() => navigation.navigate('Login')} title="Login" />
    </LayoutScreen>
  )
}

export const navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Main',
    headerRight: (
      <Hamburger
        navigation={navigation}
        Icon={myicons.MaterialCommunityIcons}
      />
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
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  }
}
/////

import RoutesBackend, { RunBackend } from 'views/admin/Backend'
import SignUpAdmin from 'views/admin/sign-up/SignUpContainer'
import SignInAdmin from 'views/admin/sign-in/SignInContainer'
import LoginAdmin from 'views/admin/login/Login'

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

export const mRoute = newScene.createRouteScene()
const ModalNavigator = dismissableStackNavigator(mRoute, {
  headerMode: 'none',
})

export const BackendScreen = dismissableStackNavigator(
  {
    Backend: {
      path: '',
      screen: ({ navigation, screenProps }) =>
        MainScreen({
          screenProps,
          navigation,
          ChildrenComp: Backend,
          title: 'SignIn',
        }),
    },
    Modal: { screen: ModalNavigator },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export const LoginAdminScreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: LoginAdmin,
    title: 'Login',
  })

export const SignUpAdminscreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: SignUpAdmin,
    title: 'SignUp',
  })
 
export const SignInAdminScreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation: navigation,
    ChildrenComp: SignInAdmin,
    title: 'SignIn',
  })
