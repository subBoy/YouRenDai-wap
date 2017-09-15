import * as types from './mutation-types'
import {setChangeLogin} from 'common/js/cache'

export const changeLoginState = function ({commit}, loginState) {
  commit(types.CHANGE_LOGIN_STATE, setChangeLogin(loginState))
}
