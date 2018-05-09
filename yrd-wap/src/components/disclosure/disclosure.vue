<template>
  <div class="disclosure-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="disclosure-group">
      <div class="swiper-container" id="swiper-container01">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">公司简介</div>
              <img src="./disclosureBg.jpg" @load="setHeight" class="bgPic">
              <div class="ct-group">
                <img src="./ct-1.png" ref="slideOne" width="100%" :class="CN1">
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">组织架构</div>
              <img src="./disclosureBg.jpg" class="bgPic">
              <div class="ct-group">
                <img src="./ct-2.png" width="100%" :class="CN2">
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">公司高管</div>
              <img src="./disclosureBg.jpg" class="bgPic">
              <div class="ct-group">
                <div class="swiper-container" id="swiper-container02">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="./ct-3-1.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-2.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-3.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-4.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-5.png" width="100%">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-next next-btn"></div>
                <div class="swiper-button-prev prev-btn"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">月度运营报告</div>
              <img src="./disclosureBg.jpg" class="bgPic">
              <div class="ct-group">
                <img src="./ct-4.png" width="100%" >
                <p class="mouthP1">{{reportTitle}}</p>
                <a class="lookbtn" href="/loan/h5/app-report.shtml"></a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">监管文件</div>
              <img src="./disclosureBg.jpg" class="bgPic">
              <div class="ct-group">
                <div class="swiper-container" id="swiper-container03">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="./ct-5-1.png" width="100%">
                      <ul class="fileBox">
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/07.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/08.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/09.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/10.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/11.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/12.pdf"></a>
                        </li>
                      </ul>
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-5-2.png" width="100%">
                      <ul class="fileBox">
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/01.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/02.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/03.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/04.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/05.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/06.pdf"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="swiper-button-next next-btn-1"></div>
                <div class="swiper-button-prev prev-btn-1"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="ct-wrapper" :style="wpH">
              <div class="ct-title-wrapper">风控制度</div>
              <img src="./disclosureBg.jpg" class="bgPic">
              <div class="ct-group">
                <img src="./ct-6.png" width="100%">
                <ul class="fileBox">
                  <li>
                    <router-link tag="a" to="/user-center/disclosure/sadety"></router-link>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/13.pdf"></a>
                  </li>
                  <li>
                    <router-link tag="a" to="/user-center/disclosure/qualification"></router-link>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/15.pdf"></a>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/16.pdf"></a>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/14.pdf"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-next common-btn" v-show="nextOk"></div>
        <div class="swiper-button-prev common-btn-1" v-show="!nextOk"></div>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import {getDisclosure} from 'api/user'

  import 'animate.css/animate.css'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data () {
      return {
        titleTxt: '信息披露',
        isShow: false,
        opcity: 1,
        mySwiper: '',
        mySwiper2: '',
        mySwiper3: '',
        nextOk: true,
        CN1: 'animated fadeIn',
        CN2: '',
        wpH: 0,
        reportTitle: ''
      }
    },
    created () {
      this._getDisclosure()
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    methods: {
      setHeight () {
        const _h = 1246 * (window.innerWidth / 750)
        this.wpH = `height: ${_h}px`
      },
      _swiper () {
        const _this = this
        this.mySwiper = new Swiper('#swiper-container01', {
          paginationClickable: true,
          direction: 'vertical',
          nextButton: '.common-btn',
          prevButton: '.common-btn-1',
          spaceBetween: 0,
          onSlideChangeStart: function(swiper) {
            _this.CN1 = ''
            _this.CN2 = ''
            let _index = swiper.activeIndex
            _this.nextOk = true

            if (_index !== 2 && _this.mySwiper2) {
              _this.mySwiper2.slideTo(1, 0, false)
            }

            if (_index === 0) {
              _this.CN1 = 'animated fadeIn'
            } else if (_index === 1) {
              _this.CN2 = 'animated fadeInLeft'
            } else if (_index === 5) {
              _this.nextOk = false
            }
          }
        })
        this.mySwiper2 = new Swiper('#swiper-container02', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn',
          prevButton: '.prev-btn'
        })
        this.mySwiper3 = new Swiper('#swiper-container03', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn-1',
          prevButton: '.prev-btn-1'
        })
      },
      _getDisclosure () {
        getDisclosure().then((res) => {
          this.reportTitle = res.ret_set.titel
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
    background-color: #f3fdff
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
      overflow: hidden
    .ct-title-wrapper
      position: absolute
      top: 32.5%
      left: 0
      transform: translateY(-50%)
      line-height: 30px
      font-size: 15px
      color: #fe4c42
      width: 100%
      text-align: center
    .ct-wrapper
      position: relative
      margin-top: -10%
    .ct-group
      position: absolute
      top: 40%
      left: 5.5%
      width: 89%
      height: 45.4%
    .bgPic
      width: 100%
      height: auto
    .common-btn
      top: auto
      bottom: 10px
      margin-top: 0
      left: 50%
      margin-left: -15px
      width: 24px
      height: 23px
      background: url("next.png")
      background-size: 100% 100%
      animation: fade 2s linear infinite alternate
    .common-btn-1
      top: auto
      bottom: 10px
      margin-top: 0
      left: 50%
      margin-left: -15px
      width: 24px
      height: 23px
      background: url("prev.png")
      background-size: 100% 100%
      animation: fade 2s linear infinite alternate
    @-wibkit-keyframes fade
        from
          opacity: 0.1
        to
          opacity: 1
    @keyframes fade
        from
          opacity: 0.1
        to
          opacity: 1
    .swiper-slide .animated.fadeIn
      animation-duration:3s
    .ct-group .next-btn, .ct-group .next-btn-1
      background: url("next-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      right: 0
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .ct-group .prev-btn, .ct-group .prev-btn-1
      background: url("prev-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .mouthP1
      display: block
      position: absolute
      font-size: 18px
      color: #fff
      left: 50%
      top: 37%
      width: 100%
      text-align: center
      transform: translate3d(-50%, -50%, 0)
    .lookbtn
      display: block
      position: absolute
      top: 85%
      left: 50%
      width: 50%;
      height: 20%;
      transform: translate3d(-50%, -50%, 0)
      text-align: center
    .fileBox
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
    .fileBox li
      float: left
      width: 50%
      height: 33.333%;
    .fileBox li a
      display: block
      width: 100%
      height: 100%;
</style>
