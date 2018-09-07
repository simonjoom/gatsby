import React from 'react'
import dismissableStackNavigator from 'helpers'
import { Button } from 'react-native'
import { Hamburger, Plus } from 'components/icons'
import Colors from 'statics/colors'
import { myicons } from 'src/components/layout'
import { LayoutContainer } from './layoutscreen/Container'

export const MainScreen = ({
  navigation,
  screenProps,
  ChildrenComp,
  title,
  withBackground,
}) => {
  console.log('screenProps', navigation, screenProps)
  return (
    <LayoutContainer
      title={title}
      navigation={navigation}
      screenProps={screenProps}
      withBackground={withBackground}
    >
      <ChildrenComp navigation={navigation} />
      <Button
        onPress={() => navigation.navigate('MainwithBackground')}
        title="Login"
      />
    </LayoutContainer>
  )
}

export const navigationOptions = ({ screenProps }) => {
  const nav=screenProps.navigation
  console.log('navigation', nav.state)
  return {
    headerTitle: 'Main',
    headerRight: (
      <Hamburger
        route={(nav.state && nav.state.routeName) || 'Main'}
        navigation={nav}
        Icon={myicons.MaterialCommunityIcons}
      />
    ),
    headerLeft: (
      <Plus
        navigation={nav}
        route={(nav.state && nav.state.routeName) || 'Main'}
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

//Backend.navigationOptions = navigationOptions

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
export const SignUpAdminscreen = ({
  navigation,
  screenProps,
  withBackground,
}) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: SignUpAdmin,
    title: 'SignUp',
    withBackground: withBackground,
  })

export const LoginAdminScreen = ({ navigation, screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: LoginAdmin,
    title: 'Login',
  })

export const SignInAdminScreen = ({ navigation, screenProps, type }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: SignInAdmin,
    title: 'SignIn',
    withBackground: type == 'Main',
  })

export const Main2Screen = ({ view, navigation, screenProps, type }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: view,
    title: 'SignIn',
    withBackground: type == 'Main',
  })

//SignInAdminScreen.navigationOptions = LoginAdminScreen.navigationOptions = navigationOptions
export { SignUpAdmin, dismissableStackNavigator }
