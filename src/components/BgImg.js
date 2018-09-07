import React, {Component} from "react";
import {View, Text, StyleSheet} from 'react-native';
import {StaticQuery} from 'gatsby';
import Img from "gatsby-image";

export default ({ data }) => (
  <StaticQuery
  query = {graphql`
  query BackgroundImage{
    file(relativePath: { regex: "/home-image/" }){
      childImageSharp {
        fluid(maxWidth: 1000, maxHeight: 350) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }  
    }
  }
  `}
  render={data=>{
    return (
      <View style={{display: 'flex'}}>
        <View>
        <Img fluid={data.file.childImageSharp.fluid}/>
        </View>
      </View>
    )
  }}
  />
)
