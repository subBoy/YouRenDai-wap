<template>
  <div class="disclosure-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'

  export default {
    data() {
      return {
        titleTxt: '信息披露',
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

  .disclosure-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
</style>
