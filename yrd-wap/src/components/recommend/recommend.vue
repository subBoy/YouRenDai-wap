<template>
  <div>
    <m-header :titleTxt="titleTxt" :isIndex="isIndex"></m-header>
    <div class="recommend">
      <scroll class="recommend-content" ref="scroll" :data="disclist">
        <div>
          <div v-if="recommends.length" class="swiper-wrapper-c">
            <div class="swiper-content-c">
              <swiper>
                <div v-for="item in recommends" class="swiper-slide">
                  <a :href="item.html_path">
                    <img class="main-img needsclick" @load="loadImage" :src="item.banner_url">
                  </a>
                </div>
              </swiper>
            </div>
          </div>
          <div class="recommed-group">
            <ul class="recommed-group-list">
              <li class="recommed-group-item">
                <router-link tag="div" to="/aboutUs">
                  <div class="item-icons item-icons-1"></div>
                  <p class="item-text">了解平台</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <router-link tag="div" to="/aboutUs">
                  <div class="item-icons item-icons-2">
                    <span class="item-new-num">{{hbNum}}</span>
                  </div>
                  <p class="item-text">现金红包</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <router-link tag="div" to="/aboutUs">
                  <div class="item-icons item-icons-3"></div>
                  <p class="item-text">分享返现</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <router-link tag="div" to="/aboutUs">
                  <div class="item-icons item-icons-4">
                    <span class="item-new-num">{{newsNum}}</span>
                  </div>
                  <p class="item-text">最新消息</p>
                </router-link>
              </li>
            </ul>
          </div>
          <router-link tag="div" class="recommed-new-user" to="/new-user-activity"></router-link>
          <div v-if="disclist.length" class="slider-wrapper">
            <div class="slider-content">
              <slider ref="slider">
                <div class="product-message-item swiper-slide" v-for="item in disclist">
                  <span class="pro-bz">中秋<br/>专享</span>
                  <h3 class="name">
                    智甄投资
                    <router-link class="list-btn" to="/product-list">查看更多</router-link>
                  </h3>
                  <p class="return"><span class="num">{{item.year_rate}}</span>%</p>
                  <div class="info">
                    <span class="desc">{{item.limit_month}}个月</span>
                    <span class="desc">剩余{{item.balance}}元</span>
                    <span class="desc">{{item.minimum_investment}}元起投</span>
                  </div>
                  <router-link tag="div" class="details-btn" to="/details">
                    <span class="btn-txt">立即投资</span>
                  </router-link>
                  <div class="next-btn"></div>
                </div>
              </slider>
            </div>
          </div>
          <div class="slider-next-btn">
            <span class="btn-bg" @click="nextPro"></span>
          </div>
          <div class="scroll-ft-desc">
            <p class="desc-txt">Copyright @ Reserved 2013 </p>
            <p class="desc-txt">有人贷创建于贰零壹叁年 @ 2013 安信卓越版权所有</p>
          </div>
        </div>
        <div class="loading-container" v-show="!disclist.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
    <div class="recommend-footer border-1px">
      <div class="re-ft-item item-l">
        <a class="item-txt icon-1" href="tel:400-663-9190">400-663-9190</a>
      </div>
      <div class="re-ft-item item-r" @click="downLoadApp">
        <a class="item-txt icon-2">下载有人贷客户端</a>
      </div>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import Swiper from 'base/swiper/swiper'
  import Slider from 'base/slider/slider'
  import {getRecommendBanner, getRecommendPro} from 'api/recommend'
  import {_UA} from 'common/js/ua'

  export default {
    data () {
      return {
        titleTxt: '有人贷',
        isIndex: true,
        recommends: [],
        disclist: [],
        checkLoaded: false,
        hbNum: 0,
        newsNum: 0
      }
    },
    created () {
      this._getRecommendBanner()
      this._getRecommendPro()
    },
    methods: {
      _getRecommendBanner () {
        getRecommendBanner().then((res) => {
          this.recommends = res.bannerList
        })
      },
      _getRecommendPro () {
        getRecommendPro().then((res) => {
          this.disclist = res.allArray
        })
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      nextPro () {
        this.$refs.slider.nextSlide()
      },
      downLoadApp () {
        if (_UA.isWeixin()) {
          window.alert('请使用浏览器打开！！！')
        } else {
          if (_UA.isIOS()) {
            location.href = 'https://itunes.apple.com/cn/app/you-ren-dai/id923214967?mt=8'
          } else {
            location.href = 'http://www.yourendai.com/app_download/YouRenDai.apk'
          }
        };
      }
    },
    components: {
      MHeader,
      Slider,
      Scroll,
      Swiper,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .recommend
    position: fixed
    width: 100%
    top: 44px
    bottom: 60px
    .recommend-content
      height: 100%
      overflow: hidden
      .swiper-wrapper-c
        position: relative
        width: 100%
        height: 0
        padding-top: 42.5%
        overflow: hidden
        background: $color-text
        .swiper-content-c
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .slider-wrapper
        position: relative
        border-top: 5px solid $color-background
        width: 100%
        height: 220px
        overflow: hidden
        background: $color-text
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          .product-message-item
            position: relative
            width: 100%
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
                padding-right: 10px
                margin-right: 18px
                color: $color-q
                font-size: $font-size-small-s
                bg-image('more')
                background-size: 8px 10px
                background-position: right center
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
      .slider-next-btn
        height: 45px
        background-color: $color-text
        .btn-bg
          display: block
          margin: 0 auto
          extend-click()
          width: 18px
          height: 19px
          bg-image('next')
          background-size: 18px 19px
      .scroll-ft-desc
        padding: 16px 0
        text-align: center
        background-color: $color-text
        border-1px(#f0f0f0)
        .desc-txt
          width: 200%
          line-height: 16px
          font-size: $font-size-medium-x
          transform: scale(0.5) translate3d(-50%, 0, 0)
          color: $color-q
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      .recommed-group
        background-color: $color-text
        padding-top: 10px
        .recommed-group-list
          display: flex
          .recommed-group-item
            flex: 1
            text-align: center
            font-size: 0
            .item-icons
              position: relative
              display: inline-block
              margin: 0 auto
              width: 60px
              height: 60px
              background-size: 60px 60px
              .item-new-num
                position: absolute
                right: 0
                top: -2px
                display: inline-block
                background-color: #ff5a00
                border-radius: 100%
                padding: 6px
                color: $color-text
                font-size: $font-size-medium-x
                transform: scale(0.5)
                min-width: 18px
                height: 18px
                text-align: center
                line-height: 18px
              &.item-icons-1
                bg-image('lj')
              &.item-icons-2
                bg-image('xj')
              &.item-icons-3
                bg-image('fx')
              &.item-icons-4
                bg-image('zx')
            .item-text
              font-size: $font-size-small
              color: $color-tle
      .recommed-new-user
        background-color: $color-text
        padding-top: 40%
        bg-image('new-user')
        background-position: center
        background-size: 86% auto
  .recommend-footer
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    box-shadow: 0px -1px 1px -1px #f0f0f0
    height: 60px;
    background-color: $color-text
    .re-ft-item
      position: relative
      display: inline-block
      padding-top: 10px
      .item-txt
        display: inline-block
        padding-left: 18px
        line-height: 40px
        background-position: left center
        font-size: $font-size-medium
      &.item-l
        float: left
        margin-left: 16px
        .item-txt
          bg-image('tel')
          background-size: 13px auto
          color: $color-theme
      &.item-r
        float: right
        margin-right: 16px
        width: 170px
        height: 41px
        bg-image('dl')
        background-size: 170px auto
        background-position: 0px 10px
        text-align: center
        .item-txt
          bg-image('app')
          background-size: 15px auto
          color: $color-text
</style>
