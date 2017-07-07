<template>
  <div class="swiper-container swiper-y" id="swiper-y">
    <div class="swiper-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data () {
      return {
        mySwiper: ''
      }
    },
    created () {
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    methods: {
      _swiper () {
        this.mySwiper = new Swiper('#swiper-y', {
          paginationClickable: true,
          direction: 'vertical',
          spaceBetween: 0,
          loop: true
        })
      },
      nextSlide () {
        this.mySwiper.slideNext()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper-y
    width: 100%
    height: 221px
    .swiper-wrapper
      .product-message-item
        position: relative
        width: 100%
        text-align: center
        .pro-bz
          position: absolute
          left: 20px
          top: -4px
          display: block
          padding-top: 6px
          line-height: 14px
          width: 45px
          height: 53px
          bg-image('ic-n')
          background-position: top center
          background-size: 45px 53px
          color: $color-text
          font-size: $font-size-small-s
          text-align: center
        .name
          position: relative
          line-height: 18px
          padding: 30px 0
          font-size: $font-size-large
          text-align: center
          .list-btn
            extend-click
            position: absolute
            right: 0
            top: 30px
            display: inline-block
            width: auto
            padding-right: 20px
            color: $color-q
            font-size: $font-size-small-s
        .return
          padding-bottom: 25px
          font-size: $font-size-medium
          color: #fe7800
          .num
            font-size: 40px
        .info
          padding-bottom: 20px
          font-size: 0
          .desc
            display: inline-block
            padding: 0 10px
            font-size: $font-size-small-s
        .details-btn
          position: relative
          width: 50%
          height: 0
          margin: 0 auto
          padding-top: 7%
          bg-image('btn-bg')
          background-size: 100% auto
          .btn-txt
            display: block
            position: absolute
            left: 0
            top: 50%
            width: 100%
            transform: translate3d(0, -50%, 0)
            font-size: $font-size-medium
            color: $color-text
            text-align: center
</style>
