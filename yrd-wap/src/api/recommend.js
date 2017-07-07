import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

export function getRecommendBanner () {
  if (debug) {
    url = '/api/getRecommendBanner'
  } else {
    url = '/app/index.do'
  }

  const data = Object.assign({}, {
    cmd: 'banner'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRecommendPro () {
  if (debug) {
    url = '/api/getRecommendPro'
  } else {
    url = '/front/productMessage.do'
  }

  const data = Object.assign({}, {
    cmd: 'initIndex201702'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
