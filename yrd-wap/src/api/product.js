import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'
let url = ''

export function getProjectList (page, row) {
  if (debug) {
    url = '/api/getProjectList'
  } else {
    url = '/front/projectList.do'
  }

  const data = Object.assign({}, {
    cmd: 'commonProject201702',
    page: page,
    rows: row
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
