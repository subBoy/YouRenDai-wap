import storage from 'good-storage'

const LOGIN_KEY = '__login__'
const RETURN_PATH = '__path__'

export function setChangeLogin(loginState) {
  let loginStates = storage.get(LOGIN_KEY, '')
  loginStates = loginState
  storage.set(LOGIN_KEY, loginStates)
  return loginStates
}

export function getChangeLogin() {
  return storage.get(LOGIN_KEY, '')
}

export function setReturnPath(returnPath) {
  let returnPaths = storage.get(RETURN_PATH, '')
  returnPaths = returnPath
  storage.set(RETURN_PATH, returnPaths)
  return returnPaths
}

export function getReturnPath() {
  return storage.get(RETURN_PATH, '')
}
