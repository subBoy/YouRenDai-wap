<template>
  <div class="set-user-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="setUserInfo"></m-header>
    <scroll class="set-user-scroll" ref="setUserScroll">
      <div class="set-user-center">
        <div class="logo">
          <span class="icon"></span>
        </div>
        <div class="set-work-list">
          <div class="work-item border-1px-b" @click="gRealName">
            <span class="service-name">实名认证</span>
            <span class="service-info">
              <span class="seio-txt clo-txt" v-html="approveName"></span>
            </span>
          </div>
          <div class="work-item border-1px-b" @click="changeBank">
            <span class="service-name">我的银行卡</span>
            <span class="service-info">
              <span class="seio-txt clo-txt" v-html="approveBank"></span>
            </span>
          </div>
          <div class="work-item border-1px-b nmgr" @click="changeUserIp">
            <span class="service-name">手机号码</span>
            <span class="service-info">
              <span class="seio-txt hasIcon" v-html="userIp"></span>
            </span>
          </div>
          <div class="work-item border-1px-b nmgr" @click="investorNotice">
            <span class="service-name">风险测评</span>
            <span class="service-info">
              <span class="seio-txt hasIcon"></span>
            </span>
          </div>
          <div class="work-item border-1px-b nmgr" @click="changeUserPd">
            <span class="service-name">修改登录密码</span>
            <span class="service-info">
              <span class="seio-txt hasIcon"></span>
            </span>
          </div>
          <div class="work-item bbn" @click="callMe">
            <span class="service-name">咨询客服</span>
            <span class="service-info">
              <a class="clo-txt" id="callme" href="/loan/customer_service_wap.shtml">400-663-9190</a>
            </span>
          </div>
        </div>
        <div class="login-out-btn"><span class="btn-txt" @click="_singOut">安全退出</span></div>
      </div>
    </scroll>
    <a :href="hrefUrl" id="gotoshree"></a>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import TopTip from 'base/top-tip/top-tip'
  import {signOut} from 'api/sign'
  import {judgeIrNe, bindBank} from 'api/user'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '设置',
        isShow: false,
        opcity: 1,
        approveName: '',
        approveBank: '',
        userIp: '',
        topTipTxt: '',
        hrefUrl: '',
        userInfo: {}
      }
    },
    mounted () {
      this.$refs.setUserScroll.refresh()
    },
    methods: {
      callMe () {
        document.getElementById('callme').click()
      },
      gRealName () {
        if (this.approveName !== '认证') {
          return
        }
        this.$router.push('/real-name')
      },
      changeBank () {
        let cmd = ''
        if (this.approveBank === '修改') {
          cmd = 'xwUnbindBank'
        } else {
          cmd = 'xwBindBank'
        }
        const _this = this
        bindBank(_this.userInfo.user_Id, cmd).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.hrefUrl = res.ret_set.redirect_url
          setTimeout(() => {
            document.getElementById('gotoshree').click()
          }, 20)
        })
      },
      investorNotice () {
        const _this = this
        judgeIrNe(_this.userInfo.user_Id).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          if (res.ret_set.ans === 'n') {
            // this.topTipTxt = '今年评测次数已用完<br/>不可再继续评测'
            // this.$refs.topTip.show()
            this.$router.push('/review-result')
            return
          }
          this.$router.push('/investor-notice')
        })
      },
      changeUserIp () {
        if (this.approveBank !== '修改') {
          this.topTipTxt = '开通新网银行存管账户<br/>后即可修改绑定手机号'
          this.$refs.topTip.show()
          return
        }
        this.$router.push('/change-ip')
      },
      changeUserPd () {
        this.$router.push('/change-pd')
      },
      setUserInfo (res) {
        this.userInfo = res
        if (res.xwMobile && res.xwMobile.length > 0) {
          this.userIp = `${res.xwMobile.substr(0, 3)}****${res.xwMobile.substr(res.xwMobile.length - 4, 4)}`
        }
        if (res.usernameCh.length > 0) {
          this.approveName = '已认证'
        } else {
          this.approveName = '认证'
        }
        if (res.xwBankCode && res.xwBankCode.length > 0) {
          this.approveBank = '修改'
        } else {
          this.approveBank = '开通'
        }
      },
      _singOut () {
        signOut().then(() => {
          this.changeLoginState('')
          this.changeReturnPath('')
          this.$router.push('/')
        })
      },
      ...mapActions([
        'changeLoginState',
        'changeReturnPath'
      ])
    },
    components: {
      MHeader,
      Scroll,
      TopTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .set-user-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .set-user-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      overflow: hidden
    .set-user-center
      position: relative
      min-height: 100%
      box-sizing: border-box
      padding-bottom: 84px
      .logo
        padding: 20px 0
        margin: 10px auto
        width: 90%
        border-radius: 10px
        box-shadow: 0px 5px 5px -6px #ccc
        background-color: #FFF
        .icon
          display: block
          margin-bottom: 10px
          width: 100%
          height: 51px
          bg-image('logo')
          background-size: 51px 51px
          background-position: center
          background-repeat: no-repeat
        .text
          font-size: $font-size-medium
          color: $color-tle
      .set-work-list
        margin: 0 auto
        width: 90%
        border-radius: 10px
        box-shadow: 0px 5px 5px -6px #ccc
        background-color: #FFF
      .work-item
        display: flex
        margin: 0 10px
        line-height: 44px
        height: 44px
        background-color: $color-text
        font-size: $font-size-medium
        border-1px-b(#f5f5f5)
        &.bbn
          border-1px-b(#fff)
        &.nmgr
          .service-info
            margin-right: -5px
        .service-name
          flex: 1
          font-size: 12px
        .service-info
          flex: 1
          display: flex
          justify-content: flex-end
          .seio-txt
            font-size: 12px
            color: #c8c8c8;
            &.hasIcon
              padding-right: 15px
              background-position: right center
              background-size: 15px 15px
              bg-image('mr')
          .clo-txt
            font-size: 12px
            color: #ff4e49
    .login-out-btn
      position: absolute
      left: 5%
      width: 90%
      bottom: 20px
      .btn-txt
        display: block
        line-height: 44px
        height: 44px
        padding-left: 2px
        letter-spacing: 2px
        text-align: center
        border-radius: 22px
        font-size: $font-size-large
        background-color: $color-theme
        color: $color-text
        box-shadow: 0px 5px 5px -6px #ccc
</style>
