import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native' 

import Colors from 'src/statics/colors'

const Hamburger = ({ navigation, route ,Icon}) => (
  <View>
    <TouchableOpacity
      onPress={() => { 
        navigation.navigate(route)&&
        navigation.openDrawer()
      }}
    >
      <Icon
        name="menu"
        size={30}
        color={Colors.white}
        style={{ padding: 10 }}
      />
    </TouchableOpacity>
  </View>
)

Hamburger.defaultProps = {
  Icon:"div"
}
Hamburger.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
}

export default Hamburger
