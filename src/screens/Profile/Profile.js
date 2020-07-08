import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Text } from 'react-native'
import {
  Container,
  Form,
  FormInput,
  Title,
  SubmitButton,
  Separator
} from './styles'
import { updateProfileRequest } from '../../store/modules/user/actions'

import Background from '../../components/Background/Background'

const formSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid e-mail').required('Required'),
  nome: Yup.string().trim().required('Required'),
  oldPassword: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  password_confirmation: Yup.string()
    .trim()
    .required('Required')
    .test('passwords-match', 'The new password must match', function (value) {
      return this.parent.password === value
    })
})

export default function Profile ({ navigation }) {
  const profile = useSelector(state => state.user.profile)
  const loading = useSelector(state => state.user.loading)
  const initialValues = {
    email: profile.email,
    password: '',
    name: profile.name,
    oldPassword: '',
    password_confirmation: ''
  }

  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const oldPasswordRef = useRef()
  const passwordConfirmationRef = useRef()

  const onSubmit = (values, isValid) => {
    // if (isValid) {
    const { name, oldPassword, password, password_confirmation, email } = values
    dispatch(
      updateProfileRequest({
        name,
        oldPassword,
        password,
        password_confirmation,
        email,
        _id: profile._id
      })
    )
    // r}
  };
  return (
    <Background>
      <Container>
        <Title>My perfil</Title>
        <Formik initialValues={initialValues} validationSchema={formSchema}>
          {({
            values,
            isValid,
            handleChange,
            setFieldTouched,
            touched,
            errors
          }) => (
            <Form>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                placeholder='Your name'
                name='name'
                returnKeyType='next'
                onSubmitEditing={() => emailRef.current.focus()}
                value={values.name}
                onBlur={() => setFieldTouched('name')}
                onChangeText={handleChange('name')}
              />
              {touched.name && errors.name && (
                <Text style={{ fontSize: 12, marginBottom: 10, color: 'red' }}>
                  {errors.name}
                </Text>
              )}
              <FormInput
                icon='mail-outline'
                autoCorrect={false}
                keyboardType='email-address'
                editable={false}
                placeholder='Your email'
                name='email'
                returnKeyType='next'
                onSubmitEditing={() => oldPasswordRef.current.focus()}
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, marginBottom: 10, color: 'red' }}>
                  {errors.email}
                </Text>
              )}
              <Separator />
              <FormInput
                icon='lock-outline'
                autoCorrect={false}
                secureTextEntry
                placeholder='Your password'
                name='oldPassword'
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current.focus()}
                value={values.oldPassword}
                onBlur={() => setFieldTouched('oldPassword')}
                onChangeText={handleChange('oldPassword')}
              />
              <FormInput
                icon='lock-outline'
                autoCorrect={false}
                secureTextEntry
                placeholder='new password'
                name='password'
                returnKeyType='next'
                onSubmitEditing={() => passwordConfirmationRef.current.focus()}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange('password')}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, marginBottom: 10, color: 'red' }}>
                  {errors.password}
                </Text>
              )}
              <FormInput
                icon='lock-outline'
                autoCorrect={false}
                secureTextEntry
                placeholder='New Password confirmation'
                name='password_confirmation'
                returnKeyType='send'
                onSubmitEditing={() => onSubmit(values, isValid)}
                value={values.password_confirmation}
                onBlur={() => setFieldTouched('password_confirmation')}
                onChangeText={handleChange('password_confirmation')}
              />
              {touched.password_confirmation &&
                errors.password_confirmation && (
                <Text style={{ fontSize: 12, marginBottom: 10, color: 'red' }}>
                  {errors.password_confirmation}
                </Text>
              )}
              <SubmitButton
                loading={loading}
                onPress={() => onSubmit(values, isValid)}
              >
                Update profile
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  )
}
