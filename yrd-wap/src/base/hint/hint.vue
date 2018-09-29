<template>
  <transition name="hint-fade">
    <div class="hint" v-show="showFlag">
      <div class="hint-wrapper">
        <div class="hint-content">
          <p class="hint-text" v-html="hintDesc"></p>
          <div class="operate border-1px">
            <div class="operate-btn operate-btn-l" v-if="leftBtnTxt && leftBtnTxt !== ''"><span class="btn-box" @click.stop="close" v-html="leftBtnTxt"></span></div>
            <div class="operate-btn" v-if="rightBtnTxt && rightBtnTxt !== ''"><span class="btn-box" @click.stop="hint" v-html="rightBtnTxt"></span></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      hintDesc: {
        type: String,
        default: ''
      },
      leftBtnTxt: {
        type: String,
        default: ''
      },
      rightBtnTxt: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      hint () {
        this.hide()
        this.$emit('hint')
      },
      close () {
        this.hide()
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .hint
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    &.hint-fade-enter-active
      animation: hint-fadein 0.3s
      .hint-content
        animation: hint-zoom 0.3s
    .hint-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      overflow: hidden
      .hint-content
        width: 270px
        padding-top: 24px
        border-radius: 13px
        background: $color-text
        .hint-text
          padding-bottom: 24px
          line-height: 24px
          font-size: 12px
          color: #646464
        .operate
          display: flex
          border-1px(#f0f0f0)
          .operate-btn
            flex: 1
            display: flex
            justify-content: center
            align-items: center
            height: 40px
            .btn-box
              font-size: 12px
              color: #ff4e49
            &.operate-btn-l
              border-right: 1px solid #f0f0f0
              .btn-box
                color: #646464
  @keyframes hint-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes hint-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
