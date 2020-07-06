import { all } from 'redux-saga/effects'
import auth from './modules/auth/sagas'
import user from './modules/user/sagas'

export default function * appSagas () {
  return yield all([auth, user])
}
