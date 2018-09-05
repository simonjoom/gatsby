import React from 'react'
import { View, Image, Text } from 'react-native'
// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: rhythm(2.5),
        }}
      >
        <Image
          source={{ uri: profilePic }}
          defaultSource={{ uri: profilePic }}
          alt={'Kyle Mathews'}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <Text>
          Written by <strong>Kyle Mathews</strong> who lives and works in San
          Francisco building useful things.{' '}
          <a href="https://twitter.com/kylemathews">
            You should follow him on Twitter
          </a>
        </Text>
      </View>
    )
  }
}

export default Bio
