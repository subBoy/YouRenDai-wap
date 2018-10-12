<template>
  <div class="cfn-letter-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll
      class="cfn-letter-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
      :style="positionTop1"
    >
      <div class="cfn-letter-ct">
        <img src="./banner5.jpg" class="cfn-letter-banner" @load="refresh" width="100%">
        <div class="scroll-group">
          <img src="./info.jpg" class="cfn-letter-ct-img" @load="refresh" width="90%">
          <div class="disclosure-hr"></div>
          <div class="disclosure-boos-qm">法定代表人签名：</div>
          <div class="disclosure-pm"></div>
        </div>
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
        titleTxt: '信批确认函',
        isShow: false,
        opcity: 1,
        disclist: [],
        listenScroll: true,
        probeType: 3,
        positionTop1: 'top: 44px'
      }
    },
    created () {
      if (!this.isWap) {
        this.positionTop1 = 'top: 0px'
      } else {
        this.positionTop1 = 'top: 44px'
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

  .cfn-letter-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .disclosure-pm
      width: 100%
      height: 20px
    .disclosure-hr
      width: 100%
      height: 1px
      background-color: #f0f0f0
    .disclosure-boos-qm
      display: flex
      align-items: center
      justify-content: flex-end
      margin: 20px 20px 0
      padding-right: 90px
      height: 36px
      background-position: right center 
      background-repeat: no-repeat
      background-size: 65px auto 
      background-image: url(./qm.png)
      font-size: 12px
    .cfn-letter-group
      position: absolute
      top: 60px
      right: 0
      bottom: 0
      left: 0
      .cfn-letter-ct
        padding-bottom: 20px
        .cfn-letter-banner
          margin-bottom: 20px
        .scroll-group
          margin: 0 auto
          width: 90%
          background-color: #fff
          border-radius: 15px
          box-shadow: 0px 0px 10px -2px #ccc
          .cfn-letter-ct-img
            margin: 0 auto
            padding: 20px 0
</style>
