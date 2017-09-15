<template>
  <div class="disclosure-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="disclosure-group">
      <div class="swiper-container" id="swiper-container01">
        <div class="swiper-wrapper" ref="swiperWrapper">
          <div class="swiper-slide">
            <img src="./disclosureBg1.jpg" class="bgPic">
            <img src="./yrdFont1.png" ref="slideOne" class="yrdPic1 content-img animated fadeIn">
          </div>
          <div class="swiper-slide">
            <img src="./disclosureBg2.jpg" class="bgPic">
            <img src="./yrdFont2.png" class="yrdPic2 content-img">
          </div>
          <div class="swiper-slide">
            <img src="./disclosureBg3.jpg" class="bgPic">
            <div class="swiperScont">
              <div class="swiper-container" id="swiper-container02">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="./yrdFont3.png" width="90%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./yrdFont4.png" width="90%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./yrdFont5.png" width="90%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./yrdFont6.png" width="80%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./yrdFont7.png" width="80%">
                  </div>
                </div>
              </div>
              <div class="swiper-button-next next-btn"></div>
              <div class="swiper-button-prev prev-btn"></div>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="./disclosureBg4.jpg" class="bgPic">
            <img src="./mouthBg.png" class="yrdPic3 content-img">
            <p class="mouthP1">8月运营报告</p>
            <router-link tag="a" class="lookbtn" to="/user-center/disclosure/report">
              <img src="./lookBtn.png" width="55%">
            </router-link>
          </div>
          <div class="swiper-slide">
            <img src="./disclosureBg5.jpg" class="bgPic">
            <div class="fileBox">
              <ul>
                <li>
                  <a href="">
                    <img src="./01.png" width="">
                    <p class="fileFont">网络借贷信息中介机构<br/>业务活动管理暂行办法</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="./02.png" width="">
                    <p class="fileFont">电子认证服务<br/>管理办法</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="./03.png" width="">
                    <p class="fileFont">借贷知识条款</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="./04.png" width="">
                    <p class="fileFont">风险提示条款</p>
                  </a>
                </li>
              </ul>
            </div>
            <img src="./overFont.png" class="overPic">
          </div>
        </div>
        <div class="swiper-button-next common-btn"></div>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import {addClass, removeClass} from 'common/js/dom'

  import 'animate.css/animate.css'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data() {
      return {
        titleTxt: '信息披露',
        isShow: false,
        opcity: 1,
        mySwiper: '',
        mySwiper2: ''
      }
    },
    created () {
      setTimeout(() => {
        this._swiper()
        this._swiper2()
      }, 20)
    },
    methods: {
      _swiper () {
        const _this = this
        this.mySwiper = new Swiper('#swiper-container01', {
          // loop: true,
          paginationClickable: true,
          direction: 'vertical',
          nextButton: '.common-btn',
          spaceBetween: 0,
          onSlideChangeStart: function(swiper) {
            removeClass(_this.$refs.slideOne, 'animated fadeIn fadeInLeft')
            let _index = swiper.activeIndex
            let _child = _this.$refs.swiperWrapper.children
            if (_index === 0) {
              addClass(_child[_index].children[1], 'animated fadeIn')
            } else if (_index === 1) {
              addClass(_child[_index].children[1], 'animated fadeInLeft')
            }
          }
        })
      },
      _swiper2 () {
        this.mySwiper2 = new Swiper('#swiper-container02', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn',
          prevButton: '.prev-btn'
        })
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .disclosure-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .disclosure-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
    .swiper-container
      width: 100%
      height: 100%
    .swiper-slide
      position: relative
      text-align: center
      font-size: 18px
      display: flex
      justify-content: center
      align-items: center
    .bgPic
      position: absolute
      left: 50%
      top: 0
      width: 100%
      height: auto
      min-height: 100%
      transform: translateX(-50%)
    .common-btn
      top: auto
      bottom: 20px
      margin-top: 0
      left: 50%
      margin-left: -15px
      width: 11px
      height: 50px
      background: url("upicon.png")
      background-size: 100% 100%
      animation: fade 2s linear infinite alternate
    @-wibkit-keyframes fade
        fromopacity: 0.1
        toopacity: 1
    @keyframes fade
        fromopacity: 0.1
        toopacity: 1
    .content-img
      position: absolute
      width: 90%
      left: 50%
      margin-left: -45%
      top: 38%
    .yrdPic1
      top: 45%
    .swiper-slide .animated.fadeIn
      animation-duration:3s
    .yrdPic2
      top: 30%
    .swiperScont
      position: absolute
      top: 38.5%
      width: 90%
      left: 50%
      transform: translateX(-50%)
    .swiperScont .next-btn
      background: url(rightSide.png) no-repeat
      background-size: 100% 100%
      width: 30px
      height: 30px
      animation: unset
      right: 0
      top: 38%
    .swiperScont .prev-btn
      background: url(leftSide.png) no-repeat
      background-size: 100% 100%
      width: 30px
      height: 30px
      animation: unset
      left: 0
      top: 38%
    .mouthP1
      position: absolute
      font-size: 18px
      color: #fff
      top: 49%
      width: 100%
      text-align: center
      transform: translateY(-50%)
    .lookbtn
      position: absolute
      top: 63%
      left: 50%
      transform: translateX(-50%)
      text-align: center
      img
        margin: 0 auto
    .fileBox
      position: absolute
      top: 50%
      width: 100%
      overflow: hidden
      left: 0
      transform: translateY(-50%)
    .fileBox ul li
      float: left
      width: 50%
    .fileBox ul li a
      display: block
      text-align: center
    .fileBox ul li a img
      display: block
      width: 50%
      margin: 0 auto
    .fileFont
      font-size: 12px
      color: #fff
      line-height: 20px
    .overPic
      width: 50%
      left: 50%
      position: absolute
      bottom: 50px
      transform: translateX(-50%)
</style>
