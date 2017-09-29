import * as types from './mutation-types'

const mutations = {
  [types.CHANGE_LOGIN_STATE](state, changeLoginState) {
    state.changeLoginState = changeLoginState
  },
  [types.CHANGE_RETURN_PATH](state, returnPath) {
    state.changeReturnPath = returnPath
  }
}
export default mutations
