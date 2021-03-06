import React, { useState } from 'react'
import CryptoJS from 'react-native-crypto-js'
import { CreditCardInput } from 'react-native-credit-card-input'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../services/api'
import { completeProfileRequest } from '../../../store/modules/user/actions'
import { Container, SubmitButton, Title } from './styles'
import Background from '../../../components/Background/Background'

export default function PaymentCart ({ navigation }) {
  const dispatch = useDispatch()
  const [isValid, setIsValid] = useState(false)
  const [cart, setCart] = useState({})
  const profile = useSelector(state => state.user.profile)
  async function handleSubmit () {
    // if (isValid) {
    let expiration = parseInt(cart.expiry.replace('/', ''))
    if (expiration < 1000) {
      expiration = '0' + expiration
    }
    console.tron.log(expiration)
    const numbercart = cart.number.toString().replace(/\s+/g, '')
    const objToEncrypt = JSON.stringify({
      card_number: numbercart,
      card_expiration_date: expiration,
      card_holder_name: cart.name,
      card_cvv: cart.cvc
    })
    console.log('################# CARTAO ', objToEncrypt)
    const card_hash = CryptoJS.AES.encrypt(
      objToEncrypt,
      'hdfudhuidfhudhudah9d8s8f9d8a98as9d8s9d89as'
    ).toString()
    console.log('DDDDDDDDDDDDDDDDDDDDDD hash', card_hash)
    const state = navigation.getParam('state')
    const street = navigation.getParam('street')
    const street_number = navigation.getParam('street_number')
    const city = navigation.getParam('city')
    const zipcode = navigation.getParam('zipcode').replace('-', '')
    const neighborhood = navigation.getParam('neighborhood')
    const { cpf, phone, email } = profile
    const obj = {
      city,
      name: cart.name,
      state,
      zipcode,
      card_hash,
      neighborhood,
      street,
      email,
      cpf,
      phone,
      street_number
    }
    try {
      const response = await api.post('transaction', obj)
      if (response.data) {
        Alert.alert(
          'Pagamento feito com sucesso',
          'Seu acesso à plataforma está liberado'
        )
        dispatch(completeProfileRequest({ cpf, phone }))
        navigation.navigate('Home')
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Erro', 'Pagamento falhou')
    }
    // }
  }
  async function getForm (form) {
    if (form.valid) {
      setIsValid(true)
      setCart(form.values)
    }
  }

  return (
    <Background>
      <Title>Detalhes do pagamento</Title>
      <CreditCardInput
        labels={{
          number: 'Número do cartão',
          name: 'Nome do titular',
          expiry: 'Validade',
          cvc: 'CVV'
        }}
        placeholders={{
          number: 'Número do cartão',
          name: 'Nome do titular',
          expiry: 'Validade',
          cvc: 'CVV'
        }}
        inputStyle={{ color: 'white' }}
        labelStyle={{ color: 'white' }}
        requiresName
        onChange={form => {
          getForm(form)
        }}
      />
      <Container>
        <Title>Total: R$30</Title>
        <SubmitButton onPress={() => handleSubmit()}>
          Confirm Payment
        </SubmitButton>
      </Container>
    </Background>
  )
}
