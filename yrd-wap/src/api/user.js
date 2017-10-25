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
    real_name: realname,
    card_id: cardId,
    userId,
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
    userId,
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
export function subscription (userId, realName, idCard, reward, rewardLines, rewardType, projectId, loanMoney, projectType) {
  if (debug) {
    url = '/api/subscription'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const str = {
    projectId,
    loanMoney,
    projectType
  }

  const data = Object.assign({}, {
    cmd: 'identification',
    userId,
    realName,
    idCard,
    reward,
    reward_lines: rewardLines,
    rewardType,
    type: 'loan',
    param: JSON.stringify(str)
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
    userId,
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

// 绑定客服工号
export function setCustomer(userId, lcNum) {
  if (debug) {
    url = '/api/setCustomer'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'lcAdd',
    userId,
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
export function userRecharge(money, realName, idCard, mobilePhone, verificationCode) {
  if (debug) {
    url = '/api/userRecharge'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'recharge',
    money,
    realName,
    idCard,
    mobilePhone,
    verificationCode
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

// 取消充值
export function closeRecharge(ordernoV) {
  if (debug) {
    url = '/api/closeRecharge'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'updateRecharge',
    ordernoV
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

// 继续充值
export function continueRecharge(money, ordernoV) {
  if (debug) {
    url = '/api/continueRecharge'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'bhaneoapp',
    money,
    ordernoV
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

// 充值记录
export function rechargeRecord(userId, page, rows) {
  if (debug) {
    url = '/api/rechargeRecord'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'rechargeList',
    userId,
    page,
    rows
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 提现
export function userWithdrawal(money) {
  if (debug) {
    url = '/api/userWithdrawal'
  } else {
    url = '/front/appWithdrawalList.do'
  }

  const data = Object.assign({}, {
    cmd: 'withdrawal',
    money,
    source: 'wap'
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

// 提现记录
export function withdrawalRecord(userId, page, rows) {
  if (debug) {
    url = '/api/withdrawalRecord'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'withdrawalList',
    userId,
    page,
    rows
  })

  return axios.get(url, {
    params: data
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
export function submitInvestorNotice(userId, qaPaperId, qaAnsContent) {
  if (debug) {
    url = '/api/submitInvestorNotice'
  } else {
    url = '/wap/wapUserAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'submitQaAns',
    userId,
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

// 账单列表
export function getBillList(userId, page, rows) {
  if (debug) {
    url = '/api/getBillList'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'orderList',
    userId,
    page,
    rows
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 账单详情
export function getBillDetails(userId, createDate, messageId) {
  if (debug) {
    url = '/api/getBillDetails'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'billDetails',
    userId,
    create_date: createDate,
    messageId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 全部已读 账单列表
export function readAllBill (userId) {
  if (debug) {
    url = '/api/readAllBill'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'allOrderState',
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
