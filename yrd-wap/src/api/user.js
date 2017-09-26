import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

// 实名认证
export function setRealName (realname, cardId, userId) {
  if (debug) {
    url = '/api/setRealName'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'realRegister',
    realname,
    cardId,
    user_id: userId,
    source: 'WAP'
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

// 投资记录
export function getInvestRecord (userId, page, rows) {
  if (debug) {
    url = '/api/getInvestRecord'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'investRecord',
    user_id: userId,
    page,
    rows
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

// 认购确认
export function subscription (userId, realName, idCard, reward, rewardLines, projectId, loanMoney, projectType) {
  if (debug) {
    url = '/api/subscription'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'identification',
    user_id: userId,
    realName,
    idCard,
    reward,
    reward_lines: rewardLines,
    param: {
      projectId,
      loanMoney,
      projectType
    }
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

// 礼包大放送
export function getPacks (userId, page, rows) {
  if (debug) {
    url = '/api/getPacks'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'rewardList',
    user_id: userId,
    page,
    rows
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

// 我的资产
export function getAssets(userId) {
  if (debug) {
    url = '/api/getAssets'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'moneyManage',
    userId
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

// 个人中心
export function userCenter(userId) {
  if (debug) {
    url = '/api/userCenter'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'getUser',
    userId: userId
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

// 客服工号
export function getCustomer(userId) {
  if (debug) {
    url = '/api/getCustomer'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'lcData',
    user_id: userId
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

// 绑定客服工号
export function setCustomer(userId, lcNum) {
  if (debug) {
    url = '/api/setCustomer'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'lcAdd',
    user_id: userId,
    lcNum
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

// 立即充值
export function userRecharge(userId, source, timestamp, sign) {
  if (debug) {
    url = '/api/userRecharge'
  } else {
    url = '/front/appSearchRecharge.do'
  }

  const data = Object.assign({}, {
    cmd: 'beforeImmediatelyRecharge',
    user_id: userId,
    source,
    timestamp,
    sign
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

// 提现
export function userWithdrawal(userId, source, timestamp, sign) {
  if (debug) {
    url = '/api/userWithdrawal'
  } else {
    url = '/front/appWithdrawal.do'
  }

  const data = Object.assign({}, {
    cmd: 'beforeImmediatelyRecharge',
    user_id: userId,
    source,
    timestamp,
    sign
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

// 投资者须知 问券
export function getInvestorNotice (qaCatCode, qaPaperIssue) {
  if (debug) {
    url = '/api/getInvestorNotice'
  } else {
    url = '/qa/pager.do'
  }

  const data = Object.assign({}, {
    cmd: 'getQaPager',
    qaCatCode,
    qaPaperIssue
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 投资者须知 答案提交
export function submitInvestorNotice(qaPaperId, qaAnsContent) {
  if (debug) {
    url = '/api/submitInvestorNotice'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'submitQaAns',
    qaPaperId,
    qaAnsContent
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

// 获取平台奖励列表
export function getRewardList (projectId, investmentAmount) {
  if (debug) {
    url = '/api/getRewardList'
  } else {
    url = '/front/userReward.do'
  }

  const data = Object.assign({}, {
    cmd: 'orderRewardList201702',
    project_id: projectId,
    investment_amount: investmentAmount
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
