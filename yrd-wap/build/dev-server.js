require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var apiRoutes = express.Router()

apiRoutes.get('/getRecommendBanner', function (req, res) {
  var url = 'http://pre.yourendai.com/app/index.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com/',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRecommendPro', function (req, res) {
  var url = 'http://pre.yourendai.com/front/productMessage.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com/',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getNoticeList', function (req, res) {
  var url = 'http://pre.yourendai.com/app/index.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com/',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getProjectList', function (req, res) {
  var url = 'http://pre.yourendai.com/front/projectList.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSubscribeData', function (req, res) {
  var url = 'http://pre.yourendai.com/app/project.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getLoginState', function (req, res) {
  var url = 'http://pre.yourendai.com/validateUser.jsp'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/signOut', function (req, res) {
  var url = 'http://pre.yourendai.com/front/logout.do'
  axios.get(url, {
    headers: {
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/checkTel', function (req, res) {
  var url = 'http://pre.yourendai.com/front/register.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/getCode', function (req, res) {
  var url = 'http://pre.yourendai.com/front/register.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/getRecommend', function (req, res) {
  var url = 'http://pre.yourendai.com/front/searchrecommend.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/getImgCode', function (req, res) {
  var url = 'http://pre.yourendai.com/front/register.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/signIn', function (req, res) {
  var url = 'http://pre.yourendai.com/front/register.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/signUp', function (req, res) {
  var url = 'http://pre.yourendai.com/front/register.do'
  axios({
    url,
    method: 'post',
    data: req.body,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substr(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      referer: 'http://pre.yourendai.com',
      host: 'pre.yourendai.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
