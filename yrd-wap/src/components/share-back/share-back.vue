<template>
  <div class="share-back-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" :guideBool="guideBool" @logined="logined"></m-header>
    <scroll class="share-back-scroll" ref="backScroll">
      <div class="share-back-content">
        <div class="app-20170512-invited-wrapper">
          <img src="./invited-20170512-bg.jpg" width="100%">
          <em class="app-20170512-invited-time">活动时间: 2017年4月17日起</em>
          <div class="app-invited-page-1">
            <p class="app-invited-page-desc">活动期内，邀请好友注册并完成首笔投资，可获现金奖励，奖励规则如下：</p>
            <img src="./invited-20170512-rule-1.png" width="100%">
          </div>
          <p class="app-invited-page-desc-1">新手注册更有1888现金送给您</p>
          <a class="app-invited-loginUp"><span class="kaonima invite-0519-btn">新手注册立即就送</span></a>
          <div class="app-invited-page-2">
            <img src="./invited-20170512-rule.png" @load="loadImage" width="100%">
          </div>
          <input type="hidden" id="invite_url">
        </div>
      </div>
    </scroll>
    <div class="app-invited-page-3">
      <div class="app-invited-page-3-bg">
        <img src="./invited-201706512-btn-1.png" width="100%">
        <a class="signed" id="signed" @click="shareBack">立即分享</a>
      </div>
    </div>
    <div class="slide-wrapper" v-show="winShow">
      <em class="bg" @click="hide"></em>
      <div class="slide-wrapper-centent">
        <p class="desc">请好友扫描二维码</p>
        <div class="erweima">
          <div class="erweima-img">
            <div id="qrcode">
            </div>
          </div>
        </div>
        <div v-show="shareHide">
          <p class="desc">或</p>
          <div class="line"></div>
          <div class="invite-type">
            <ul class="invite-type-wrapper bdsharebuttonbox">
              <li class="invite-type-item">
                <div class="tyoe-icon ic-1"></div> <a id="bds_weixin"
                class="bds_weixin" data-cmd="weixin"></a>
                <p class="type-name">微信好友</p>
              </li>
              <li class="invite-type-item">
                <div class="tyoe-icon ic-2"></div> <a id="bds_weixin"
                class="bds_weixin" data-cmd="weixin"></a>
                <p class="type-name">朋友圈</p>
              </li>
              <li class="invite-type-item">
                <div class="tyoe-icon ic-3"></div> <a id="bds_qzone"
                class="bds_qzone" data-cmd="qzone"></a>
                <p class="type-name">QQ空间</p>
              </li>
              <li class="invite-type-item">
                <div class="tyoe-icon ic-4"></div> <a id="popup_sqq"
                class="popup_sqq" data-cmd="sqq"></a>
                <p class="type-name">QQ好友</p>
              </li>
            </ul>
          </div>
          <div class="line"></div>
        </div>
        <div class="close-btn" @click="hide">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import $ from 'jquery'

  export default {
    data() {
      return {
        titleTxt: '分享返现',
        isShow: false,
        opcity: 1,
        winShow: false,
        guideBool: true,
        shareHide: false,
        src: '',
        logoSrc: '',
        inviteUrl: ''
      }
    },
    methods: {
      shareBack () {
        require('jquery/dist/jquery.qrcode.min.js')
        $('#qrcode').html('')
        this.qrcode()
        setTimeout(() => {
          this.show()
        }, 20)
      },
      qrcode () {
        console.log('inviteUrl:', this.inviteUrl)
        $('#qrcode').qrcode({
          text: this.inviteUrl,
          width: 110,
          height: 110
        })
      },
      show () {
        this.winShow = true
      },
      hide () {
        this.winShow = false
      },
      logined (res) {
        console.log('inviteUrl res: ', res)
        this.inviteUrl = res.wap_invite_url
      },
      loadImage () {
        this.$refs.backScroll.refresh()
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .share-back-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .share-back-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
    .kaonima
      display: block
      position: absolute
      left: 0
      top: 50%
      transform: translate3d(0, -50%, 0)
      width: 100%
      text-align: center
    .slide-wrapper
      position: fixed
      width: 100%
      height: 100%
      left: 0
      top: 0
      z-index: 10000
    .slide-wrapper .bg
      display: block
      width: 100%
      height: 100%
      background-color: #000
      opacity: 0.8
    .slide-wrapper-centent
      position: absolute
      bottom: 0
      left: 0
      width: 100%
    .slide-wrapper-centent .desc
      text-align: center
      font-size: 14px
      color: #fff
      margin-bottom: 25px
    .slide-wrapper-centent .line
      margin:10px 25px
      background-color: #666
      height: 1px
    .erweima
      margin: 0 auto
      width: 132px
      height: 130px
      background: url(invite-fen.png) center center no-repeat
      background-size: 100%
      margin-bottom: 50px
    .erweima-img
      position: relative
      margin: 0 auto
      width: 110px
      height: 110px
    #qrcode
      position: absolute
      top: 10px
      left: 2px
    .erweima-img img
      width: 100%
    .invite-type
      margin: 0 25px
    .invite-type-wrapper
      display: flex
      width: 100%
    .tyoe-icon
      width: 40px
      height: 50px
      margin: 0 auto
      background-repeat: no-repeat
      background-position: center
    .tyoe-icon.ic-1
      background-image: url(weixin.png)
      background-size: 26px
    .tyoe-icon.ic-2
      background-image: url(pengyouquan.png)
      background-size: 24px
    .tyoe-icon.ic-3
      background-image: url(qqkongjian.png)
      background-size: 24px
    .tyoe-icon.ic-4
      background-image: url(QQ.png)
      background-size: 20.5px
    .invite-type-item
      position: relative
      flex: 1
    #bds_weixin, #bds_qzone, #popup_sqq
      display: block
      position: absolute
      left: 0
      top: 0
      padding: 0
      margin: 0
      background-image: none
      width: 100%
      height: 100%
      z-index: 1000
    .type-name
      text-align: center
      color: #fff
      font-size: 10px
    .close-btn
      font-size: 14px
      color: #fff
      text-align: center
      padding: 20px
    .app-20170512-invited-wrapper
      position: relative
    .app-20170512-invited-time
      position: absolute
      left: 43%
      top: 9.5%
      line-height: 12px
      color: #fff
      font-size: 12px
      transform: translate3d(0, -50%, 0)
    .app-invited-page-1
      position: absolute
      left: 5%
      top: 32%
      width: 90%
      transform: translate3d(0, -50%, 0)
    .app-invited-page-desc
      line-height: 20px
      font-size: 12px
      color: #fff
      padding-bottom: 4px
    .app-invited-page-desc-1
      position: absolute
      width: 100%
      line-height: 16px
      left: 0
      top: 46%
      text-align: center
      font-size: 13px
      color: #fff
      transform: translate3d(0, -50%, 0)
    .app-invited-loginUp
      display: block
      position: absolute
      left: 50%
      margin-left: -77px
      top: 59.7%
      width: 154px
      height: 52px
      text-align: center
      background-image: url(invited-201706512-btn.png)
      background-size: 100% auto
      background-position: center
      background-repeat: no-repeat
      transform: translate3d(0, -50%, 0)
    .app-invited-loginUp .invite-0519-btn
      top: 34%
      color: #fff
      font-size: 12px
    .app-invited-page-2
      position: absolute
      left: 5%
      top: 82%
      width: 90%
      transform: translate3d(0, -50%, 0)
    .app-invited-page-3
      position: fixed
      width: 100%
      left: 0
      bottom: 0px
      z-index: 9
      background-color: #FF3273
    .app-invited-page-3-bg
      position: relative
      margin: 0 5%
      padding: 15px 0
    .app-invited-page-3 a
      display: none
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      display: flex
      color: #fff
      font-size: 16px
      justify-content: center
      align-items: center
</style>
