<template>
  <div class="foot-btn-wrapper">
    <div class="access-btn-wapper border-1px">
      <div class="access-btn" @click="submitFuc">{{submitBtnTxt}}</div>
      <slot name="fb"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      submitBtnTxt: {
        type: String,
        default: ''
      }
    },
    methods: {
      submitFuc() {
        this.$emit('submitFuc')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .foot-btn-wrapper
    .access-btn-wapper
      border-1px(#f5f5f5)
      position: absolute
      left: 0
      right: 0
      padding: 20px
      bottom: 0px
      background-color: $color-text
      .access-btn
        line-height: 44px
        background-color: $btn-clo
        color: $color-text
        font-size: $font-size-large
        text-align: center
        border-radius: 22px
</style>
