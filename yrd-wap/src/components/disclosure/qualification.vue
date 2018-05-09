<template>
  <div class="qualification-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <Scroll
      class="qualification-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
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
    data () {
      return {
        titleTxt: '公司资质',
        isShow: false,
        opcity: 1,
        disclist: [],
        listenScroll: true,
        probeType: 3
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
