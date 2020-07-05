import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { colors } from '../../utils/colors'

export default styled(LinearGradient).attrs({
  colors: [colors.primary, colors.black]
})`
  flex: 1;
`
