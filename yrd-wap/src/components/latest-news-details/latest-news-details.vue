<template>
  <div class="notice-details-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="latest-news-details" ref="detailsScroll">
      <div class="news-details-content">
        <div class="details-content-wrapper">
          <h3 class="news-title border-1px-b">{{content.message_title}}</h3>
          <div class="txt-box">
            <p class="txt indent" v-html="content.message_content"></p>
            <div class="signature">
              <span class="signature-txt">{{content.mes_name}}<br/>{{content.create_date}}</span>
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
  import {readOneNews} from 'api/notice'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '消息详情',
        content_id: '',
        content: {}
      }
    },
    activated () {
      this._getNoticeDetails()
    },
    created() {
      this._getNoticeDetails()
    },
    compured: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      _getNoticeDetails() {
        this.receivesId = ''
        readOneNews(this.changeLoginState, this.receivesId, this.$route.params.messageId).then((res) => {
          if (res.ret_code === '1') {
            this.content = res.ret_set
            setTimeout(() => {
              this.$refs.detailsScroll.refresh()
            }, 20)
          }
          console.log('resss:', res)
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
    position: fixed;
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
      .news-details-content
        padding-top: 5px
        .details-content-wrapper
          padding: 0 20px
          background-color: $color-text
          .news-title
            line-height: 60px
            font-size: $font-size-medium-x
            color: $color-tle
            text-align: center
            border-1px-b(#f5f5f5)
          .txt-box
            padding-top: 12px
            .txt
              line-height: 22px
              font-size: $font-size-small
              color: #666
              &.indent
                text-indent: 2em
            .signature
                padding: 12px 0
                overflow: hidden
                .signature-txt
                  display: inline-block
                  float: right
                  line-height: 22px
                  font-size: 10px
                  color: #666
                  text-align: center
</style>
