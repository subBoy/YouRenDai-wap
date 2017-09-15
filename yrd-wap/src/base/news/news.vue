<template>
  <div class="news-template-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity">
      <span class="latest-news-btn" @click="readAll">全部已读</span>
    </m-header>
    <scroll class="latest-news-scroll">
      <div class="latest-news-group">
        <ul class="latest-news-list" ref="LatestNewsList">
          <li class="latest-news-item border-1px-b" @click="selectItem">
            <span class="remind"></span>
            <p class="name ellipsis">【账号信息】您本月账单已出，立即查看账单</p>
            <p class="time">2017-03-30 15:30:07</p>
          </li>
          <li class="latest-news-item border-1px-b">
            <span class="remind"></span>
            <p class="name ellipsis">【推广公告】关于加入密码设置通知</p>
            <p class="time">2017-03-30 15:30:07</p>
          </li>
          <li class="latest-news-item border-1px-b readed">
            <span class="remind"></span>
            <p class="name ellipsis">【系统消息】北京网贷风险控制及资金存管系统...</p>
            <p class="time">2017-03-30 15:30:07</p>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {addClass} from 'common/js/dom'

  export default {
    props: {
      titleTxt: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isShow: false,
        opcity: 1
      }
    },
    methods: {
      readAll () {
        let _child = this.$refs.LatestNewsList.children
        for (let i = 0; i < _child.length; i++) {
          addClass(_child[i], 'readed')
        }
        this.$emit('readAllNews')
      },
      selectItem () {
        this.$emit('selected')
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

  .news-template-wrapper
    position: absolute;
    top: 0
    right: 0
    bottom: 0
    left: 0
    .latest-news-btn
      position: absolute
      right: 0
      top: 0
      display: block
      padding: 0 20px
      line-height: 44px
      font-size: $font-size-medium
      color: $color-tle
      height: 44px
    .latest-news-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .latest-news-group
        padding: 5px 0
        .latest-news-list
          background-color: $color-text
          .latest-news-item
            position: relative
            padding: 10px 20px
            border-1px-b(#f5f5f5)
            .remind
              position: absolute
              left: 16px
              top: 24px
              display: block
              width: 5px
              height: 5px
              border-radius: 100%
              background-color: $btn-clo
            .name
              line-height: 34px
              font-size: $font-size-medium
              color: #color-tle
            .time
              padding-left: 10px
              line-height: 32px
              font-size: $font-size-small
              color: $color-q
            &.readed
              .remind
                background-color: $color-text
              .name
                color: $color-q
</style>
