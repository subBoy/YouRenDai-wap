<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="icon" :class="{stateOk: operateState, 'real-class': realClass}"></div>
          <p class="text">
            {{text}}
            <span class="win-desc">{{winDesc}}</span>
            <span class="back-btn" @click="hide">{{btnTxt}}</span>
          </p>
          <div class="operate">
            <div class="operate-btn"><span class="btn-box" @click.stop="confirm">{{confirmBtnText}}</span></div>
          </div>
        </div>
        <span class="close-btn" @click.stop="hide"></span>
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
      winDesc: {
        type: String,
        default: ''
      },
      btnTxt: {
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
      },
      realClass: {
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
      overflow: hidden
      .close-btn
        display: block
        position: absolute
        top: 0
        right: 0
        width: 40px
        height: 40px
        bg-image('close')
        background-position: right top
        background-size: 23px
      .confirm-content
        width: 270px
        padding: 24px 0
        border-radius: 13px
        background: $color-text
        .icon
          height: 43px
          bg-image('err')
          background-size: 40px 40px
          background-position: bottom center
          &.stateOk
           bg-image('suc')
          &.real-class
            bg-image('real')
        .text
          position: relative
          padding: 28px 15px 50px
          line-height: 24px
          text-align: center
          font-size: 14px
          color: $color-tle
          .win-desc
            position: absolute
            left: 0
            top: 54px
            display: block
            line-height: 12px
            width: 100%
            text-align: center
            font-size: 12px
            color: $color-q
          .back-btn
            position: absolute
            left: 0
            bottom: 5px
            display: block
            line-height: 12px
            width: 100%
            text-align: center
            font-size: 10px
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
              line-height: 40px
              border-radius: 20px
              color: $color-text
              background-color: $btn-clo
              font-size: 14px
              box-shadow: 0 4px 15px -4px #ccc
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
