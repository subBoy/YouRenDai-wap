<template>
  <div>
    <m-header :titleTxt="titleTxt" :isIndex="isIndex" :opcity="opcity"></m-header>
    <div class="recommend">
      <scroll
        class="recommend-content"
        ref="scroll"
        :data="disclist"
        :listenScroll="listenScroll"
        :probeType="probeType"
         @scroll="scroll"
      >
        <div>
          <div v-if="recommends.length" class="swiper-wrapper-c">
            <div class="swiper-content-c">
              <swiper>
                <div v-for="item in recommends" class="swiper-slide">
                  <a class="main-banner-link" :href="item.html_path">
                    <img class="main-img needsclick" @load="loadImage" :src="item.banner_url">
                  </a>
                </div>
              </swiper>
            </div>
          </div>
          <div class="recommed-group">
            <ul class="recommed-group-list">
              <li class="recommed-group-item">
                <router-link tag="div" to="/recommend/platform">
                  <div class="item-icons item-icons-1"></div>
                  <p class="item-text">了解平台</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <router-link tag="div" to="/recommend/packs">
                  <div class="item-icons item-icons-2">
                    <span class="item-new-num" v-if="hbNum > 0">{{hbNum}}</span>
                  </div>
                  <p class="item-text">现金红包</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <div @click="shareBack">
                  <div class="item-icons item-icons-3"></div>
                  <p class="item-text">分享返现</p>
                </div>
              </li>
              <li class="recommed-group-item">
                <div @click="latestNews">
                  <div class="item-icons item-icons-4">
                    <span class="item-new-num" v-if="newsNum > 0">{{newsNum}}</span>
                  </div>
                  <p class="item-text">最新消息</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="recommed-new-user">
            <div class="recommed-new-user-info">
              <p class="name">新手专享</p>
              <p class="desc"><span class="num">1888</span>元现金红包</p>
              <div class="reception-link" @click="reception">立即领取</div>
            </div>
          </div>
          <div class="project-wrapper">
            <h3 class="name">智甄投资
              <router-link class="list-btn" to="/product-list">查看更多</router-link>
              <span class="pro-bz"></span>
            </h3>
            <div v-if="disclist.length" class="slider-wrapper">
              <div class="slider-content">
                <div class="product-message-item swiper-slide swiper-no-swiping" v-for="item in disclist">
                  <p class="return"><span class="num">{{item.year_rate}}</span>%</p>
                  <div class="info">
                    <span class="desc">{{item.time_limit}}个月</span>
                    <span class="desc">剩余{{item.canrongzimoney}}元</span>
                    <span class="desc">{{item.minimum_investment}}元起投</span>
                  </div>
                  <div class="details-btn" @click="selectItem(item)">
                    <span class="btn-txt">立即投资</span>
                  </div>
                </div>
              </div>
            </div>
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
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import Swiper from 'base/swiper/swiper'
  import {_UA} from 'common/js/ua'
  import {getLoginState} from 'api/sign'
  import {getIndexData} from 'api/index'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        titleTxt: '',
        isIndex: true,
        listenScroll: true,
        recommends: [],
        disclist: [],
        checkLoaded: false,
        hbNum: 0,
        newsNum: 0,
        opcity: 0,
        probeType: 3
      }
    },
    created () {
      this._getIndexData()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    activated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      scroll (pos) {
        if (pos.y < 0) {
          this.opcity = Math.abs(pos.y / 44)
        } else {
          this.opcity = 0
        }
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
      },
      selectItem (item) {
        this.$router.push({
          path: `/recommend/subscribe/${item.project_id}`
        })
      },
      reception () {
        location.href = '/loan/activity/wap-novice.shtml'
      },
      latestNews () {
        getLoginState(this.changeLoginState).then((res) => {
          console.log('login:', res.isLogin)
          if (res.isLogin === 'true') {
            this.$router.push('/recommend/latest-news')
          } else {
            this.$router.push('/recommend/to-user')
          }
        })
      },
      shareBack () {
        if (this.changeLoginState !== '') {
          this.$router.push('/recommend/share-back')
        } else {
          this.changeReturnPath('/recommend/share-back')
          this.$router.push('/signIn')
        }
      },
      _getIndexData () {
        getIndexData(this.changeLoginState).then((res) => {
          if (res.ret_code === '1') {
            console.log('indexData:', res)
            const indexData = res.ret_set
            this.recommends = indexData.banner_list
            this.disclist.push(indexData.main_push_list[0])
            this.hbNum = indexData.wrrNum
            this.newsNum = indexData.memssageNum
          }
        })
      },
      ...mapActions([
        'changeReturnPath'
      ])
    },
    components: {
      MHeader,
      Scroll,
      Swiper,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .recommend
    position: fixed
    width: 100%
    top: 0
    bottom: 60px
    .recommend-content
      height: 100%
      overflow: hidden
      .swiper-wrapper-c
        position: relative
        width: 100%
        height: 0
        padding-top: 53%
        overflow: hidden
        .swiper-content-c
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .project-wrapper
        background-color: $color-text
        .name
          position: relative
          line-height: 18px
          padding: 25px 0
          font-size: $font-size-large
          text-align: center
          .list-btn
            extend-click()
            position: absolute
            right: 0
            top: 25px
            display: inline-block
            width: auto
            padding-right: 10px
            margin-right: 18px
            color: $color-q
            font-size: $font-size-small-s
            bg-image('more')
            background-size: 8px 10px
            background-position: right center
          .pro-bz
            position: absolute
            left: 20px
            top: 0px
            display: block
            padding-top: 6px
            line-height: 14px
            width: 30px
            height: 40px
            bg-image('ic-n')
            background-position: top center
            background-size: 30px 40px
            color: $color-text
            font-size: $font-size-small-s
            text-align: center
        .slider-wrapper
          position: relative
          padding-bottom: 30px
          .slider-content
            background: $color-text
            .product-message-item
              position: relative
              width: 100%
              text-align: center
              margin-bottom: 1px
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
                padding: 20px 0 30px 0
                font-size: $font-size-medium
                color: $btn-clo
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
                width: 172px
                height: 36px
                background-color: $btn-clo
                border-radius: 18px
                margin: 0 auto
                .btn-txt
                  display: block
                  position: absolute
                  left: 0
                  top: 50%
                  width: 100%
                  transform: translate3d(0, -50%, 0)
                  font-size: $font-size-medium-x
                  color: $color-text
                  text-align: center
      .scroll-ft-desc
        padding: 15px 0 20px 0
        text-align: center
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
        width: 100%
        .recommed-group-list
          margin-bottom: 5px;
          padding: 25px 20px;
          background-color: $color-text
          display: flex
          .recommed-group-item
            flex: 1
            text-align: center
            font-size: 0
            .item-icons
              position: relative
              display: inline-block
              margin: 0 auto
              width: 45px
              height: 45px
              background-size: 45px 45px
              .item-new-num
                position: absolute
                right: -8px
                top: -8px
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
              padding-top: 15px
              font-size: $font-size-small
              color: $color-tle
      .recommed-new-user
        margin-bottom: 5px
        background-color: $color-text
        padding: 18px 10% 18px 0
        bg-image('new-user')
        background-size: 90px 90px
        background-position: 90% center
        .recommed-new-user-info
          width: 200px
          text-align: center
          .name
            font-size: $font-size-small
            color: $color-tle
            padding-bottom: 8px
          .desc
            font-size: $font-size-large
            color: $color-tle
            padding-bottom: 15px
            .num
              color: $btn-clo
        .reception-link
          margin: 0 auto
          line-height: 30px
          width: 110px
          border-radius: 15px
          border: 1px solid $btn-clo
          color: $btn-clo
  .recommend-footer
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    box-shadow: 0px -1px 15px -2px #ccc
    height: 60px;
    background-color: $color-text
    .re-ft-item
      position: relative
      display: inline-block
      margin-top: 12px
      .item-txt
        display: inline-block
        padding-left: 18px
        line-height: 36px
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
        height: 36px
        text-align: center
        background-color: $btn-clo
        border-radius: 18px
        .item-txt
          bg-image('app')
          background-size: 15px auto
          color: $color-text
</style>
