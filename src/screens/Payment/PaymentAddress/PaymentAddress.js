import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Text, Alert } from 'react-native'
import cep from 'cep-promise'
import { Container, Form, FormInput, Title, SubmitButton } from './styles'
import Background from '../../../components/Background/Background'
import { colors } from '../../../utils/colors'

const formSchema = Yup.object().shape({
  zipcode: Yup.string()
    .trim()
    .required('Obrigatório')
    .length(9, 'o cep deve ter pelo menos 8 dígitos'),
  street: Yup.string().trim().required('Obrigatório'),
  street_number: Yup.string().trim().required('Obrigatório'),
  city: Yup.string().trim().required('Obrigatório'),
  state: Yup.string().trim().required('Obrigatório'),
  neighborhood: Yup.string().trim().required('Obrigatório')
})

export default function PaymentAddress ({ navigation }) {
  const profile = useSelector(state => state.user.profile)
  const loading = useSelector(state => state.user.loading)
  const initialValues = {
    zipcode: '',
    state: '',
    street: '',
    city: '',
    neighborhood: '',
    street_number: ''
  }

  const streetRef = useRef()
  const stateRef = useRef()
  const cityRef = useRef()
  const neighborhoodRef = useRef()
  const streetnumberRef = useRef()

  const onSubmit = async (values, isValid) => {
    if (isValid) {
      const {
        zipcode,
        state,
        street,
        city,
        neighborhood,
        street_number
      } = values

      navigation.push('PaymentCart', {
        zipcode,
        state,
        street,
        city,
        neighborhood,
        street_number
      })
    }
  }

  const onChangeCep = async (setValues, values, txt) => {
    if (txt.length === 9) {
      setValues({ ...values, zipcode: txt })
      try {
        const { state, city, street, neighborhood } = await cep(txt)
        setValues({ ...values, state, city, street, neighborhood, zipcode: txt })
      } catch (e) {
        Alert.alert('CEP not found')
      }
    } else {
      setValues({ ...values, zipcode: txt })
    }
  }

  return (
    <Background>
      <Container>
        <Title>Billing Address</Title>
        <Formik initialValues={initialValues} validationSchema={formSchema}>
          {({
            values,
            handleChange,
            setFieldTouched,
            touched,
            isValid,
            errors,
            setValues
          }) => (
            <Form>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                CEP
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Your CEP'
                name='zipcode'
                returnKeyType='next'
                keyboardType='number'
                typeInput='mask'
                typeMask='cep'
                onSubmitEditing={() => {
                  streetnumberRef.current.focus()
                }}
                value={values.zipcode}
                onBlur={() => setFieldTouched('zipcode')}
                onChangeText={txt => {
                  onChangeCep(setValues, values, txt)
                }}
              />
              {touched.zipcode && errors.zipcode && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.zipcode}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                City
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Your city'
                name='city'
                ref={cityRef}
                returnKeyType='next'
                onSubmitEditing={() => {
                  stateRef.current.focus()
                }}
                value={values.city}
                onBlur={() => setFieldTouched('city')}
                onChangeText={handleChange('city')}
              />
              {touched.city && errors.city && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.city}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                State
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Your state'
                name='state'
                ref={stateRef}
                returnKeyType='next'
                onSubmitEditing={() => {
                  neighborhoodRef.current.focus()
                }}
                value={values.state}
                onBlur={() => setFieldTouched('state')}
                onChangeText={handleChange('state')}
              />
              {touched.state && errors.state && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.state}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                Neighborhood
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Seu bairro'
                name='neighborhood'
                ref={neighborhoodRef}
                returnKeyType='next'
                onSubmitEditing={() => {
                  neighborhoodRef.current.focus()
                }}
                value={values.neighborhood}
                onBlur={() => setFieldTouched('neighborhood')}
                onChangeText={handleChange('neighborhood')}
              />
              {touched.neighborhood && errors.neighborhood && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.neighborhood}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                Street
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Your street'
                name='street'
                ref={streetRef}
                returnKeyType='next'
                onSubmitEditing={() => {
                  streetnumberRef.current.focus()
                }}
                value={values.street}
                onBlur={() => setFieldTouched('street')}
                onChangeText={handleChange('street')}
              />
              {touched.street && errors.street && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.street}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: colors.white
                }}
              >
                Number
              </Text>
              <FormInput
                icon='person-outline'
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Number'
                name='street_number'
                ref={streetnumberRef}
                returnKeyType='next'
                value={values.street_number}
                onBlur={() => setFieldTouched('street_number')}
                onChangeText={handleChange('street_number')}
              />
              {touched.street_number && errors.street_number && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: colors.red
                  }}
                >
                  {errors.street_number}
                </Text>
              )}

              <SubmitButton
                loading={loading}
                onPress={() => onSubmit(values, isValid)}
              >
                Next
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  )
}
