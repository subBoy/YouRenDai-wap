import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

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
