import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 30,
    marginBottom: 5,
    zIndex: -1,
  },
  container: {
    width: '50%',
    marginBottom: '50px',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  icon: {
    zIndex: 10,
  },
})
