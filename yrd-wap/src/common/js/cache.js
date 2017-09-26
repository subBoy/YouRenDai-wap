import storage from 'good-storage'

const LOGIN_KEY = '__login__'

export function setChangeLogin(loginState) {
  let loginStates = storage.get(LOGIN_KEY, '')
  loginStates = loginState
  storage.set(LOGIN_KEY, loginStates)
  return loginStates
}

export function getChangeLogin() {
  return storage.get(LOGIN_KEY, '')
}
