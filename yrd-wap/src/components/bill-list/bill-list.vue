<template>
  <div class="bill-list-wrapper">
    <news v-if="billLength" :titleTxt="titleTxt" @readAllNews="readAllNews" @selected="selected"></news>
    <div class="bill-air-wrapper" v-else></div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import News from 'base/news/news'

  export default {
    data() {
      return {
        titleTxt: '账单信息',
        billLength: true
      }
    },
    methods: {
      readAllNews () {
        console.log('readAllNews')
      },
      selected () {
        this.$router.push('/assets/bill-list/bill-details')
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
  .bill-list-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
</style>
