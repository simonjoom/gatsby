import React, {Component} from 'react'
import { graphql,Link, StaticQuery } from 'gatsby'
import {View, Text} from 'react-native'
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
      <View>
        <Text>Hello World!</Text>
      </View>
    )
  }
}

export default Home