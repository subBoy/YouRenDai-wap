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

export function getSubscribeData (projectId, userId) {
  if (debug) {
    url = '/api/getSubscribeData'
  } else {
    url = '/app/project.do'
  }

  const data = Object.assign({}, {
    cmd: 'wapProjectdetail',
    project_id: projectId,
    user_id: userId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRepaymentPlan (projectId) {
  if (debug) {
    url = '/api/getRepaymentPlan'
  } else {
    url = '/app/projectDetail.do'
  }

  const data = Object.assign({}, {
    cmd: 'appRepaymentPlan',
    projectId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getProjectInfo (projectId) {
  if (debug) {
    url = '/api/getProjectInfo'
  } else {
    url = '/app/projectDetail.do'
  }

  const data = Object.assign({}, {
    cmd: 'appProjectInformation',
    projectId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
