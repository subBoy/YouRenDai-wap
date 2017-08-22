<template>
  <transition name="slide">
    <div class="tran-ani">
      <m-header :titleTxt="titleTxt" :isShow="isShow" :isIndex="isIndex"></m-header>
      <div class="notice-wrapper">
        <scroll class="notice-content"
          :data="nowList"
          :pullup="pullup"
          @scrollToEnd="startLoad"
        >
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
            <loading :title="loadTitle" v-show="hasMore"></loading>
          </div>
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
        page: 1,
        pullup: true,
        hasMore: true,
        titleTxt: '公告列表',
        loadTitle: '松手加载更多...',
        isShow: false,
        isIndex: false,
        nowList: []
      }
    },
    created () {
      this._getNoticeList()
    },
    methods: {
      _getNoticeList () {
        this.page = 1
        this.hasMore = true
        getNoticeList(this.page, DATA_LEN).then((res) => {
          this.nowList = this._genResult(res.notice)
          this._checkMore(res)
        })
      },
      startLoad () {
        if (!this.hasMore) {
          return
        }

        this.page++
        getNoticeList(this.page, DATA_LEN).then((res) => {
          this.nowList = this.nowList.concat(this._genResult(res.notice))
          this._checkMore(res)
        })
      },
      _genResult (data) {
        let ret = []

        for (let i = 0; i < data.length; i++) {
          let obj = {}

          let formatTxt = data[i].content_title
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

          ret.push(Object.assign(data[i], obj))
        }

        return ret
      },
      _checkMore (data) {
        const rows = data.notice
        if (!rows.length || (this.nowList.length >= data.size)) {
          this.hasMore = false
        }
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
    z-index: 9999
    background: $color-text
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
