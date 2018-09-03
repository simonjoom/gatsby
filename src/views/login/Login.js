import React from 'react'
import { Image, StatusBar, TouchableOpacity, View } from 'react-native'

import styles from './Login.styles'
import color from 'src/statics/colors'
import { translate } from 'src/i18n'
import Logo from 'src/svgcomp'

import Gradient from 'src/components/gradient/Gradient'
import Title from 'src/components/title/Title'
import Button from 'src/components/button/Button'
//import { SimpleLineIcons as Icon } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const Login = props => (
  <Gradient>
    <View style={styles.container}>
      <Logo id="feature-svg-component" />
      <Title style={{ marginBottom: 120 }} color={color.white} size={32}>
        Aromaclop
      </Title>
      <View
        style={{
          width: 250,
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Icon name="social-google" size={22} color={color.white} />
        <Icon name="social-facebook" size={22} color={color.white} />
        <Icon name="social-instagram" size={22} color={color.white} />
      </View>
    </View>
  </Gradient>
)

Login.propTypes = {}
Login.defaultProps = {}

export default Login
