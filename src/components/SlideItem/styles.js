import { StyleSheet } from 'react-native'
import { colors } from '../../utils/colors'
import metrics from '../../utils/metrics'

const elementHeight = metrics.NAV_HEIGHT + 99
const itemWidth = metrics.DEVICE_WIDTH - 85
const itemHeight = metrics.DEVICE_HEIGHT - elementHeight - 70
export default StyleSheet.create({
  slide: {
    alignItems: 'center',
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
    backgroundColor: colors.fourth
  },
  text: {
    fontSize: 48,
    color: colors.white
  },
  textPerMonth: {
    fontSize: 15,
    opacity: 0.6,
    color: colors.white
  },
  headerText: {
    fontSize: 18,
    lineHeight: 50,
    color: colors.white
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: itemHeight * 0.06,
    marginBottom: itemHeight * 0.09
  },
  servicesContainer: {
    alignItems: 'center'
  }
})
