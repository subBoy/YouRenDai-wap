<template>
  <div class="m-footer">
    <div class="tab border-1px">
      <router-link tag="div" class="tab-item" to="/recommend">
        <div class="tab-icon tab-icon-1"></div>
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/product-list">
        <div class="tab-icon tab-icon-2"></div>
        <span class="tab-link">列表</span>
      </router-link>
      <div class="tab-item" @click="lookAssets">
        <div class="tab-icon tab-icon-3"></div>
        <span class="tab-link">资产</span>
      </div>
      <router-link tag="div" class="tab-item" to="/user-center">
        <div class="tab-icon tab-icon-4"></div>
        <span class="tab-link">我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
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
          margin-top: 6px;
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
        &.router-link-active
          .tab-link
            color: $color-theme
          .tab-icon
            &.tab-icon-1
              bg-image('index-ok')
            &.tab-icon-2
              bg-image('list-ok')
            &.tab-icon-3
              bg-image('zc-ok')
            &.tab-icon-4
              bg-image('me-ok')
</style>
