<template>
  <div class="invite-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity">
      <div class="invite-recored-btn">记录</div>
    </m-header>
    <div class="invite-group">
      <img src="./invite-bg.jpg" width="100%">
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'

  export default {
    data() {
      return {
        titleTxt: '邀请好友',
        isShow: false,
        opcity: 1
      }
    },
    methods: {
      loadMore () {

      }
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .invite-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .invite-recored-btn
      position: absolute
      right: 0
      top: 0
      padding: 0 20px
      line-height: 44px
      font-size: $font-size-small
      color: $color-tle
    .invite-group
      position: absolute
      top: 49px
      right: 0
      bottom: 0
      left: 0
      background-color: $color-text
</style>
