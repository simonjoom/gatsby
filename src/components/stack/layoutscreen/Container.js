import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  ViewPropTypes,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Colors from 'src/statics/colors'
import Title from '../../title/Title'
import NavigationButton from '../../navigation-button/NavigationButton'

const TopBar = props => {
  return (
    <View
      style={[
        styles.containerTitle,
        {
          //flex:"auto",
          paddingLeft: props.asScroll ? 0 : 16,
          paddingTop: props.asScroll ? 0 : 16,
        },
      ]}
    >
      {props.screenProps && (
        <NavigationButton
          onPress={() => props.screenProps.dismiss()}
          back
          dark
        />
      )}
      {props.title && (
        <Title
          size={22}
          color={Colors.text}
          style={{
            right: '0',
            position: 'relative',
          }}
        >
          {props.title}
        </Title>
      )}
    </View>
  )
}

export const LayoutContainer = props => {
  if (props.asScroll) {
    return (
      <ScrollView
        contentContainerStyle={[styles.subContainer, props.style]}
      >
        <SafeAreaView forceInset={{ top: 'always' }}>
          <TopBar {...props} />
          {props.children}
        </SafeAreaView>
      </ScrollView>
    )
  }
  return (
    <>
      {props.withBackground ? <View style={{ height: '200px' }} /> : null}
      <TopBar {...props} />
      <View style={[styles.subContainer, props.style]}>
        {props.children}
      </View>
    </>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.any,
  screenProps: PropTypes.any,
  title: PropTypes.string,
  leftButton: PropTypes.node,
  asScroll: PropTypes.bool,
  innerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
}

//const SCREEN_WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
  },
  subContainer: {
    padding: 0,
  },
  containerTitle: {
    backgroundColor: '#0748f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingRight: 0,
  },
}) 

//
//backgroundColor: Colors.white,
