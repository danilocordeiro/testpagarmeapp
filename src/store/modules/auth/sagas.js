import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../../services/api'
import { signInSuccess, signFailure } from './actions'

export function * signIn ({ payload }) {
  try {
    const { email, password } = payload
    const password_confirmation = password
    const response = yield call(api.post, 'user/authenticate', {
      email,
      password,
      password_confirmation
    })
    const { token, user } = response.data
    AsyncStorage.setItem('user', JSON.stringify({ user, token }))
    api.defaults.headers.Authorization = `Bearer ${token}`
    yield put(signInSuccess(token, user))
  } catch (e) {
    Alert.alert('Error', 'Login failed, check email or password')
    yield put(signFailure())
  }
}
export function * signUp ({ payload }) {
  try {
    const { email, password, password_confirmation, type, name } = payload
    if (type === 'admin') {
      Alert.alert('Error', 'You are not admin')
      yield put(signFailure())
    }

    const response = yield call(api.post, 'user/register', {
      email,
      password,
      password_confirmation,
      type,
      name
    })
    if (response.status === 201) {
      Alert.alert('Sucsess', 'Successfully registred')
      const responseSign = yield call(api.post, 'user/authenticate', {
        email,
        password,
        password_confirmation
      })
      const { token, user } = responseSign.data
      AsyncStorage.setItem('user', JSON.stringify({ user, token }))
      api.defaults.headers.Authorization = `Bearer ${token}`
      yield put(signInSuccess(token, user))
    } else {
      Alert.alert('Error', 'Invalid data')
      yield put(signFailure())
    }
  } catch (e) {
    Alert.alert('Error', 'Sign failure')
    yield put(signFailure())
  }
}
export function signOut () {}

export function setToken ({ payload }) {
  if (!payload) return
  if (payload.token === undefined) {
    if (payload.auth.token) {
      api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`
    }
  } else {
    const { token } = payload
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut)
])
