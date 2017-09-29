import * as types from './mutation-types'
import {setChangeLogin, setReturnPath} from 'common/js/cache'

export const changeLoginState = function ({commit}, loginState) {
  commit(types.CHANGE_LOGIN_STATE, setChangeLogin(loginState))
}

export const changeReturnPath = function ({commit}, returnPath) {
  commit(types.CHANGE_RETURN_PATH, setReturnPath(returnPath))
}
