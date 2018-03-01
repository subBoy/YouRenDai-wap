<template>
  <div class="m-footer" :class="XNTime()">
    <div class="tab border-1px">
      <router-link tag="div" class="tab-item" to="/recommend" :class="{'link-active': activeIndex === 0}">
        <div class="tab-icon tab-icon-1"></div>
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/product-list" :class="{'link-active': activeIndex === 1}">
        <div class="tab-icon tab-icon-2"></div>
        <span class="tab-link">列表</span>
      </router-link>
      <div class="tab-item" @click="lookAssets" :class="{'link-active': activeIndex === 2}">
        <div class="tab-icon tab-icon-3"></div>
        <span class="tab-link">资产</span>
      </div>
      <router-link tag="div" class="tab-item" to="/user-center" :class="{'link-active': activeIndex === 3}">
        <div class="tab-icon tab-icon-4"></div>
        <span class="tab-link">我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  const STARTTIME = new Date('2018-02-09 17:00:00').getTime()
  const ENDTIME = new Date('2018-02-21 23:59:59').getTime()
  const NOWTIME = new Date().getTime()

  export default {
    props: {
      activeIndex: {
        type: Number,
        default: -1
      }
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      XNTime () {
        if (STARTTIME < NOWTIME && NOWTIME < ENDTIME) {
          return 'XN2018'
        }
        return ''
      },
      lookAssets() {
        if (this.changeLoginState === '') {
          this.changeReturnPath(this.$route.path)
          this.$router.push({
            path: '/signIn'
          })
          return
        }
        this.$router.push('/assets')
      },
      ...mapActions([
        'changeReturnPath'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-footer
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    &.XN2018
      bg-image('/static/img/xn-2018-7')
      background-size: 100% 50px
      background-position: center
      background-repeat: no-repeat
      .tab
        background: inherit
        .tab-item
          .tab-link
            color: #6c2311
          .tab-icon
            background-size: auto 24px
            &.tab-icon-1
              bg-image('/static/img/xn-2018-8-1')
            &.tab-icon-2
              bg-image('/static/img/xn-2018-9-1')
            &.tab-icon-3
              bg-image('/static/img/xn-2018-10-1')
            &.tab-icon-4
              bg-image('/static/img/xn-2018-11-1')
          &.link-active
            .tab-link
              color: #6c2311
            .tab-icon
              background-size: auto 26px
              &.tab-icon-1
                bg-image('/static/img/xn-2018-8')
              &.tab-icon-2
                bg-image('/static/img/xn-2018-9')
              &.tab-icon-3
                bg-image('/static/img/xn-2018-10')
              &.tab-icon-4
                bg-image('/static/img/xn-2018-11')
    .tab
      display: flex
      height: 50px
      background: $color-text
      border-1px(#f0f0f0)
      font-size: $font-size-small-s
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          display: block
          line-height: 12px
          padding: 3px 0
          color: $color-tle
        .tab-icon
          margin-top: 6px
          height: 25px
          background-size: auto 28px
          background-position: center
          &.tab-icon-1
            bg-image('index-not')
          &.tab-icon-2
            bg-image('list-not')
          &.tab-icon-3
            bg-image('zc-not')
          &.tab-icon-4
            bg-image('me-not')
        &.link-active
          .tab-link
            color: $color-theme
          .tab-icon
            background-size: auto 22px
            &.tab-icon-1
              bg-image('index-ok')
            &.tab-icon-2
              bg-image('list-ok')
            &.tab-icon-3
              bg-image('zc-ok')
            &.tab-icon-4
              bg-image('me-ok')
</style>
