import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { colors } from '../../utils/colors'

export const Container = styled(RectButton)`
  height: 46px;
  background: ${colors.darkBlue};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`
