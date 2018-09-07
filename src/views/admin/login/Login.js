import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import styles from './Login.styles'
import color from 'src/statics/colors'
import { translate } from 'src/i18n'
import Logo from 'src/svgcomp'

import Title from 'src/components/title/Title'
import Button from 'src/components/button/Button'

import { NavigationActions } from 'react-navigation'
const Login = ({ SimpleLineIcons, navigation }) => { 
  return(
  <View style={styles.container}>
    <Logo id="feature-svg-component" />
    <Title style={{ marginBottom: 120 }} color={color.white} size={32}>
      SkiScool
    </Title>
    <Button
      onPress={() => navigation.navigate('Backend')}
      label={translate('Backend')}
      backgroundColor={color.white}
      labelColor={color.red}
      fontSize={14}
    />
    <View
      style={{
        width: 250,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <SimpleLineIcons name="social-google" size={22} color={color.white} />
      <SimpleLineIcons name="social-facebook" size={22} color={color.white} />
      <SimpleLineIcons name="social-instagram" size={22} color={color.white} />
    </View>
  </View>
)
    }

Login.propTypes = {}
Login.defaultProps = {
  SimpleLineIcons: 'div',
}

export default Login
