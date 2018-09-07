import React from 'react'
import { createStackNavigator } from 'react-navigation'

import SignUp from 'views/sign-up/SignUpContainer'
import SignIn from 'views/sign-in/SignInContainer'
import Login from 'views/login/Login'
import { Hamburger, Plus } from 'components/icons'
import Colors from 'statics/colors'
import { MainScreen } from './Layout'
import { myicons } from 'components/layout'

const LoginScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: Login,
    title: 'Login',
  })
const SignUpScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignUp,
    title: 'SignUp',
  })
const SignInScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignIn,
    title: 'SignIn',
  })

const MainStack = createStackNavigator({
  // Main: { screen: MainScreen },
  Login: {
    screen: LoginScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
})

MainStack.navigationOptions = ({ navigation }) => ({
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
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
  useNativeAnimations: false,
  headerStyle: {
    backgroundColor: Colors.$green,
  },
})

export default MainStack
