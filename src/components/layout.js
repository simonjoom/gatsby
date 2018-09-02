import React from 'react'
import { Link } from 'gatsby'

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

class Template extends React.Component {
  render() {
    // const HistoryNavigator = withBrowserHistory(Drawer)
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    const Drawer = createDrawerNavigator(
      {
        Inbox: {
          path: '',
          screen: MainStackAdmin,
        },
        Main: {
          path: 'sent',
          screen: MainStack,
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
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
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
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
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
        </h3>
      )
    }

    return (
      <Drawer
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
      </Drawer>
    )
  }
}

export default Template
