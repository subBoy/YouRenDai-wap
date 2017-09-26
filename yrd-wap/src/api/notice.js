import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

// 公告列表
export function getNoticeList (page, rows) {
  if (debug) {
    url = '/api/getNoticeList'
  } else {
    url = '/app/index.do'
  }

  const data = Object.assign({}, {
    cmd: 'wapNotice',
    page,
    rows
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 公告详情
export function getNoticeDetails (contentId) {
  if (debug) {
    url = '/api/getNoticeDetails'
  } else {
    url = '/app/index.do'
  }

  const data = Object.assign({}, {
    cmd: 'approachHtml',
    content_id: contentId,
    type: 'gonggao'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 最新消息列表
export function getLatestNews (page, rows, userId) {
  if (debug) {
    url = '/api/getLatestNews'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'messageList',
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

// 全部已读 最新消息列表
export function readAllNews (userId) {
  if (debug) {
    url = '/api/readAllNews'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'wapProjectInformation',
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

// 更改消息列表状态
export function readOneNews (userId, receivesId, messageId) {
  if (debug) {
    url = '/api/readOneNews'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'wapProjectInformation',
    user_id: userId,
    message_id: messageId,
    receivesId
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
