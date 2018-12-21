<template>
  <div class="safety-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll
      class="safety-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
      :style="positionTop1"
    >
      <div class="swiper-container" id="swiper-container" :style="wpH1">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="./safety-3.jpg" @load="refresh" width="100%">
          </div>
          <div class="swiper-slide">
            <img src="./safety-1.jpg" width="100%">
          </div>
          <div class="swiper-slide">
            <img src="./safety-2.jpg" width="100%">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    props: {
      isWap: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        titleTxt: '安全证书',
        isShow: false,
        opcity: 1,
        mySwiper: '',
        disclist: [],
        listenScroll: true,
        probeType: 3,
        wpH1: '',
        positionTop1: 'top: 16px'
      }
    },
    created () {
      if (!this.isWap) {
        this.positionTop1 = 'top: 16px'
      } else {
        this.positionTop1 = 'top: 60px'
      }
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    activated () {
      this.refresh()
    },
    methods: {
      refresh () {
        const _h = 902 * (window.innerWidth / 586)
        this.wpH1 = `height: ${_h}px`
        setTimeout(() => {
          this.$refs.setScroll.refresh()
        }, 20)
      },
      _swiper () {
        this.mySwiper = new Swiper('#swiper-container', {
          spaceBetween: 15,
          autoHeight: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
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

  .safety-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .safety-group
      position: absolute
      top: 60px
      right: 15px
      bottom: 15px
      left: 15px
      .swiper-slide
        display: block
        overflow: inherit
      .swiper-pagination
        position: fixed
        .swiper-pagination-bullet
          width: 15px
          height: 3px
          background-color: #ff4e49
          border-radius: 2px
</style>
