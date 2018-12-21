<template>
  <div @touchmove.prevent>
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
            <div class="swiper-wrapper-sign"><img src="./sign.png" width="100%"></div>
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
                <router-link tag="div" to="/platform">
                  <div class="item-icons item-icons-1"></div>
                  <p class="item-text">了解平台</p>
                </router-link>
              </li>
              <li class="recommed-group-item">
                <router-link tag="div" to="/packs">
                  <div class="item-icons item-icons-2">
                    <span class="item-new-num-wrapper" v-if="hbNum > 0"><span class="item-new-num">{{hbNum}}</span></span>
                  </div>
                  <p class="item-text">现金红包</p>
                </router-link>
              </li>
              <!-- <li class="recommed-group-item">
                <div @click="shareBack">
                  <div class="item-icons item-icons-3"></div>
                  <p class="item-text">分享返现</p>
                </div>
              </li> -->
              <!-- <li class="recommed-group-item">
                <div @click="latestNews">
                  <div class="item-icons item-icons-4">
                    <span class="item-new-num-wrapper" v-if="newsNum > 0"><span class="item-new-num">{{newsNum}}</span></span>
                  </div>
                  <p class="item-text">最新消息</p>
                </div>
              </li> -->
              <!-- <li class="recommed-group-item">
                <div @click="gtKf">
                  <div class="item-icons item-icons-6"></div>
                  <p class="item-text">在线客服</p>
                </div>
              </li> -->
              <li class="recommed-group-item">
                <div @click="gtXszy">
                  <div class="item-icons item-icons-7"></div>
                  <p class="item-text">新手指引</p>
                </div>
              </li>
              <li class="recommed-group-item">
                <div @click="lookDis">
                  <div class="item-icons item-icons-5"> </div>
                  <p class="item-text">信息披露</p>
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
          <div class="project-wrapper" v-for="item in disclist">
            <h3 class="name border-1px-b">智甄出借
              <router-link class="list-btn" to="/product-list"></router-link>
              <!-- <span class="pro-bz" v-if="item.is_open === 'yes'"><span class="open-txt">{{item.content}}</span></span> -->
            </h3>
            <div class="slider-wrapper">
              <div class="slider-content">
                <div class="product-message-item swiper-slide swiper-no-swiping">
                  <div class="info">
                    <span class="desc hr-right">{{item.minimum_investment}}元起投</span>
                    <span class="desc">{{item.time_limit}}个月期限</span>
                  </div>
                  <p class="return"><span class="num">{{item.year_rate}}</span>%</p>
                  <div class="info">
                    <span class="desc max-ft">年化借款利率</span>
                  </div>
                  <div class="details-btn" @click="selectItem(item)">
                    <span class="btn-txt">立即出借</span>
                  </div>
                  <p class="index-loan-desc">
                    <span class="index-loan-desc-txt">账户资金由新网银行进行存管</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="index-new-add-box">
            <div class="index-new-add-ctr">
              <div class="idx-new-add-item" @click="gtYybg">
                <img src="./ic_25.jpg" width="100%">
              </div>
              <div class="idx-new-add-item" @click="investorNotice">
                <img src="./ic_27.jpg" width="100%">
              </div>
            </div>
          </div>
          <div class="scroll-ft-desc">
            <a href="/index.shtml?force=1" class="pc-link-btn">返回PC端</a>
            <p class="desc-txt">市场有风险，出借需谨慎</p>
            <p class="desc-txt">Copyright @ Reserved 2013</p>
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
    <a :href="alink" id="alink"></a>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
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
  import TopTip from 'base/top-tip/top-tip'

  import {_UA} from 'common/js/ua'
  import {getLoginState} from 'api/sign'
  import {getIndexData} from 'api/index'
  import {judgeIrNe} from 'api/user'
  import {mapGetters, mapActions} from 'vuex'

  // const STARTTIME = new Date('2018-02-09 17:00:00').getTime()
  // const ENDTIME = new Date('2018-02-21 23:59:59').getTime()
  // const NOWTIME = new Date().getTime()
  export default {
    data () {
      return {
        alink: '',
        titleTxt: '',
        topTipTxt: '',
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
          this.topTipTxt = '请使用浏览器打开！！！'
          this.$refs.topTip.show()
        } else {
          if (_UA.isIOS()) {
            this.alink = 'https://itunes.apple.com/cn/app/you-ren-dai/id923214967?mt=8'
          } else {
            this.alink = 'http://www.yourendai.com/app_download/YouRenDai.apk'
          }
          setTimeout(() => {
            document.getElementById('alink').click()
          }, 20)
        };
      },
      selectItem (item) {
        this.$router.push({
          path: `/subscribe/${item.project_id}`
        })
      },
      reception () {
        this.alink = '/loan/h5/tiro/tiro.shtml?=wap'
        setTimeout(() => {
          document.getElementById('alink').click()
        }, 20)
      },
      latestNews () {
        getLoginState(this.changeLoginState).then((res) => {
          if (res.isLogin === 'true') {
            this.$router.push('/latest-news')
          } else {
            this.$router.push('/to-user')
          }
        })
      },
      gtKf () {
        this.alink = '/loan/customer_service_wap.shtml'
        setTimeout(() => {
          document.getElementById('alink').click()
        }, 20)
      },
      gtXszy () {
        this.$router.push('/novice')
      },
      gtYybg () {
        this.$router.push('/disclosure/operate-data/report')
      },
      shareBack () {
        if (this.changeLoginState !== '') {
          this.$router.push('/share-back')
        } else {
          this.changeReturnPath('/share-back')
          this.$router.push('/signIn')
        }
      },
      investorNotice () {
        if (!this.changeLoginState) {
          this.changeReturnPath('/review-result')
          this.$router.push('/signIn')
          return
        }
        const _this = this
        judgeIrNe(_this.changeLoginState).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          if (res.ret_set.ans === 'n') {
            // this.topTipTxt = '今年评测次数已用完<br/>不可再继续评测'
            // this.$refs.topTip.show()
            this.$router.push('/review-result')
            return
          }
          this.$router.push('/investor-notice')
        })
      },
      lookDis () {
        this.$router.push('/disclosure')
      },
      _getIndexData () {
        getIndexData(this.changeLoginState).then((res) => {
          if (res.ret_code === '1') {
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
      Loading,
      TopTip
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
  .top-tip-desc
    padding: 10px 20px
    line-height: 20px
    font-size: 12px
    color: #fff
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
        .swiper-wrapper-sign
          position: absolute
          right: 15px
          bottom: 15px
          width: 95px
          z-index: 999
        .swiper-content-c
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .index-new-add-box
        padding: 20px 10px;
        background-color: #FFF
        .index-new-add-ctr
          display: flex
          .idx-new-add-item
            padding: 0 10px
            flex: 1
      .project-wrapper
        margin-bottom: 5px
        background-color: $color-text
        .name
          position: relative
          line-height: 18px
          padding: 25px 0 25px 40px
          font-size: $font-size-large
          font-weight: bold
          background-image: url('./ic_17.jpg')
          background-position: 15px center
          background-size: 18px 18px
          background-repeat: no-repeat
          border-1px-b(#f5f5f5)
          .list-btn
            display: block
            extend-click()
            position: absolute
            right: 0
            top: 50%
            width: 50px
            height: 50px
            transform: translateY(-50%)
            color: $color-q
            font-size: $font-size-small-s
            background-image: url('./more.png')
            background-repeat: no-repeat
            background-size: 14px auto
            background-position: center
          .pro-bz
            position: absolute
            left: 20px
            top: -3px
            display: block
            width: 45px
            height: 54px
            bg-image('ic-n')
            background-position: top center
            background-size: 45px 54px
            text-align: center
            .open-txt
              margin: 0 auto
              display: block
              padding-top: 5px
              line-height: 14px
              width: 26px
              color: $color-text
              font-size: $font-size-small-s
        .slider-wrapper
          position: relative
          padding-bottom: 30px
          .slider-content
            background: $color-text
            .product-message-item
              position: relative
              width: 100%
              text-align: center
              padding-top: 25px
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
                padding-bottom: 10px
                font-size: 18px
                color: $btn-clo
                .num
                  font-size: 50px
                  background: linear-gradient(to bottom, #ffd4d3, #ff4e49)
                  -webkit-background-clip: text
                  color: transparent
              .info
                padding-bottom: 20px
                font-size: 0
                .desc
                  display: inline-block
                  padding: 0 15px
                  font-size: 12px
                  color: #333
                  &.hr-right
                    position: relative
                    &:after
                      display: block
                      position: absolute
                      right: 0
                      top: 50%
                      transform: translateY(-50%)
                      width: 1px
                      height: 12px
                      content: ''
                      background-color: #f5f5f5
                  &.max-ft
                    font-size: 15px
                    color: #333
              .index-loan-desc
                padding-top: 10px
                text-align: center
                font-size: 0
                .index-loan-desc-txt
                  display: inline-block
                  line-height: 20px
                  font-size: 10px
                  padding-left: 22px
                  background-image: url('./ic_21.jpg')
                  background-repeat: no-repeat
                  background-size: 20px auto
                  background-position: left center
                  color: #333
              .details-btn
                display: flex
                justify-content: center
                align-items: center
                width: 120px
                height: 32px
                border-radius: 16px
                margin: 0 auto
                background-color: #ff4e49
                background-image: -moz-linear-gradient(top, #fea6a3, #ff4e49)
                background-image: -o-linear-gradient(top,#fea6a3, #ff4e49)
                background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fea6a3), to(#ff4e49))
                background-image: -webkit-linear-gradient(top, #fea6a3, #ff4e49);
                box-shadow: 0px 2px 20px -6px #ccc
                .btn-txt
                  width: 100%
                  font-size: 14px
                  padding-left: 2px
                  letter-spacing: 2px
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
        .pc-link-btn
          display: block
          text-align: center;
          line-height: 16px;
          font-size: $font-size-small-s
          color: #288cf0
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      .recommed-group
        width: 100%
        .recommed-group-list
          display: flex
          margin-bottom: 5px
          padding: 25px 20px
          background-color: $color-text
          .recommed-group-item
            flex: 1
            text-align: center
            font-size: 0
            .item-icons
              position: relative
              display: inline-block
              margin: 0 auto
              width: 65px
              height: 50px
              background-size: 65px 50px
              .item-new-num-wrapper
                position: absolute
                right: -8px
                top: -8px
                display: inline-block
                background-color: #ff5a00
                border-radius: 100%
                padding: 6px
                min-width: 16px
                color: $color-text
                font-size: $font-size-medium-x
                transform: scale(0.5)
              &.item-icons-1
                background-image: url('./lj.jpg')
              &.item-icons-2
                background-image: url('./xj.jpg')
              &.item-icons-3
                bg-image('fx')
              &.item-icons-4
                bg-image('zx')
              &.item-icons-5
                background-image: url('./xp.jpg')
              &.item-icons-6
                bg-image('kf')
              &.item-icons-7
                background-image: url('./novice.jpg')
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
