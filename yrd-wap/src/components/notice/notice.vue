<template>
  <transition name="slide">
    <div class="tran-ani">
      <m-header :titleTxt="titleTxt" :isShow="isShow" :isIndex="isIndex"></m-header>
      <div class="notice-wrapper" ref="noticeWrapper">
        <scroll class="notice-content" :data="nowList" :listen-scroll="listenScroll" :probe-type="probeType" @scroll="loadData" @touchend="startLoad">
          <div class="notice-group">
            <div class="notice-list">
              <a class="notice-item border-1px" v-for="(item, index) in nowList" ref="noticeItem" :href="item.content_url">
                <p class="name-title">
                  <span class="name" v-if="item.formatTitle.length">{{item.formatTitle}}</span>
                  <span class="desc" :class="{styl: !item.formatTitle.length}">{{item.formatDesc}}</span>
                </p>
                <p class="time">{{item.create_date}}</p>
              </a>
            </div>
            <loading :title="loadTitle" v-show="loadingState"></loading>
          </div>
          <loading v-show="!nowList.length"></loading>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getNoticeList} from 'api/notice'

  const DATA_LEN = 10

  export default {
    data () {
      return {
        titleTxt: '公告列表',
        loadTitle: '松手加载更多...',
        isShow: false,
        isIndex: false,
        noticeList: [],
        nowList: [],
        loadingState: false,
        proHeight: 0,
        clientHeight: 0,
        proPage: 0,
        nowPage: 0,
        scrollY: 0
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
      this._getNoticeList(1, DATA_LEN)
    },
    methods: {
      _getNoticeList (page, row) {
        getNoticeList(page, row).then((res) => {
          this.noticeList = res.notice
          this.proPage = Math.ceil(res.size / DATA_LEN)

          let _this = this
          for (let i = 0; i < _this.noticeList.length; i++) {
            let obj = {}

            let formatTxt = _this.noticeList[i].content_title
            if (formatTxt.indexOf('【') === 0 && formatTxt.indexOf('】') !== 0) {
              obj = {
                formatTitle: formatTxt.substr(0, formatTxt.indexOf('】') + 1),
                formatDesc: formatTxt.substr(formatTxt.indexOf('】') + 1)
              }
            } else {
              obj = {
                formatTitle: '',
                formatDesc: formatTxt
              }
            }

            _this.noticeList[i] = Object.assign(_this.noticeList[i], obj)
            _this.nowList.push(_this.noticeList[i])
          }
          console.log(_this.nowList)
          this.nowPage = this.nowPage - 0 + 1
          this.scrollY = 0
        })
      },
      startLoad () {
        if (this.scrollY >= 100) {
          if (this.nowPage < this.proPage) {
            let _page = this.nowPage - 0 + 1
            this._getNoticeList(_page, DATA_LEN)
          }
        } else {
          return
        }
      },
      loadData (pos) {
        let btY = -pos.y
        let intervalY = this.proHeight - this.clientHeight
        this.scrollY = btY - intervalY
        if (this.scrollY >= 50) {
          if (this.nowPage === this.proPage) {
            this.loadTitle = '已全部加载完毕！'
          }
          this.loadingState = true
        } else {
          this.loadingState = false
        }
      }
    },
    watch: {
      noticeList () {
        setTimeout(() => {
          let _this = this
          let height = 0
          this.clientHeight = this.$refs.noticeWrapper.clientHeight
          for (let i = 0; i < _this.$refs.noticeItem.length; i++) {
            let item = _this.$refs.noticeItem[i]
            height += (item.clientHeight - 0)
          }
          this.proHeight = height
        }, 20)
      }
    },
    components: {
      MHeader,
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tran-ani
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .notice-wrapper
    position: absolute
    width: 100%
    top: 44px
    bottom: 0
    .notice-content
      height: 100%
      overflow: hidden
      .notice-list
        margin-top: 5px
        min-height: 100%
        background: $color-text
        .notice-item
          display: block
          border-1px(#f0f0f0)
          padding: 16px 20px 15px 15px
          .name-title
            display: flex
            line-height: 18px
            color: $color-tle
            font-size: $font-size-medium
            .name
              flex: 0 0 90px
            .desc
              flex: 1
              &.styl
                padding-left: 8px
          .time
            line-height: 14px
            padding: 13px 0 0 10px
            font-size: $font-size-small
            color: $color-q
</style>
