import 'babel-polyfill'
import Vue from 'vue'
// import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import App from './App'
import router from './router'

import 'common/stylus/index.styl'

// fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
