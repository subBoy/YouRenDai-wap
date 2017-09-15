<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="hide">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="icon"></div>
          <p class="text">400-663-9190</p>
          <p class="desc">服务时间9:00-18:00</p>
          <div class="operate">
            <div class="operate-btn"><a class="item-txt" href="tel:400-663-9190">立即拨打</a></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      width: 80%
      transform: translate(-50%, -50%)
      z-index: 999
      .confirm-content
        position: relative
        width: 100%
        padding: 30px 0 0
        border-radius: 13px
        background: $color-text
        .icon
          position: absolute
          width: 100%
          height: 66px
          top: -33px
          left: 0
          background-size: 66px 66px
          background-position: bottom center
          bg-image('tle')
        .text
          position: relative
          padding: 28px 15px 20px 15px
          line-height: 24px
          text-align: center
          font-size: $font-size-large-z
          color: $btn-clo
          font-weight: bold
        .desc
          color: $color-q
          text-align: center
          font-size: $font-size-small-s
        .operate
          display: flex
          margin-top: 30px
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            .item-txt
              display: block
              margin: 0 auto
              width: 100%
              line-height: 44px
              border-radius: 0 0 13px 13px
              color: $color-text
              background-color: $btn-clo

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
