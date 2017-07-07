<template>
  <div class="m-header">
    <div class="icon" :class="{black: isIndex}" @click="gobackAndNotice"></div>
    <h1 class="text">{{titleTxt}}</h1>
    <div v-if="isShow" class="right-core">
      <div class="user-center" v-if="signIn">
        <router-link tag="div" class="mine" to="/user">
          <i class="icon-mine"></i>
        </router-link>
      </div>
      <div class="sign" v-else>
        <router-link tag="div" class="btns" to="/signIn">登录</router-link>
        <span class="hr">/</span>
        <router-link tag="div" class="btns" to="/signUp">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      titleTxt: '',
      signIn: {
        type: Boolean,
        default: false
      },
      isIndex: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      gobackAndNotice () {
        if (this.isIndex) {
          this.$router.push('notice')
        } else {
          this.$router.back()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-tle
    font-size: 0
    background-color: $color-text
    .icon
      extend-click()
      position: absolute
      left: 12px
      top: 12px
      width: 20px
      height: 20px
      bg-image('black')
      background-size: 20px 20px
      &.black
        bg-image('active')
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-medium-x
    .sign
      position: absolute
      top: 0
      right: 12px
      line-height: 44px
      .btns
        float: left
        font-size: $font-size-medium
        color: $color-tle
      .hr
        float: left
        font-size: $font-size-medium
        color: $color-tle
    .mine
      position: absolute
      top: 12px
      right: 12px
      .icon-mine
        extend-click()
        display: block
        width: 20px
        height: 20px
        bg-image('user')
        background-size: 20px 20px
</style>
