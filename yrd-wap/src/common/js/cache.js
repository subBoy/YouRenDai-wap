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

// 账单详情参数存取 message_id create_date

const MESSAGE_ID = '__messid__'
const CREATE_DATE = '__createdate__'

export function setMessageId(messid) {
  let returnVal = storage.get(MESSAGE_ID, '')
  returnVal = messid
  storage.set(MESSAGE_ID, returnVal)
  return returnVal
}

export function getMessageId() {
  return storage.get(MESSAGE_ID, '')
}

export function setCreateDate(createdate) {
  let returnVal = storage.get(CREATE_DATE, '')
  returnVal = createdate
  storage.set(CREATE_DATE, returnVal)
  return returnVal
}

export function getCreateDate() {
  return storage.get(CREATE_DATE, '')
}