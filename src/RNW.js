// https://github.com/necolas/react-native-web/pull/850
// https://github.com/Dekoruma/react-native-web-modal
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import { Component } from 'react'
import { ColorPropType } from 'react-native-web'
import MyModal from './Modal'

type StatusBarAnimation = 'none' | 'fade' | 'slide'
type StatusBarStyle = 'default' | 'light-content' | 'dark-content'
type Props = {
  animated?: boolean,
  backgroundColor?: ColorPropType,
  barStyle?: StatusBarStyle,
  hidden?: boolean,
  networkActivityIndicatorVisible?: boolean,
  showHideTransition?: 'fade' | 'slide',
  translucent?: boolean,
}

const { head } = typeof window !== 'undefined' ? document : {}

let _barStyle = 'default'
let _hidden = false
let _translucent = false

const setMetaTag = (attrName, content) => {
  if (!(canUseDOM && head)) return

  let tag = head && head.querySelector(`meta[name=${attrName}]`)

  if (!tag && document) {
    tag = document.createElement('meta')
    tag.name = attrName

    head.appendChild(tag)
  }

  if (tag instanceof HTMLMetaElement) tag.content = content
}

function setAppleMobileWebAppCapable() {
  setMetaTag(
    'apple-mobile-web-app-capable',
    _hidden || _translucent || _barStyle !== 'default' ? 'yes' : 'no'
  )
}

function setAppleMobileWebAppStatusBarStyle() {
  setAppleMobileWebAppCapable()

  setMetaTag(
    'apple-mobile-web-app-status-bar-style',
    _translucent ? 'black-translucent' : _barStyle
  )
}

class StatusB extends Component<Props> {
  static defaultProps = {
    showHideTransition: 'fade',
  }

  static get currentHeight(): ?number {
    if (!canUseDOM) return

    const { availHeight, height } = window.screen

    return height - availHeight
  }

  static setBackgroundColor(color: string, animated?: boolean) {
    setMetaTag('theme-color', color)
  }

  static setBarStyle(style: StatusBarStyle, animated?: boolean) {
    _barStyle = style === 'light-content' ? 'black' : 'default'

    setAppleMobileWebAppStatusBarStyle()
  }

  static setHidden(hidden: boolean, animation?: StatusBarAnimation) {
    _hidden = hidden

    setAppleMobileWebAppCapable()
  }

  static setNetworkActivityIndicatorVisible(visible: boolean) {}

  static setTranslucent(translucent: boolean) {
    _translucent = translucent

    setAppleMobileWebAppStatusBarStyle()
  }

  render() {
    const {
      animated,
      backgroundColor,
      barStyle,
      hidden,
      networkActivityIndicatorVisible,
      showHideTransition,
      translucent,
    } = this.props

    if (backgroundColor) StatusB.setBackgroundColor(backgroundColor, animated)
    if (barStyle) StatusB.setBarStyle(barStyle, animated)
    if (hidden) StatusB.setHidden(hidden, showHideTransition)
    if (networkActivityIndicatorVisible)
      StatusB.setNetworkActivityIndicatorVisible(
        networkActivityIndicatorVisible
      )
    if (translucent) StatusB.setTranslucent(translucent)

    return null
  }
}
// add any component override here:
// note the .default for ES6 libraries

//RNWeb.Modal = require("react-native-web-modal").default;
//RNWeb.StatusB = StatusB;
export const StatusBar = StatusB
export const Modal = MyModal
export * from 'react-native-web'
