<template>
  <div class="assets-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :whiteIcon="whiteIcon"></m-header>
    <div class="assets-grounp">
      <scroll class="assets-scroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="scroll">
        <div>
          <div class="assets-info-wrapper">
            <div class="assets-info-grounp">
              <div class="assets-info">
                <p class="balance">10000.00<span class="util">元</span></p>
                <p class="desc">账户余额</p>
              </div>
              <div class="btns-wrapper">
                <span class="withdraw btn">提现</span>
                <span class="recharge btn">立即充值</span>
              </div>
            </div>
          </div>
          <ul class="assets-details-wrapper">
            <li class="assets-details-item">
              <span class="left">代收金额</span>
              <span class="right">￥1000.00</span>
            </li>
            <li class="assets-details-item">
              <span class="left">已收金额</span>
              <span class="right">￥100.00</span>
            </li>
            <li class="assets-details-item">
              <span class="left">下次回款</span>
              <span class="right">￥10.00</span>
            </li>
            <li class="assets-details-item">
              <span class="left">下次回款日期</span>
              <span class="right">2017-08-25</span>
            </li>
            <li class="assets-details-item">
              <span class="left">奖励金额</span>
              <span class="right">￥0.50</span>
            </li>
          </ul>
          <ul class="assets-operate-wrapper">
            <li class="assets-operate-item">
              <div class="assets-operate-group bg-1">
                <div class="operate-group-text">
                  <p class="desc">我的电子账单</p>
                  <span class="btn">立即查看</span>
                </div>
              </div>
            </li>
            <li class="assets-operate-item">
              <div class="assets-operate-group bg-2">
                <div class="operate-group-text">
                  <p class="desc">不知如何优化资产分配？</p>
                  <span class="btn">咨询客服</span>
                </div>
              </div>
            </li>
          </ul>
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
        titleTxt: '我的资产'
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
  .assets-wrapper
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: 999
    background-color: $color-background
    .assets-grounp
      position: absolute
      top: 0
      right: 0
      bottom: 50px
      left: 0
      .assets-scroll
        width: 100%
        height: 100%
        overflow: hidden
        .assets-info-wrapper
          height: 158px
          background-color: $color-theme
          .assets-info-grounp
            margin: 0 20px
            .assets-info
              text-align: center
              color: $color-text
              .balance
                padding-top: 45px
                font-size: 30px
                .util
                  font-size: $font-size-medium
              .desc
                padding: 15px 0 30px 0
                font-size: $font-size-medium
            .btns-wrapper
              display: flex
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
        .assets-details-wrapper
          margin-top: 35px
          padding: 15px 20px
          .assets-details-item
            display: flex
            line-height: 34px
            font-size: $font-size-medium
            .left
              flex: 1
              color: $color-q
            .right
              flex: 1
              text-align: right
              color: $color-tle
        .assets-operate-wrapper
          margin: 0 15px
          display: flex
          .assets-operate-item
            flex: 1
            margin: 0 2px
            .assets-operate-group
              position: relative
              height: 0
              padding-top: 120%
              background-size: 100% auto
              &.bg-1
                bg-image('bg-1')
              &.bg-2
                bg-image('bg-2')
              .operate-group-text
                position: absolute
                left: 0
                top: 68%
                width: 100%
                text-align: center
                transform: translateY(-50%)
                .desc
                  line-height: 10px
                  padding: 0 5px 15px
                  font-size: 10px
                  color: $color-q
                  white-space:nowrap
                .btn
                  display: block
                  margin: 0 auto
                  line-height: 30px
                  width: 80%
                  background-color: $color-theme
                  color: $color-text
                  font-size: $font-size-medium
                  border-radius: 15px
</style>
