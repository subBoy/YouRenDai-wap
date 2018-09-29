<template>
  <div class="novice-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap"></m-header>
    <scroll class="novice-group" ref="noviceScroll" :style="positionTop">
      <div class="novice-content">
        <div class="novice-banner">
          <img src="./banner.jpg" @load="refresh" width="100%">
        </div>
        <div class="novice-content-box">
          <div class="novice-content-item">
            <div class="ne-ct-im-tle border-1px-b">
              <span class="ne-ct-im-tle-txt">我们是有人贷</span>
            </div>
            <div class="nect-item-1-desc">有人贷通过创新业务模式和风控模式，不断提高大数据应用能力，为用户提供安全的、高效的互联网金融服务，银行级风控体系、新网银行资金存管系统、高级别的信息安全系统为用户提供全方位保障的安全在线出借体验。</div>
            <div class="nect-item-1-img">
              <span class="img-box">
                <img class="nect-it1-img" @load="refresh" src="./ig-1.jpg" width="80%">
              </span>
              <span class="img-box">
                <img class="nect-it1-img" src="./ig-2.jpg" width="80%">
              </span>
            </div>
          </div>
          <div class="novice-content-item">
            <div class="ne-ct-im-tle border-1px-b">
              <span class="ne-ct-im-tle-txt">我可以出借哪些项目</span>
            </div>
            <div class="nect-item-2-desc">目前平台可出借三种期限标的，3个月、6个月、12个月</div>
            <div class="nect-item-1-img nect-item-2-img">
              <span class="img-box">
                <img @load="refresh" src="./ig-3.jpg" width="100%">
              </span>
            </div>
          </div>
          <div class="novice-content-item nectit3">
            <div class="ne-ct-im-tle border-1px-b">
              <span class="ne-ct-im-tle-txt">如何出借</span>
            </div>
            <div class="nect-item-2-desc">
              <img src="./ig-4.jpg" width="100%">
            </div>
            <div class="nect-item-swiper">
              <div class="swiper-container" id="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img @load="swiperLoad" src="./it-1.jpg" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./it-2.jpg" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./it-3.jpg" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./it-4.jpg" width="100%">
                  </div>
                </div>
              </div>
              <div class="swiper-button-next next-btn"></div>
              <div class="swiper-button-prev prev-btn"></div>
            </div>
          </div>
          <div class="novice-content-item">
            <div class="ne-ct-im-tle border-1px-b">
              <span class="ne-ct-im-tle-txt">立即注册</span>
            </div>
            <div class="nect-item-2-desc">
              <img src="./ig-5.jpg" width="100%">
              <div class="nect-item-sign-btn">
                <div class="nect-item-sign-btn-item" @click="gtSignUp"></div>
                <div class="nect-item-sign-btn-item" @click="gtSignIn"></div>
              </div>
            </div>
            <div class="nect-item-4-tle">多平台使用</div>
            <div class="nect-item-4-desc">有人贷已推出IOS  安卓  微信等多个平台工具供用户使用</div>
            <div class="nect-item-1-img nect-item-4-img">
              <span class="img-box">
                <img @load="refresh" class="cectim4-img" src="./ercd-1.jpg" width="100%">
              </span>
              <span class="img-box">
                <img class="cectim4-img" src="./ercd-2.jpg" width="100%">
              </span>
              <span class="img-box">
                <img class="cectim4-img" src="./ercd-3.jpg" width="100%">
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  let android
  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '新手指引',
        mySwiper: '',
        isWap: false,
        positionTop: 'top: 0px'
      }
    },
    created () {
      const pathVal = this.$route.path
      if (pathVal.indexOf('app') >= 0) {
        this.isWap = false
        this.positionTop = 'top: 0px'
      } else {
        this.positionTop = 'top: 44px'
        this.isWap = true
      }
    },
    mounted () {
      window['gotoLogin'] = () => {
        android.gotoLogin()
      }
    },
    methods: {
      gtSignUp () {
        if (this.isWap) {
          this.$router.push('/signUp')
          return
        }
        window.gotoLogin()
      },
      gtSignIn () {
        if (this.isWap) {
          this.$router.push('/signUp')
          return
        }
        window.gotoLogin()
      },
      refresh () {
        this.$refs.noviceScroll.refresh()
      },
      swiperLoad () {
        this._swiper()
        this.$refs.noviceScroll.refresh()
      },
      _swiper () {
        this.mySwiper = new Swiper('#swiper-container', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn',
          prevButton: '.prev-btn'
        })
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" stylesheet="type/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .novice-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .novice-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .novice-content-box
        padding: 20px 0 10px 0
        margin: 0 auto
        width: 90%
        .novice-content-item
          margin-bottom: 20px 
          background-color: $color-text
          border-radius: 10px
          box-shadow: 0px 0px 10px -5px #ccc
          &.nectit3
            padding-bottom: 15px
          .ne-ct-im-tle
            line-height: 30px
            border-1px-b(#f9f9f9)
            .ne-ct-im-tle-txt
              display: block
              position: relative
              padding-left: 32px
              font-size: 12px
              color: #323232
              letter-spacing: 2px
              &:before
                display: block
                position: absolute
                top: 50%
                left: 20px
                width: 2px
                height: 12px
                transform: translateY(-50%)
                background-color: #ff4e49
                content: ''
          .nect-item-1-desc
            padding: 15px 0 10px
            margin: 0 auto
            line-height: 20px
            width: 80%
            font-size: 10px
            color: #646464
          .nect-item-1-img
            display: flex
            margin: 0 auto
            padding-bottom: 10px
            width: 90%
            &.nect-item-2-img
              padding-bottom: 15px
            .img-box
              flex: 1
              text-align: center
              .nect-it1-img
                margin: 0 auto
          .nect-item-2-desc
            position: relative
            padding: 5px 0 10px
            margin: 0 auto
            line-height: 20px
            width: 90%
            font-size: 10px
            color: #646464
            .nect-item-sign-btn
              display: flex
              position: absolute
              top: 50%
              right: 0
              bottom: 15%
              left: 0
              .nect-item-sign-btn-item
                flex: 1
          .nect-item-swiper
            position: relative
            margin: 0 auto
            width: 76%
            .swiper-button-next
              right: -18.5%
              margin-right: 14px
              background-image: url(next-1.png)
              background-size: 8px 16px
            .swiper-button-prev
              left: -18.5%
              margin-left: 14px
              background-image: url(prev-1.png)
              background-size: 8px 16px
          .nect-item-4-tle
            padding-top: 15px
            margin: 0 auto
            line-height: 18px
            width: 90%
            font-size: 10px
            color: #323232
          .nect-item-4-desc
            padding-bottom: 10px
            margin: 0 auto
            line-height: 18px
            width: 90%
            font-size: 9px
            color: #646464
</style>
