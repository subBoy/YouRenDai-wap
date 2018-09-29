<template>
  <div class="user-wrapper" @touchmove.prevent>
    <m-header v-show="false" :isShow="isShow" :opcity="opcity" :whiteIcon="whiteIcon" @logined="logined" @noLogin="noLogin"></m-header>
    <div class="user-grounp">
      <scroll class="user-scroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="scroll">
        <div>
          <div class="user-info-wrapper">
            <div class="user-info-grounp">
              <div class="user-info">
                <div class="avatar"></div>
                <div class="user-info-center" v-if="signed"> 
                  <p class="user-info-center-txt">
                    <span class="user-info-name">{{userInfo.username}}</span>
                    <span class="user-info-grade">v{{userInfo.level}}</span>
                  </p>
                  <p class="user-info-center-txt">欢迎回来！</p>
                </div>
              </div>
              <div class="user-ct-set-btn-wrapper" :class="{'pl-70': signed}">
                <a href="/loan/customer_service_wap.shtml" class="user-ct-set-btn-item item-1"></a>
                <span class="user-ct-set-btn-item item-2" @click="setUser" v-if="signed"></span>
              </div>
              <div v-if="!signed">
                <div class="user-ct-unlogin-desc">
                  <p class="user-ct-desc">新用户福利</p>
                  <p class="user-ct-desc">注册即送<span class="fwb">1888</span>元现金红包</p>
                </div>
                <div class="btns-wrapper">
                  <span class="sign-btn btn br" @click="GotoSignUp">注册</span>
                  <span class="sign-btn btn" @click="GotoSignIn">登录</span>
                </div>
              </div>
              <div v-else>
                <div class="user-ct-islogin-desc">
                  <p class="ucindc-tle">
                    <span class="ucindc-tle-name in-b">总资产 (元)</span>
                    <span class="ucindc-tle-btn in-b" :class="{'isLook': isLook}" @click="setLook"></span>
                  </p>
                  <p class="ucindec-sum" v-html="userDataInfo.zTotal"></p>
                  <div class="ucindec-list-info">
                    <p class="ucindec-info-item">
                      累计收益（元）：
                      <span class="ucindec-info-item-sum" v-html="userDataInfo.nEarn"></span>
                    </p>
                    <p class="ucindec-info-item">
                      待收金额（元）：
                      <span class="ucindec-info-item-sum" v-html="userDataInfo.zEarn"></span>
                    </p>
                  </div>
                </div>
                <div class="btns-wrapper">
                  <p class="btns-wrapper-desc btn">
                    <span class="btns-wrapper-desc-box">
                      <span class="btns-wrapper-desc-txt">可用余额 (元)</span>
                      <span class="btns-wrapper-desc-sum" v-html="userDataInfo.zSum"></span>
                    </span>
                  </p>
                  <span class="withdraw btn-1 br" @click="GotoWithdraw">提现</span>
                  <span class="recharge btn-1" @click="GotoRecharge">充值</span>
                </div>
              </div>
            </div>
          </div>
          <div class="user-application-wrapper">
            <ul class="application-list">
              <li class="application-item" v-for="item in applicationList" @click="selectedItem(item)">
                <div class="item-grounp">
                  <span class="icon" :class="item.icon"></span>
                  <p class="text">{{item.text}}</p>
                </div>
              </li>
              <div class="clear-both"></div>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <tab :activeIndex="activeIndex"></tab>
    <confirm ref="customerConfirm" @confirm="confirm" :text="text" :confirmBtnText="confirmBtnText" :btnTxt="btnTxt" :winDesc="winDesc" :realClass="realClass"></confirm>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Tab from 'components/tab/tab'
  import Confirm from 'base/confirm/confirm'
  import {userCenter} from 'api/user'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        whiteIcon: true,
        listenScroll: true,
        probeType: 3,
        opcity: 0,
        currentIndex: -1,
        signed: false,
        text: '您还未实名认证！',
        confirmBtnText: '实名认证',
        btnTxt: '请先完成',
        winDesc: '为保障您的出借安全',
        realClass: true,
        realNameOk: false,
        user_id: '',
        userInfo: {},
        activeIndex: 3,
        isLook: false,
        applicationList: [
          {
            path: 'invest-record',
            text: '出借记录',
            icon: 'ic-2'
          },
          {
            path: 'deal-record',
            text: '交易明细',
            icon: 'ic-1'
          },
          {
            path: 'packs',
            text: '我的券包',
            icon: 'ic-5'
          },
          {
            path: 'disclosure',
            text: '信息披露',
            icon: 'ic-4'
          },
          {
            path: 'share-back',
            text: '邀请好友',
            icon: 'ic-3'
          },
          {
            path: 'customer-service',
            text: '客服工号',
            icon: 'ic-6'
          }
        ]
      }
    },
    computed: {
      userDataInfo () {
        if (this.isLook) {
          return {
            zSum: this.checkVal(this.userInfo.activity),
            zTotal: this.checkVal(this.userInfo.total),
            zEarn: this.checkVal(this.userInfo.duein),
            nEarn: this.checkVal(this.userInfo.rate)
          }
        }
        return {
          zSum: '*****',
          zTotal: '******',
          zEarn: '****',
          nEarn: '****'
        }
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      setLook () {
        this.isLook = !this.isLook
      },
      scroll (pos) {
        if (pos.y < 0) {
          this.opcity = Math.abs(pos.y / 44)
          this.whiteIcon = false
        } else {
          this.opcity = 0
          this.whiteIcon = true
        }
      },
      selectedItem (item) {
        if (this.changeLoginState === '' && item.path !== 'packs' && item.path !== 'disclosure') {
          this.changeReturnPath(this.$route.path)
          this.$router.push({
            path: '/signIn'
          })
          return
        }
        setTimeout(() => {
          this.$router.push({
            path: `/${item.path}`
          })
        }, 80)
      },
      GotoSignUp () {
        this.$router.push({
          path: '/signUp'
        })
      },
      GotoSignIn () {
        this.$router.push({
          path: '/signIn'
        })
      },
      GotoWithdraw () {
        if (!this.realNameOk) {
          this.$router.push({
            path: '/real-name'
          })
          return
        }
        this.$router.push({
          path: '/withdraw'
        })
      },
      GotoRecharge () {
        if (!this.realNameOk) {
          this.$router.push({
            path: '/real-name'
          })
          return
        }
        this.$router.push({
          path: '/recharge'
        })
      },
      setUser () {
        this.$router.push('/set-user')
      },
      confirm () {
        this.$router.push('/real-name')
      },
      logined (res) {
        if (res.usernameCh === '') {
          this._real()
          this.realNameOk = false
        } else {
          this.realNameOk = true
        }
        this.user_id = res.user_Id
        this._getUser()
        this.signed = true
      },
      noLogin (res) {
        this._real()
        this.signed = false
      },
      countVip (num) {
        if (num < 4) {
          return 'vip1-3'
        } else if (num < 7) {
          return 'vip4-6'
        }
        return 'vip7-9'
      },
      checkVal (sum) {
        if (!sum) return
        let flostNum = ''
        const indexD = sum.split('.')
        if (!indexD[1]) {
          flostNum = '00'
        } else {
          flostNum = indexD[1] + '00'
        }
        let ret = indexD[0] + '.' + flostNum
        return ret.substring(0, indexD[0].length + 3)
      },
      _real () {
        setTimeout(() => {
          this.$refs.customerConfirm.show()
        }, 20)
      },
      _getUser () {
        userCenter(this.user_id).then((res) => {
          this.userInfo = res.ret_set
        })
      },
      ...mapActions([
        'changeReturnPath'
      ])
    },
    components: {
      MHeader,
      Scroll,
      Tab,
      Confirm
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .user-wrapper
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    background-color: $color-background
    .user-install
      extend-click()
      position: absolute
      right: 15px
      top: 12px
      width: 20px
      height: 20px
      bg-image('set')
      background-size: 20px 20px
    .colorIcon
      .user-install
        bg-image('set-b')
    .user-news
      extend-click()
      position: absolute
      right: 45px
      top: 12px
      width: 20px
      height: 20px
      bg-image('news')
      background-size: 20px 20px
    .user-grounp
      position: absolute
      top: 0
      right: 0
      bottom: 50px
      left: 0
      .user-scroll
        width: 100%
        height: 100%
        overflow: hidden
        .user-info-wrapper
          position: relative
          height: 195px
          background-color: $color-theme
          .user-info-grounp
            margin: 0 20px
            .user-ct-islogin-desc
              text-align: center
              color: #fff
              .ucindc-tle
                margin-top: 5px
                font-size: 0
                .in-b
                  display: inline-block
                  vertical-align: middle
                  font-size: 12px
                  letter-spacing: 2px
                  &.ucindc-tle-btn
                    width: 25px
                    height: 30px
                    bg-image('nl')
                    background-position: center
                    background-size: 17px auto
                    &.isLook
                      bg-image('yl')
              .ucindec-sum
                line-height: 30px
                font-size: 24px
              .ucindec-list-info
                display: flex
                align-items: center
                justify-content: center
                margin-top: 10px
                height: 50px
                .ucindec-info-item
                  flex: 1
                  line-height: 20px
                  text-align: center
                  font-size: 10px
                  .ucindec-info-item-sum
                    font-size: 15px
            .user-info
              display: flex
              box-sizing: border-box
              padding: 10px 0
              align-items: center
              .avatar
                flex: 0 0 30px
                width: 30px
                height: 30px
                margin-right: 10px
                bg-image('avatar')
                background-size: 30px 30px
              .user-info-center
                flex: 1
                .user-info-center-txt
                  line-height: 15px
                  font-size: 10px
                  color: #fff
                  .user-info-grade
                    padding-left: 5px
            .user-ct-set-btn-wrapper
              display: flex
              position: absolute
              left: 85%
              top: 0
              right: 0
              &.pl-70
                left: 70%
              .user-ct-set-btn-item
                flex: 1
                display: block
                height: 50px
                background-position: center
                background-size: 20px
                &.item-1
                  bg-image('kefu')
                &.item-2
                  bg-image('set')
            .user-ct-unlogin-desc
              padding-top: 15px
              .user-ct-desc
                padding: 0 0 10px 2px
                text-align: center
                font-size: 16px
                letter-spacing: 2px
                color: #fff
                .fwb
                  padding-right: 2px
                  font-size: 24px
                  letter-spacing: normal
            .btns-wrapper
              position: absolute
              top: 140px
              right: 20px
              left: 20px
              display: flex
              margin-top: 32px
              line-height: 55px
              border-radius: 5px
              background-color: $color-text
              box-shadow: 0px 0px 15px -2px #ccc
              .btns-wrapper-desc
                display: flex
                align-items: center
                .btns-wrapper-desc-box
                  display: block
                  flex: 1
                  padding-left: 18px
                  text-align: left
                  .btns-wrapper-desc-txt
                    display: block
                    line-height: 20px
                    color: #969696
                    font-size: 10px
                  .btns-wrapper-desc-sum
                    display: block
                    line-height: 20px
                    color: $btn-clo
                    font-size: 16px
              .btn
                position: relative
                flex: 1
                text-align: center
                color: $color-tle
              .btn-1
                position: relative
                flex: 0 0 70px
                width: 70px
                text-align: center
              .sign-btn
                color: $btn-clo
              .recharge
                color: $btn-clo
              .br
                &::after
                  content: ''
                  display: block
                  position: absolute
                  top: 50%
                  transform: translateY(-50%)
                  right: -0.5px
                  width: 1px
                  height: 15px
                  background-color: $color-background
        .user-application-wrapper
          margin: 42px 20px 0
          padding-bottom: 10px
          .application-list
            border-radius: 5px
            background-color: $color-text
            box-shadow: 0px 2px 15px -2px #ccc
            .clear-both
              clear: both
            .application-item
              position: relative
              width: 50%
              height: 130px
              float: left
              text-align: center
              .item-grounp
                position: absolute
                width: 100%
                height: 100%
                background-color: $color-text
                border: 1px solid $color-background
                transition: all 0.1s
                .icon
                  display: block
                  width: 100%
                  height: 84px
                  background-position: bottom center
                  background-size: 51px 49px
                  &.ic-1
                    bg-image('ic-1')
                  &.ic-2
                    bg-image('ic-7')
                  &.ic-3
                    bg-image('ic-8')
                  &.ic-4
                    bg-image('ic-4')
                  &.ic-5
                    bg-image('ic-9')
                  &.ic-6
                    bg-image('ic-6')
                .text
                  padding: 13px 0 18px
                  line-height: 16px
                  font-size: $font-size-small
                  color: $color-q
                &:hover
                  transform: scale(1.05)
                  box-shadow: 0px 0px 15px -2px #ccc
                  transform-origin: 50% 50%
                  z-index: 10
</style>
