import { StyleSheet,
  Dimensions } from 'react-native';

let { width, height } = {
  width: (Dimensions.get("window").width * 2) / 3,
  height: (Dimensions.get("window").height * 2) / 3
};

const Mywidth = width > height ? width : height;
const Myheight = width > height ? height : width;

export default StyleSheet.create({
  container: {
    flex: 1,
    width:Mywidth,
//    height:Myheight,
    alignSelf:"center",
    //margin:"auto",
    //alignItems: "center",
    marginTop: 0,
  },
});
