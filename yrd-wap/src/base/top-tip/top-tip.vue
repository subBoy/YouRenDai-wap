<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      delay: {
        type: Number,
        default: 1500
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
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .top-tip
    position: fixed
    top: 50%
    left: 50%
    background: rgba(0, 0, 0, 0.8)
    transform: translate3d(-50%, -50%, 0) scale(1)
    z-index: 99999
    opacity: 1
    text-align: center
    border-radius: 10px
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      opacity: 0
      transform: translate3d(-50%, -50%, 0) scale(0)
</style>
