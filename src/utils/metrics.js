import { Dimensions } from 'react-native'

const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const xScreen = Dimensions.get('screen').width
const yScreen = Dimensions.get('screen').height
const NAV_HEIGHT = 45
const metrics = {
  DEVICE_WIDTH: x,
  SCREEN_WIDTH: xScreen,
  DEVICE_HEIGTH: y,
  SCREEN_HEIGHT: yScreen,
  NAV_HEIGHT
}

export default metrics
