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
    height: 100%
    overflow: hidden
</style>
