import React, {Component} from "react";
import {View, Text, StyleSheet} from 'react-native';
import {StaticQuery} from 'gatsby';
import Img from "gatsby-image";

export default ({ data, height }) => (
  <StaticQuery
  query = {graphql`
  query NewBackgroundImage{
    file(relativePath: { regex: "/home-image/" }){
      childImageSharp {
        fluid(maxWidth: 2048){
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
        <Img fluid={data.file.childImageSharp.fluid} height={height}/>
        </View>
      </View>
    )
  }}
  />
)