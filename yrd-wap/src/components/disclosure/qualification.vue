<template>
  <div class="qualification-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll
      class="qualification-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
      :style="positionTop1"
    >
      <div class="scroll-group">
        <img src="./quali.jpg" @load="refresh" width="100%">
      </div>
    </Scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      isWap: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        titleTxt: '公司资质',
        isShow: false,
        opcity: 1,
        disclist: [],
        listenScroll: true,
        probeType: 3,
        positionTop1: 'top: 60px'
      }
    },
    created () {
      if (!this.isWap) {
        this.positionTop1 = 'top: 16px'
      } else {
        this.positionTop1 = 'top: 60px'
      }
    },
    activated () {
      this.refresh()
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.$refs.setScroll.refresh()
        }, 20)
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .qualification-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .qualification-group
      position: absolute
      top: 60px
      right: 15px
      bottom: 15px
      left: 15px
</style>
