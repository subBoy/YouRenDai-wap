<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="icon" :class="{stateOk: operateState}"></div>
          <p class="text">
            {{text}}
            <span class="back-btn" v-if="!operateState" @click="hide">返回上一步</span>
          </p>
          <div class="operate">
            <div class="operate-btn"><span class="btn-box" @click="confirm">{{confirmBtnText}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      operateState: {
        type: Boolean,
        default: true
      }
    },
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
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
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
      transform: translate(-50%, -50%)
      z-index: 999
      .confirm-content
        width: 270px
        padding: 45px 0
        border-radius: 13px
        background: $color-text
        .icon
          height: 45px
          bg-image('err')
          background-size: 45px 45px
          background-position: bottom center
          &.stateOk
           bg-image('suc')
        .text
          position: relative
          padding: 28px 15px 58px 15px
          line-height: 24px
          text-align: center
          font-size: $font-size-large-z
          color: $color-tle
          .back-btn
            position: absolute
            left: 0
            bottom: 15px
            display: block
            width: 100%
            text-align: center
            font-size: $font-size-medium
            color: $color-q
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            .btn-box
              display: block
              margin: 0 auto
              width: 160px
              line-height: 44px
              border-radius: 22px
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
