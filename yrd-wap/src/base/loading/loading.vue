<template>
  <div class="loading">
    <img class="loading-icon" width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    padding-top: 10px
    text-align: center
    .loading-icon
      margin: 0 auto
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-tle
</style>
