import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import Colors from 'src/statics/colors'

const Plus = ({ navigation, route, Icon }) => {
  return(
  <View>
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <Icon
        name="plus"
        size={30}
        color={Colors.white}
        style={{ padding: 10 }}
      />
    </TouchableOpacity>
  </View>
)}

Plus.defaultProps = {
  Icon:"div"
}
Plus.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.any,
}

export default Plus
