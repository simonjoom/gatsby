import React, {Component} from "react"
import {Text, View, ImageBackground, Image, StyleSheet} from "react-native";
import Layout from "components/layout"

class BackgroundImage extends Component {
  render(){
    return (
      <ImageBackground source={require('../../static/home-image.jpg')} style={styles.image}>
        {this.props.children}
      </ImageBackground>
    )
  }
}

class Home extends Component {
  render(){
    return (
      <Layout location={this.props.location}>
        <View style={{flex:1}}>
          {/* <Text>Hello World</Text> */}
          <BackgroundImage>
            <Text style={styles.text}>Fullscreen!</Text>
          </BackgroundImage>
          <Text>Hellower World</Text>
          <Text>Hellower World</Text>
          <Text>Hellower World</Text>
          <Text>Hellower World</Text>
          <Text>Hellower World</Text>
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    flex: 1,
    width: null,
    height: 500,
    backgroundPosition: 'top',
    resizeMode: 'cover',
    zIndex:100
  },
  text:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5em',
    fontWeight: 'bold',
    fontSize:'2em'
  }
})

export default Home