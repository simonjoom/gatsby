 import React from 'react';
 import starUrl, { ReactComponent as Logo } from './assets/logo.svg';
import { Image,StyleSheet } from 'react-native';

const styles=StyleSheet.create({
  logo: {
    height: 150,
    width: 150,
  }
});
 
export default ({style}) => <Image source={starUrl} alt="star" style={[styles.logo, ...style]}/>;

 //:<Logo id="feature-svg-component" />}</div>;
// <Image source={require('../../assets/logo.png')} style={styles.logo} />