<template>
  <div class="user-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :whiteIcon="whiteIcon">
      <div class="user-install" @click="setUser"></div>
    </m-header>
    <div class="user-grounp">
      <scroll class="user-scroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="scroll">
        <div>
          <div class="user-info-wrapper">
            <div class="user-info-grounp">
              <div class="user-info">
                <div class="avatar"></div>
                <div class="user-info-center">
                  <p class="name">131****2100<span class="vip"></span></p>
                  <p class="balance">账户余额 <span class="sum">￥10000.00</span></p>
                </div>
              </div>
              <div class="btns-wrapper">
                <span class="withdraw btn">提现</span>
                <span class="recharge btn">立即充值</span>
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
    <tab></tab>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Tab from 'components/tab/tab'
  export default {
    data() {
      return {
        isShow: false,
        whiteIcon: true,
        listenScroll: true,
        probeType: 3,
        opcity: 0,
        currentIndex: -1,
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
            path: 'invite',
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
        setTimeout(() => {
          this.$router.push({
            path: `user-center/${item.path}`
          })
        }, 100)
      },
      setUser () {
        this.$router.push('user-center/set-user')
      }
    },
    components: {
      MHeader,
      Scroll,
      Tab
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
                  line-height: 14px
                  margin: 5px 0
                  .vip
                    display: inline-block
                    margin-left: 5px
                    vertical-align: top
                    width: 35px
                    height: 14px
                    bg-image('vip-bg')
                    background-size: 35px 13px
                    background-position: center
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
