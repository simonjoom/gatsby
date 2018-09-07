import React, {Component} from "react"
import {Text, View, ImageBackground, Image, StyleSheet} from "react-native";
import Layout from "components/layout";
import Img from 'gatsby-image'
import { StaticQuery } from "gatsby";
import BgImg from "components/BgImg"

class Home extends Component {
  render(){
    return (
      <Layout location={this.props.location}>
        <View style={styles.portionParent}>
         <BgImg></BgImg>

         {/* Split into sections below */}
          <View style={styles.viewPortion}>
            <Text style={styles.text}>This is a Portion</Text>
          </View>

          {/* Split into sections below */}
          <View style={styles.viewPortion}>
            <Text style={styles.text}>This is another Portion</Text>
          </View>

          {/* Split into sections below */}
          <View style={styles.viewPortion}>
            <Text style={styles.text}>This is another Portion</Text>
          </View>
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
viewPortion: {
  width: '70%',
  height: 150,
  marginLeft: '14%'
},
portionParent:{
  flex: 1,
  justifyContent: 'center'
},
text:{
  fontSize: '1.5em',
}
})

export default Home