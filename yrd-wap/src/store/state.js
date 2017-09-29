import {getChangeLogin, getReturnPath} from 'common/js/cache'

const state = {
  changeLoginState: getChangeLogin(),
  changeReturnPath: getReturnPath()
}

export default state
