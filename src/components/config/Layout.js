import React from 'react'
import { Button } from 'react-native'
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
