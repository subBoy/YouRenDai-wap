<template>
  <success :titleTxt="titleTxt" :descTxt="descTxt">
    <div class="desc-btn-wrapper">
      <div class="txt-group">
        <div class="txt">推荐给好友 我要分享~~</div>
      </div>
      <router-link tag="div" class="invite-btn" to="/recommend/share-back">立即分享</router-link>
      <router-link tag="p" class="success-details" to="/user-center/invest-record">查看详情>></router-link>
    </div>
  </success>
</template>

<script>
  import success from 'base/success/success'

  export default {
    data() {
      return {
        titleTxt: '投资成功',
        descTxt: '恭喜您。成功完成一笔投资！'
      }
    },
    components: {
      success
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .desc-btn-wrapper
    text-align: center
    padding-bottom: 20px
    .txt-group
      padding-bottom: 20px
      .txt
        line-height: 28px
        color: $color-tle
        font-size: $font-size-large
        .styl
          font-size: $font-size-large-x
          color: $btn-clo
    .invite-btn
      line-height: 35px
      margin: 0 auto 10px
      width: 50%
      border-radius: 17.5px
      background-color: $btn-clo
      color: $color-text
      font-size: $font-size-large
      text-align: center
    .success-details
      line-height: 24px
      font-size: $font-size-small
      color: $btn-clo
</style>

