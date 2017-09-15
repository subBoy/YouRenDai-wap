<template>
  <success :titleTxt="titleTxt" :descTxt="descTxt">
    <div class="desc-btn-wrapper">
      <div class="txt-group">
        <div class="txt">不再等<span class="styl">~~~</span></div>
        <div class="txt">投资快人一步 收益<span class="styl">轻松</span>赚取</div>
      </div>
      <router-link tag="div" class="invite-btn" to="/product-list">立即投资</router-link>
    </div>
  </success>
</template>

<script>
  import success from 'base/success/success'

  export default {
    data() {
      return {
        titleTxt: '充值成功',
        descTxt: '恭喜您。成功完成一笔充值！'
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
</style>
