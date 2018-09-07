import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import {myicons} from "src/components/layout"

import color from '../../statics/colors/index'
import styles from './Button.styles'

const propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  borderColor: PropTypes.string,
  position: PropTypes.string,
  fontSize: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
} 

const defaultProps = {
  style: {},
  labelColor: color.white,
  iconColor: color.white,
  backgroundColor: 'transparent',
  height: 50,
  //width: "auto",
  position: 'center',
  borderColor: color.white,
  fontSize: 14,
  disabled: false,
}

const Button = props => {
  const {
    onPress,
    label,
    labelColor,
    icon,
    iconColor,
    backgroundColor,
    height,
    //width,
    position,
    borderColor,
    fontSize,
    loading,
    disabled,
  } = props
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[
        styles.touchable,
        {
          height: height,
          alignSelf:
            position === 'left'
              ? 'flex-start'
              : position === 'right'
                ? 'flex-end'
                : position,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        props.style,
      ]}
    >
      {icon && <myicons.Ionicons size={24} name={icon} color={iconColor} />}
      {!loading && (
        <Text
          style={[
            styles.text,
            {
              color: labelColor,
              fontSize: fontSize,
            },
          ]}
        >
          {label}
        </Text>
      )}
      {loading && <ActivityIndicator color="white" />}
    </TouchableOpacity>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
