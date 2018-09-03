import React, { Component } from 'react'
import { Link } from 'gatsby'

import { withNavigation } from 'react-navigation'
import LoginAdmin from 'views/admin/login/Login'
import { rhythm, scale } from '../utils/typography'
import { MainStack, MainStackAdmin } from './config'
import { View } from 'react-native'
import NavigationService from './config/NavigationService'
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation'

const HOST = process.env.__DEV__
  ? 'http://localhost:3000'
  : 'http://ns327841.ip-37-187-112.eu/'

const Vomp = ({ header, children, navigation, location }) => {
  console.log('locationVomp', location)
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
            <LoginAdmin navigation={this.props.navigation} />
          </View>
        )
      }
    }
  )
}

class Template extends React.Component {
  render() {
    // const HistoryNavigator = withBrowserHistory(Drawer)
    const { location, children, title } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    console.log(location.pathname, rootPath)
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
          Gatsby Starter Blog
        </Link>
      </HH>
    )

    const Drawer = createDrawerNavigator(
      {
        Inbox: {
          path: '',
          screen: MainStackAdmin({
            screen: Vomp({ header: header('h2'), children, location }),
            title: title ? title : 'notitle',
          }),
        },
        Main: {
          path: 'sent',
          screen: MainStackAdmin({
            screen: Vomp({ header: header('h2'), children, location }),
            title: title ? title : 'notitle',
          }),
        },
      },
      {
        initialRouteName: 'Inbox',
        contentOptions: {
          activeTintColor: '#e91e63',
        },
        useNativeAnimations: false,
      }
    )
    console.log('render Drawer')
    return <Drawer location={location} />
  }
}

export default Template
