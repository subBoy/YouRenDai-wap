<template>
  <div class="access-success-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="access-success-content">
      <div>
        <p class="desc-txt">{{descTxt}}</p>
        <div class="access-success-group">
          <div class="icon icon1"></div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'

  export default {
    props: {
      titleTxt: {
        type: String,
        default: ''
      },
      descTxt: {
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
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .access-success-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .access-success-content
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .desc-txt
        line-height: 24px
        padding: 30px 20px
        font-size: $font-size-large-z
        color: $color-tle
      .access-success-group
        margin: 0 20px
        background-color: $color-text
        .icon
          height: 168px
          background-repeat: no-repeat
          background-size: auto 120px
          background-position: center
          bg-image('su-ic')
</style>
