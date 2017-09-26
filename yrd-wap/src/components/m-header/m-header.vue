<template>
  <div class="m-header" :class="{colorIcon : whiteIcon}" :style="bgColor">
    <div class="icon" :class="{black: isIndex}" @click="gobackAndNotice"></div>
    <h1 class="text">{{titleTxt}}</h1>
    <div v-if="isShow" class="right-core">
      <div class="user-center" v-if="changeLoginState && changeLoginState !== ''">
        <router-link tag="div" class="mine" to="/user-center">
          <i class="icon-mine"></i>
        </router-link>
      </div>
      <div class="sign" v-else>
        <router-link tag="div" class="btns" to="/signIn">登录</router-link>
        <span class="hr">/</span>
        <router-link tag="div" class="btns" to="/signUp">注册</router-link>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import {getLoginState} from 'api/sign'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      titleTxt: '',
      isIndex: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: true
      },
      isSignIn: {
        type: Boolean,
        default: false
      },
      isSignUp: {
        type: Boolean,
        default: false
      },
      isForget: {
        type: Boolean,
        default: false
      },
      whiteIcon: {
        type: Boolean,
        default: false
      },
      opcity: {
        type: Number,
        default: 0
      }
    },
    created () {
      setTimeout(() => {
        this._getLoginState()
      }, 20)
    },
    activated () {
      setTimeout(() => {
        this._getLoginState()
      }, 20)
    },
    computed: {
      bgColor () {
        return `background-color: rgba(255, 255, 255, ${this.opcity})`
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      gobackAndNotice () {
        if (this.isIndex) {
          this.$router.push('/recommend/notice')
        } else {
          this.$router.back()
        }
      },
      _getLoginState () {
        console.log(this.changeLoginState)
        if (this.changeLoginState && this.changeLoginState !== '') {
          getLoginState(this.changeLoginState).then((res) => {
            console.log(res)
            if (res.isLogin === 'true') {
              this.$emit('logined', res)
            } else {
              this.$emit('noLogin', res)
            }
          })
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
    z-index: 997
    &.colorIcon
      color: $color-text
      background-color: $color-text-s
      .icon
         bg-image('b-fff')
    .icon
      extend-click()
      position: absolute
      left: 15px
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
      right: 15px
      line-height: 44px
      .btns
        float: left
        font-size: $font-size-medium
      .hr
        float: left
        font-size: $font-size-medium
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
