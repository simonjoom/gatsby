import React from 'react'
import dismissableStackNavigator from 'helpers'
import { Button ,View} from 'react-native'
import { Hamburger, Plus } from 'components/icons'
import Colors from 'statics/colors'
import { rhythm, scale } from 'src/utils/typography'
import { myicons } from 'src/components/layout'
import { LayoutContainer } from './layoutscreen/Container'

export const MainScreen = ({
  navigation,
  screenProps
}) => {
  return (
    <LayoutContainer
      title={screenProps.title}
      navigation={navigation}
      screenProps={screenProps}
      withBackground={screenProps.withBackground}
    >
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          flex: 1,
          flexGrow: 1,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {screenProps.header}
        {screenProps.children}
        <LoginAdmin
          navigation={navigation}
          SimpleLineIcons={myicons.SimpleLineIcons}
        />
      </View>
      <Button onPress={() => navigation.navigate('Backend')} title="Login" />
    </LayoutContainer>
  )
}

export const navigationOptions = ({ screenProps }) => {
  const nav = screenProps.navigation
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

export const BackendScreen = ({ navigation, screenProps }) =>
  dismissableStackNavigator(
    {
      Backend: {
        path: '',
        screen: ({ screenProps }) =>
          MainScreen({
            screenProps,
            navigation, 
            header: screenProps.header,
            children: Backend,
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

export const LoginAdminScreen = ({ navigation, screenProps, withBackground }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: LoginAdmin,
    title: 'Login',
    withBackground: withBackground,
  })

export const SignInAdminScreen = ({
  navigation,
  screenProps,
  withBackground,
}) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: SignInAdmin,
    title: 'SignIn',
    withBackground: withBackground,
  })

//SignInAdminScreen.navigationOptions = LoginAdminScreen.navigationOptions = navigationOptions
export { SignUpAdmin, dismissableStackNavigator }
