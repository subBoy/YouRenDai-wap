<template>
  <div class="notice-details-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="latest-news-details" ref="detailsScroll">
      <div class="news-details-group">
        <div class="news-details-wrapper">
          <div class="news-details-title">{{content.contentTitle}}</div>
          <div class="news-details-content">
            <p class="news-details-content-txt" v-html="content.content"></p>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getNoticeDetails} from 'api/notice'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '平台公告',
        content_id: '',
        content: {}
      }
    },
    activated () {
      this._getNoticeDetails()
    },
    created() {
      setTimeout(() => {
        this._getNoticeDetails()
      }, 20)
    },
    methods: {
      _getNoticeDetails() {
        this.content_id = this.$route.params.id
        getNoticeDetails(this.content_id).then((res) => {
          this.content = res.ret_set
          setTimeout(() => {
            this.$refs.detailsScroll.refresh()
          }, 20)
        })
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .notice-details-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .latest-news-details
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .news-details-group
          padding: 10px 20px
        .news-details-wrapper
          border-radius: 10px
          background-color: #fff
          box-shadow: 0 0 4px -1px #ccc
        .news-details-title
          line-height: 16px
          padding: 20px 0
          text-align: center
          font-size: 16px
          color: #333
          border-bottom: 1px solid #f0f0f0
        .news-details-content
          padding: 15px 0
        .news-details-content-txt
          padding: 0 10px
          line-height: 24px
          font-size: 12px
          color: #666
          text-indent: 2em
        .news-details-signature
          padding: 20px 0 40px 0
        .details-signature-txt
          overflow: hidden
        .signature-txt
          display: block
          width: 110px
          float: right
          text-align: center
          line-height: 24px
          font-size: 12px
          color: #666
        .latest-news-details img
          width: 100%
</style>
