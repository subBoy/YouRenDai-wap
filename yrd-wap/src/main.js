import 'babel-polyfill'
import Vue from 'vue'
// import fastclick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'

import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
import $ from 'jquery'
// import vConsole from 'vconsole'

// fastclick.attach(document.body)

// Vue.use(VueLazyLoad, {
//   loading: require('common/image/default.png')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
