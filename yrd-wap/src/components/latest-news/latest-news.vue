<template>
  <div class="latest-news-wrapper">
    <news :titleTxt="titleTxt" @readAllNews="readAllNews"></news>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import News from 'base/news/news'
  import {getLatestNews} from 'api/notice'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '最新消息',
        page: 1,
        rows: 5
      }
    },
    created () {
      this._getLatestNews()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      readAllNews () {
        console.log('readAllNews')
      },
      _getLatestNews () {
        getLatestNews(this.page, this.rows, this.changeLoginState).then((res) => {
          console.log(res)
        })
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
</style>
