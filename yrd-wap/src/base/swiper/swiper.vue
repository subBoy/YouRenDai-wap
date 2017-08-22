<template>
  <div>
    <div class="swiper-container swiper-x" id="swiper-x">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
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
        this.mySwiper = new Swiper('#swiper-x', {
          loop: true,
          autoplay: 40000,
          pagination: '.swiper-pagination',
          // slidesPerView: 'auto',
          // centeredSlides: !0,
          // watchSlidesProgress: !0,
          // paginationClickable: !0,
          autoplayDisableOnInteraction: false,
          spaceBetween: 0
          // onProgress: function(a) {
          //   var b, c, d, scale, es
          //   for (b = 0; b < a.slides.length; b++) {
          //     c = a.slides[b]
          //     d = c.progress
          //     scale = 1 - Math.min(Math.abs(0.15 * d), 1)
          //     es = c.style
          //     es.opacity = 1 - Math.min(Math.abs(d / 2), 1)
          //     es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0px, 0,' + -Math.abs(150 * d) + 'px)'
          //     es.webkitTransform = 'scale(' + scale + ')'
          //     es.transform = 'scale(' + scale + ')'
          //   }
          // },
          // onSetTransition: function(a, b) {
          //   for (let c = 0; c < a.slides.length; c++) {
          //     let es = a.slides[c].style
          //     es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + 'ms'
          //   }
          // }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .swiper-x
    width: 100%
    -webkit-perspective: 1200px
    -moz-perspective: 1200px
    -ms-perspective: 1200px
    perspective: 1200px
    .swiper-slide
      // width: 70%
      width: 100%
      -webkit-transform-style: preserve-3d
      -moz-transform-style: preserve-3d
      -ms-transform-style: preserve-3d
      transform-style: preserve-3d
      .main-banner-link
        display: block
        position: relative
        padding-top: 53.333333%
        width: 100%
        height: 0
        .main-img
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
          margin: 0 auto
          display: block
          box-shadow: 0 0 20px -1px #ccc
    .swiper-pagination-bullet-active
      background-color: #fff
</style>
