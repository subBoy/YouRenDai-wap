import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

// 首页
export function getIndexData (userId) {
  if (debug) {
    url = '/api/getIndexData'
  } else {
    url = '/wap/wapIndexAction.do'
  }

  const data = Object.assign({}, {
    cmd: 'init',
    userId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
