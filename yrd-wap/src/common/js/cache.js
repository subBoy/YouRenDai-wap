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

// 获取上级路由信息

const HISY = '__hisy__'

export function setHisy(hisy) {
  let returnVal = storage.get(HISY, '')
  returnVal = hisy
  storage.set(HISY, returnVal)
  return returnVal
}

export function getHisy() {
  return storage.get(HISY, '')
}

// 获取下级路由信息

const NEXTY = '__nexty__'

export function setNexty(nexty) {
  let returnVal = storage.get(NEXTY, '')
  returnVal = nexty
  storage.set(NEXTY, returnVal)
  return returnVal
}

export function getNexty() {
  return storage.get(NEXTY, '')
}

// 财务审计数据存取
const AUDITITEM = '__audititem__'

export function setAuditItem (audititem) {
  let returnVal = storage.get(AUDITITEM, '')
  returnVal = audititem
  storage.set(AUDITITEM, returnVal)
  return returnVal
}

export function getAuditItem () {
  return storage.get(AUDITITEM, '')
}