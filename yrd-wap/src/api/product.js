import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

export function getProjectList (page, rows) {
  if (debug) {
    url = '/api/getProjectList'
  } else {
    url = '/front/projectList.do'
  }

  const data = Object.assign({}, {
    cmd: 'commonProject201702',
    page,
    rows
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
