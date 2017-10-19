<template>
  <div class="latest-news-wrapper">
    <news
      :titleTxt="titleTxt"
      :newsListArr="newsListArr"
      :hasMore="hasMore"
      :billLength="billLength"
      @readAllNews="readAllNews"
      @selected="selected"
      @newsList="newsListArr"
      @loadMore="loadMore"
    ></news>
    <div class="bill-air-wrapper" v-if="!billLength">暂无记录！！！</div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import News from 'base/news/news'
  import {getLatestNews, readAllNews} from 'api/notice'
  import {setMessageId, setCreateDate} from 'common/js/cache'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '最新消息',
        page: 1,
        rows: 10,
        hasMore: true,
        newsListArr: []
      }
    },
    created () {
      this._getLatestNews()
    },
    computed: {
      billLength () {
        if (this.newsListArr.length && this.newsListArr.length > 0) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      readAllNews () {
        console.log('readAllNews')
        readAllNews(this.changeLoginState).then((res) => {
          if (res.ret_code === '1') {
            console.log('readAllNews: ', res)
          }
        })
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }

        this.page++
        getLatestNews(this.page, this.rows, this.changeLoginState).then((res) => {
          console.log('news+1', res)
          if (res.ret_code === '1') {
            this.newsListArr = this.newsListArr.concat(res.ret_set)
            this._checkMore(res)
          }
        })
      },
      selected(item) {
        console.log('item:', item)
        if (item.message_type_name === '账单信息') {
          setMessageId(item.message_id)
          setCreateDate(item.create_date)
          this.$router.push({
            path: `${this.$route.path}/bill-details`
          })
        } else {
          this.$router.push({
            path: `/recommend/latest-news/latest-news-details/${item.message_id}`
          })
        }
      },
      _getLatestNews () {
        getLatestNews(this.page, this.rows, this.changeLoginState).then((res) => {
          if (res.ret_code === '1') {
            this.newsListArr = res.ret_set
            this._checkMore(res)
          }
          console.log('news:', res)
        })
      },
      _checkMore (data) {
        const rows = data.ret_set
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      }
    },
    components: {
      News
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .latest-news-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .bill-air-wrapper
      position: absolute
      top: 44px
      width: 100%
      line-height: 120px
      text-align: center
      font-size: 14px
      color: #999
</style>
