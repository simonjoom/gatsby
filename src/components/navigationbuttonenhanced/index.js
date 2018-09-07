import React, { Component } from 'react'
import { View, TouchableOpacity, Dimensions, Text } from 'react-native'
import Picker from 'react-native-picker'
import Input from 'src/components/input/Input'
import color from '../../statics/colors/index'
import styles from './NavigationButton.styles'
import {myicons} from "src/components/layout"
const getEnum = (listarrayobj, mkey) => {
  return listarrayobj.map(obj => {
    console.log(obj, mkey)
    return obj[mkey]
  })
}
class NavigationButton extends Component {
  constructor(props) {
    super(props)
    const fields = this.props.mkey || 'name'
    if (this.props.selector) {
      this.sel = getEnum(this.props.selector, this.props.mkey)
      console.log('sel', this.sel)
      this.first = this.sel[0]
    } else {
      this.first = this.props.init
    }
    this.state = {
      [fields]: this.first,
    }
  }
  renderPickerEnum = ({ datas, selected, mkey }) => {
    console.log('fefe', datas, selected, mkey)
    return (
      <Picker
        showDuration={300}
        showMask={false}
        width="50%"
        style={{
          width: 150,
        }}
        selectedValue={this.state[mkey] || selected}
        pickerTitleText={mkey}
        pickerConfirmBtnText="Ok"
        pickerData={datas}
        onValueChange={(el, index) => this.setState({ [mkey]: el[0] })}
      />
    )
  }
  render() {
    const styleInput = {
      flexGrow: 5,
      marginTop: 5,
      marginLeft: 5,
      alignSelf: 'flex-start',
    }
    const { dark, selector, enabled, onPress, text, mkey } = this.props
    if (selector) {
      return (
        <View style={[styles.container]}>
          <Text>{text}</Text>
          {this.sel.length > 0 && (
            <this.renderPickerEnum
              datas={this.sel}
              selected={this.first}
              mkey={mkey}
            />
          )}
          {this.state[mkey] && (
            <TouchableOpacity
              style={[
                styles.touchable,
                {
                  alignSelf: 'flex-end',
                  backgroundColor: enabled
                    ? color.white
                    : 'rgba(255, 255, 255, 0.1)',
                },
              ]}
              hitSlop={{
                top: 20,
                bottom: 20,
                left: 40,
                right: 40,
              }}
              onPress={() => onPress(this.state[mkey])}
            >
              <Icon
                name="ios-arrow-forward"
                size={22}
                color={dark ? color.text : color.red}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      )
    } else {
      const valid = this.first && this.first != ''
      return (
        <View style={[styles.container]}>
          <Input
            widthAuto
            placeholder={text}
            placeholderTextColor="gray"
            mkey={mkey + '_field_'}
            style={styleInput}
            onChangeText={value => this.setState({ [mkey]: value })}
            value={this.state[mkey] || this.first}
          />
          <TouchableOpacity
            style={[
              styles.touchable,
              {
                alignSelf: 'flex-end',
                backgroundColor: valid
                  ? color.white
                  : 'rgba(255, 255, 255, 0.1)',
              },
            ]}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 40,
              right: 40,
            }}
            onPress={() => onPress(this.state[mkey])}
          > 
              <myicons.Ionicons
                name="ios-arrow-forward"
                size={22}
                color={dark ? color.text : color.red}
                style={styles.icon}
              /> 
          </TouchableOpacity>
        </View>
      )
    }
  }
}

export default NavigationButton
