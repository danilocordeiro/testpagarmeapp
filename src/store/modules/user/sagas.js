import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Alert } from 'react-native'
import api from '../../../services/api'
import { updateProfileSuccess, updateProfileFailure } from './actions'

export function * updateProfile ({ payload }) {
  try {
    const {
      name,
      _id,
      email,
      oldPassword,
      password,
      password_confirmation
    } = payload.data
    console.log('dsudsuydiudis', payload.data)
    const profile = {
      name,
      _id,
      email,
      oldPassword,
      password,
      password_confirmation
    }

    console.log('$$$$$$$$$$###################*****', api.defaults.headers)

    const response = yield call(api.put, `user/${profile._id}`, profile)
    if (response.data.message) {
      Alert.alert('Error', response.data.message)
      yield put(updateProfileFailure())
    } else if (response.data) {
      Alert.alert('Success', 'Profile successfully updated')
      yield put(updateProfileSuccess(response.data))
    } else {
      Alert.alert('Error', 'Check your data 22')
      yield put(updateProfileFailure())
    }
  } catch (err) {
    console.tron.log(err)
    Alert.alert('Error', 'Check your data 33')
    yield put(updateProfileFailure())
  }
}

export function * completeProfile ({ payload }) {
  try {
    const { cpf, phone } = payload.data
    const profile = {
      cpf,
      phone
    }
    const response = yield call(api.put, 'user/complete-register', profile)
    if (response.data.message) {
      Alert.alert('Erro', response.data.message)
      yield put(updateProfileFailure())
    } else if (response.data) {
      yield put(updateProfileSuccess(response.data))
    } else {
      Alert.alert('Erro', 'Check your data')
      yield put(updateProfileFailure())
    }
  } catch (err) {
    console.tron.log(err)
    Alert.alert('Erro', 'Check your data')
    yield put(updateProfileFailure())
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/COMPLETE_PROFILE_REQUEST', completeProfile)
])
