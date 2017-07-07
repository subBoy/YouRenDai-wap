import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

export function getNoticeList () {
  if (debug) {
    url = '/api/getNoticeList'
  } else {
    url = '/app/index.do'
  }

  const data = Object.assign({}, {
    cmd: 'wapNotice',
    page: 1,
    rows: 10
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
