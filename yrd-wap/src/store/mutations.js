import * as types from './mutation-types'

const mutations = {
  [types.CHANGE_LOGIN_STATE](state, changeLoginState) {
    state.changeLoginState = changeLoginState
  }
}
export default mutations
