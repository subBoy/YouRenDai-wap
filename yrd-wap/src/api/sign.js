import axios from 'axios'

axios.defaults.withCredentials = true

const debug = process.env.NODE_ENV !== 'production'
let url = ''

// 注册获取短信验证码
export function getCodeNumber (loginName) {
  if (debug) {
    url = '/api/getCode'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'sendTelCode',
    loginName,
    state: 'zc'
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    if (debug) {
      return Promise.resolve({msg: '短信发送成功', flag: true})
    }
    return Promise.resolve(res.data)
  })
}

// 忘记密码获取短信验证码
export function getPassCodeNumber (loginName) {
  if (debug) {
    url = '/api/getPassCodeNumber'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'sendTelCode',
    loginName,
    state: 'zh'
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 注册验证手机号
export function checkTel (loginName) {
  if (debug) {
    url = '/api/checkTel'
  } else {
    url = '/front/register.do'
  }

  const data = Object.assign({}, {
    cmd: 'checkTel',
    loginName,
    type: 'tz'
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 忘记密码验证手机号
export function checkTelPass (loginName) {
  if (debug) {
    url = '/api/checkTel'
  } else {
    url = '/front/register.do'
  }

  const data = Object.assign({}, {
    cmd: 'checkTel4ForgetPwd',
    loginName
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取推荐人
export function getRecommend (loginName) {
  if (debug) {
    url = '/api/getRecommend'
  } else {
    url = '/front/searchrecommend.do'
  }

  const data = Object.assign({}, {
    cmd: 'DataDecryption',
    loginName
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取图片验证码
export function getImgCode () {
  if (debug) {
    url = '/api/getImgCode'
  } else {
    url = '/front/register.do'
  }

  const data = Object.assign({}, {
    cmd: 'needCode'
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 注册
export function signUp (loginName, telcode, lcNum, userType, password) {
  if (debug) {
    url = '/api/signUp'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'register',
    source: 'WAP',
    loginname: loginName,
    telcode,
    lcNum,
    type: userType,
    password
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 登录
export function signIn (loginName, passWord, checkCode) {
  if (debug) {
    url = '/api/signIn'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'login',
    source: 'WAP',
    loginname: loginName,
    password: passWord,
    checkCode
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 忘记密码
export function forgetPassword (loginName, telcode, mdNum, pwd) {
  if (debug) {
    url = '/api/forgetPassword'
  } else {
    url = '/front/register.do'
  }

  const data = Object.assign({}, {
    cmd: 'forgetPwd',
    source: 'WAP',
    loginName,
    telcode,
    mdNum,
    pwd
  })

  return axios({
    url,
    method: 'post',
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 检测登录状态
export function getLoginState (userId) {
  if (debug) {
    url = '/api/getLoginState'
  } else {
    url = '/validateUser.jsp'
  }

  const data = Object.assign({}, {
    wapUserId: userId,
    _: +new Date()
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 退出登录
export function signOut () {
  if (debug) {
    url = '/api/signOut'
  } else {
    url = '/front/logout.do'
  }

  const data = Object.assign({}, {
    cmd: 'new_logout',
    _: +new Date()
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
