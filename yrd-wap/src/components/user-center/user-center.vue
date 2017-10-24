<template>
  <div class="user-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :whiteIcon="whiteIcon" @logined="logined" @noLogin="noLogin">
      <div class="user-install" @click="setUser" v-if="signed"></div>
    </m-header>
    <div class="user-grounp">
      <scroll class="user-scroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="scroll">
        <div>
          <div class="user-info-wrapper">
            <div class="user-info-grounp">
              <div class="user-info">
                <div class="avatar"></div>
                <div class="user-info-center">
                  <div v-if="signed">
                    <p class="name">{{userInfo.username}}<span class="vip" :class="countVip(userInfo.level)"><span class="num">V{{userInfo.level}}</span></span></p>
                    <p class="balance">账户余额 <span class="sum">￥{{checkVal(userInfo.activity)}}</span></p>
                  </div>
                  <router-link tag="div" class="user-no-login" to="/signIn" v-else>立即登录</router-link>
                </div>
              </div>
              <div class="btns-wrapper">
                <span class="withdraw btn" @click="GotoWithdraw">提现</span>
                <span class="recharge btn" @click="GotoRecharge">立即充值</span>
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
        winDesc: '为保障您的投资安全',
        realClass: true,
        realNameOk: false,
        user_id: '',
        userInfo: {},
        activeIndex: 3,
        applicationList: [
          {
            path: 'assets',
            text: '我的资产',
            icon: 'ic-1'
          },
          {
            path: 'invest-record',
            text: '投资记录',
            icon: 'ic-2'
          },
          {
            path: 'share-back',
            text: '邀请好友',
            icon: 'ic-3'
          },
          {
            path: 'disclosure',
            text: '信息披露',
            icon: 'ic-4'
          },
          {
            path: 'packs',
            text: '礼包大放送',
            icon: 'ic-5'
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
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
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
            path: `user-center/${item.path}`
          })
        }, 80)
      },
      GotoWithdraw () {
        if (this.changeLoginState === '') {
          this.changeReturnPath(this.$route.path)
          this.$router.push({
            path: '/signIn'
          })
          return
        } else {

        }
        this.$router.push({
          path: '/user-center/withdraw'
        })
      },
      GotoRecharge () {
        if (this.changeLoginState === '') {
          this.changeReturnPath(this.$route.path)
          this.$router.push({
            path: '/signIn'
          })
          return
        } else if (!this.realNameOk) {
          this.$router.push({
            path: '/user-center/real-name'
          })
          return
        }
        this.$router.push({
          path: '/user-center/recharge'
        })
      },
      setUser () {
        this.$router.push('user-center/set-user')
      },
      confirm () {
        this.$router.push('user-center/real-name')
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
          height: 158px
          background-color: $color-theme
          .user-info-grounp
            margin: 0 20px
            .user-info
              display: flex
              padding-top: 44px
              box-sizing: border-box
              align-items: center
              .avatar
                flex: 0 0 60px
                width: 60px
                height: 60px
                margin: 0 15px 0 20px
                bg-image('avatar')
                background-size: 60px 60px
              .user-info-center
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 24px
                overflow: hidden
                font-size: $font-size-medium
                color: $color-text
                .name
                  line-height: 16px
                  margin: 5px 0
                  .vip
                    display: inline-block
                    margin-left: 5px
                    vertical-align: top
                    width: 50px
                    height: 16px
                    background-size: auto 16px
                    background-position: center
                    &.vip1-3
                      bg-image('vip1-3')
                    &.vip4-6
                      bg-image('vip4-6')
                    &.vip7-9
                      bg-image('vip7-9')
                    .num
                      display: inline-block
                      float: right
                      line-height: 16px
                      font-size: $font-size-small
                      padding-right: 9px
                .balance
                  .sum
                    font-weight: bold
            .btns-wrapper
              display: flex
              margin-top: 32px
              line-height: 55px
              border-radius: 5px
              background-color: $color-text
              box-shadow: 0px 0px 15px -2px #ccc
              .btn
                position: relative
                flex: 1
                text-align: center
                color: $btn-clo
                &.withdraw
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
                    bg-image('ic-2')
                  &.ic-3
                    bg-image('ic-3')
                  &.ic-4
                    bg-image('ic-4')
                  &.ic-5
                    bg-image('ic-5')
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
