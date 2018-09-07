import React, { Component } from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { withNavigation } from 'react-navigation'
import LoginAdmin from 'views/admin/login/Login'
import { rhythm, scale } from '../utils/typography'
import { MainStackAdmin, Signup, main2 } from './stack'
import { View } from 'react-native'
import Transition from './stack/Transition'
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation'

const HOST = process.env.__DEV__
  ? 'http://localhost:3000'
  : 'http://ns327841.ip-37-187-112.eu/'
export const myicons = {
  Ionicons: 'div',
  SimpleLineIcons: 'div',
  MaterialCommunityIcons: 'div',
}
let DrawerNavigator
const Vomp = ({ header, children, navigation, location }) => {
  return withNavigation(
    class Vomp extends Component {
      render() {
        console.log('location', location)
        return (
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
            {header}
            {children}
            <LoginAdmin
              navigation={this.props.navigation}
              SimpleLineIcons={myicons.SimpleLineIcons}
            />
          </View>
        )
      }
    }
  )
}

class Template extends React.Component {
  //componentWillUnmount() {
  //console.log("TEmplatecomponentWillUnmount")
  //}
  componentDidMount() {
    //console.log("TEmplatedidmount")
    myicons.Ionicons = require('react-native-vector-icons/Ionicons').default
    myicons.SimpleLineIcons = require('react-native-vector-icons/SimpleLineIcons').default
    myicons.MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default
    this.forceUpdate()
  }
  render() {
    // const HistoryNavigator = withBrowserHistory(Drawer)
    const { location, children, data } = this.props
    console.log('renderLayout')
    const siteTitle = get(data, 'site.siteMetadata.title')
    const siteDescription = get(data, 'site.siteMetadata.description')
    const rootPath = `${__PATH_PREFIX__}/`
    const title = data.site.siteMetadata.title
    let style = {
      ...scale(1.5),
      marginBottom: rhythm(1.5),
      marginTop: 0,
    }

    if (location.pathname !== rootPath) {
      style = {
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 0,
        alignSelf: 'flex-end',
      }
    }

    let header = HH => (
      <HH style={style}>
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={'/'}
        >
          SkiScool
        </Link>
      </HH>
    )

    DrawerNavigator = createDrawerNavigator(
      {
        MainwithBackground: {
          screen: ({ navigation }) => (
            <MainStackAdmin
              screenProps={{
                view: Vomp({
                  header: header('h2'),
                  children,
                  location,
                }),
                title: title ? title : 'notitle',
                withBackground: true,
                navigation,
              }}
            />
          ),
        },
        Main2: {
          screen: ({ navigation }) => (
            <MainStackAdmin
              screenProps={{
                view: Vomp({
                  header: header('h2'),
                  children,
                  location,
                }),
                title: title ? title : 'notitle',
                withBackground: false,
                navigation,
              }}
            />
          ),
        },
        Signup: {
          screen: ({ navigation }) => (
            <Signup
              screenProps={{
                view: Vomp({
                  header: header('h2'),
                  children,
                  location,
                }),
                title: title ? title : 'notitle',
                withBackground: false,
                navigation,
              }}
            />
          ),
        },
      },
      {
        initialRouteName: 'MainwithBackground',
        transitionConfig: Transition,
        useNativeAnimations: false,
        contentOptions: {
          activeTintColor: '#e91e63',
        },
        useNativeAnimations: false,
      }
    )
    return (
      <>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <DrawerNavigator />
      </>
    )
  }
}
export const Drawer = DrawerNavigator
export default Template
