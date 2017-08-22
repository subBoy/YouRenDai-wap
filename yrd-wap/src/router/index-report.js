import Vue from 'vue'
import Router from 'vue-router'

import Report from 'components/report/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/report'
    },
    {
      path: '/report',
      component: Report
    }
  ]
})

