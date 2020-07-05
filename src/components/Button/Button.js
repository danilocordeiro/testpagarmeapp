import React from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text } from './styles'
import { colors } from '../../utils/colors'

export default function Button ({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size='small' color={colors.white} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

Button.defaultProps = {
  loading: false
}
