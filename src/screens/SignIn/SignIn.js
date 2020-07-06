import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Background from '../../components/Background/Background'
import { signInRequest } from '../../store/modules/auth/actions'
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLinkText,
  SignLink
} from './styles'

export default function SignIn ({ navigation }) {
  const dispatch = useDispatch()
  const passwordRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loading = useSelector(state => state.auth.loading)
  function handleSubmit () {
    dispatch(signInRequest({ email, password }))
  }
  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon='mail-outline'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Password'
            returnKeyType='next'
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Login
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Don't have account yet? SignUp here!</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
