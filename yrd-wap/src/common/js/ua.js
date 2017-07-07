export const _UA = {
  ua: function () {
    return navigator.userAgent.toLowerCase()
  },
  isAndroid: function () {
    return _UA.ua().indexOf('android') !== -1
  },
  isIOS: function () {
    var a = _UA.ua()
    return (a.indexOf('iphone') !== -1 || a.indexOf('ipad') !== -1 || a.indexOf('ipod') !== -1)
  },
  isWeixin: function () {
    return (_UA.ua().indexOf('micromessenger') !== -1)
  }
}
