<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="80" cx="80" cy="80" fill="transparent"/>
      <circle class="progress-bar" r="80" cx="80" cy="80" fill="transparent" :style="styleTxt" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
      <circle class="progress-ba-1" :style="styleRotate" r="5" :cx="cx" :cy="cy" fill="#fff"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      radius: {
        type: Number,
        default: 160
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 160,
        degPercent: 0,
        sh: '',
        styleTxt: '',
        styleRotate: '',
        cx: 80,
        cy: 0
      }
    },
    created () {
      setTimeout(() => {
        this._degFuc()
      }, 20)
    },
    methods: {
      _degFuc () {
        this.sh = setInterval(this._ani, 30)
      },
      _ani () {
        this.degPercent = this.degPercent + 0.01
        if (this.degPercent >= this.percent) {
          this.degPercent = this.percent
          clearInterval(this.sh)
        }
        let _deg = -90 - this.degPercent * 360
        this.styleTxt = `transform: scale(0.9) rotate(${_deg}deg); -webkit-transform: scale(0.9) rotate(${_deg}deg)`
        this.styleRotate = `transform: scale(0.9) rotate(-${this.degPercent * 360}deg); -webkit-transform: scale(0.9) rotate(-${this.degPercent * 360}deg)`
      }

    },
    computed: {
      dashOffset() {
        return (1 - this.degPercent) * this.dashArray
      }
    },
    watch: {
      percent () {
        setTimeout(() => {
          this._degFuc()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 5px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: #ff7669
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-text
      &.progress-ba-1
        transform: scale(0.9) rotate(0deg)
        transform-origin: 80px 80px
        stroke: $color-text-l
</style>
