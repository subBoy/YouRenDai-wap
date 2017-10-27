<template>
  <div class="news-template-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity">
      <span class="latest-news-btn" @click="readAll">全部已读</span>
    </m-header>
    <scroll class="latest-news-scroll" v-if="billLength"
      :data="newsListArr"
      :pullup="pullup"
      @scrollToEnd="startLoad"
    >
      <div class="latest-news-group">
        <ul class="latest-news-list" ref="LatestNewsList">
          <li class="latest-news-item border-1px-b" v-for="(item, index) in newsListArr" :class="{'readed': item.status === '1' || !item.status}" @click="selectItem(item, index)">
            <span class="remind"></span>
            <p class="name ellipsis">【{{item.message_type_name}}】{{formartTitle(item)}}</p>
            <p class="time">{{item.create_date}}</p>
          </li>
        </ul>
        <loading :title="loadTitle" v-show="hasMore"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {addClass} from 'common/js/dom'

  export default {
    props: {
      titleTxt: {
        type: String,
        default: ''
      },
      newsListArr: {
        type: Array,
        default: []
      },
      billLength: {
        type: Boolean,
        default: true
      },
      hasMore: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        pullup: true,
        isShow: false,
        loadTitle: '正在加载更多...',
        opcity: 1
      }
    },
    activated () {
      this.$emit('newsList')
    },
    created () {
      this.$emit('newsList')
    },
    methods: {
      readAll () {
        if (!this.newsListArr.length || this.newsListArr.length === 0) return
        let _child = this.$refs.LatestNewsList.children
        for (let i = 0; i < _child.length; i++) {
          addClass(_child[i], 'readed')
        }
        this.$emit('readAllNews')
      },
      selectItem (item, index) {
        let _child = this.$refs.LatestNewsList.children
        addClass(_child[index], 'readed')
        this.$emit('selected', item)
      },
      startLoad() {
        this.$emit('loadMore')
      },
      formartTitle(item) {
        let month = item.create_date.split('-')[1] + ''
        const dan = month.substring(0, 1)

        if (dan < 1) {
          month = month.substring(1, 2)
        }

        if (item.message_type_name === '账单信息') {
          return `${month}月${item.message_title}`
        } else {
          return `${item.message_title}`
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
