import React, {Component} from 'react'
import { graphql,Link, StaticQuery } from 'gatsby'
import {View, Text, StyleSheet} from 'react-native'
import Img from "gatsby-image"

// const BgImg = ({name, style}) => (
//   <StaticQuery
//   query = {graphql`
//   query BackgroundImage{
//     file(relativePath: { regex: "/home-image/" }){
//       childImageSharp {
//         fluid(maxWidth:1000) {
//           ...GatsbyImageSharpFluid_tracedSVG
//         }
//       }  
//     }
//   }
//   `}
//   render={data=>{
//     return (
//       <View style={{display: 'flex', border:"2px solid black"}}>
//         <View>
//         <Text>{name}</Text>
//         <Img fluid={data.file.childImageSharp.fluid}/>
//         </View>
//       </View>
//     )
//   }}
//   />
// )

class Home extends Component {
  render(){
    return (
      <View style={styles.parent}>
        <View style={styles.main}>

          <View style={styles.section}>
            <View style={styles.subSection}>
              <Text style={styles.header}>What we do</Text>
              <View>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Text>
              </View>
            </View>
            
          </View>

          <View style={styles.sectionColor}>
            <View style={styles.subSection}>
              <Text style={styles.header}>Meet your instructors</Text>
              <View>
                <Text>Instructor 1</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
              <View>
                <Text>Instructor 2</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
              <View>
                <Text>Instructor 3</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
            </View>
            
          </View>

          <View style={styles.section}>
            <View style={styles.subSection}>
              <Text style={styles.header}>What are our awesome Skiers are saying</Text>
              <View>
                <Text>Skier 1</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
              <View>
                <Text>Skier 2</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
              <View>
                <Text>Skier 3</Text>
                <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionColor}>
            <View style={styles.subSection}>
              <Text style={styles.header}>Contact us!</Text>
              <View>
                <Text>Dial our hotline on: 123456789</Text>
                <Text>Email us at: abc@xyz.com</Text>
                <Text>Stuck on a Mountain? Give us a call 24/7 here: 1234567890</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
parent:{
  display: 'flex'
},
main:{
  justifyContent: 'center',
  // width: '70%',
  // margin: 'auto',
  // marginTop: '20px',
  backgroundColor: 'white'
},
header:{
  fontFamily: 'Verdana',
  fontWeight: 'Bold',
  fontSize: '1.5em',
  padding: '10px'
},
sectionColor:{
  backgroundColor: '#F1F6FA',
  // paddingBottom: '30px'
},
section:{
  // paddingBottom: '30px'
},
subSection:{
  marginTop: '70px',
  marginBottom:'70px',
  width: '70%',
  margin:'auto',
}
})

export default Home