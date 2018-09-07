import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  ViewPropTypes,
  ScrollView,
  Dimensions,
} from 'react-native' 
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import Colors from 'src/statics/colors'
import Title from '../title/Title'
import NavigationButton from '../navigation-button/NavigationButton'

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

const Container = props => {
  if (props.asScroll) {
    return (
      <ScrollView
        contentContainerStyle={[styles.subContainer, props.innerStyle]}
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
      <TopBar {...props} />
      <View style={[styles.subContainer, props.innerStyle]}>
        {props.children}
      </View>
    </>
  )
}

Container.propTypes = {
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
  // Chuloo made edits here below
  containerTitle: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingRight: 0,
  },
})

export default Container

//
//backgroundColor: Colors.white,