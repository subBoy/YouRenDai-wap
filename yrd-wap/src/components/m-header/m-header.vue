<template>
  <div class="m-header" :class="{colorIcon : whiteIcon}" :style="bgColor">
    <div class="icon" :class="{black: isIndex}" @click="gobackAndNotice"></div>
    <h1 class="text">{{titleTxt}}</h1>
    <div v-if="isShow" class="right-core">
      <div class="user-center" v-if="(changeLoginState && changeLoginState.length > 0) || (userId && userId.length > 0)">
        <router-link tag="div" class="mine" to="/user-center">
          <i class="icon-mine"></i>
        </router-link>
      </div>
      <div class="sign" v-else>
        <div class="btns" @click="signMethod('/signIn')">登录</div>
        <span class="hr">/</span>
        <div class="btns" @click="signMethod('/signUp')">注册</div>
      </div>
    </div>
    <slot></slot>
    <div v-show="isSingDeal" class="refresh-btn" @click="refreshThisPage"></div>
  </div>
</template>

<script>
  import {getLoginState} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'
  import {getHisy, getNexty} from 'common/js/cache'

  export default {
    props: {
      titleTxt: '',
      isIndex: {
        type: Boolean,
        default: false
      },
      gobool: {
        type: Boolean,
        default: false
      },
      guideBool: {
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
      isSingDeal: {
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
      },
      goBack: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        userId: ''
      }
    },
    created () {
      this.userId = this.$route.query.userId
      this._getLoginState()
    },
    computed: {
      bgColor () {
        if (this.opcity > 0.3) {
          return `background-color: rgba(255, 255, 255, ${this.opcity}); box-shadow: 0px 1px 10px -4px #ccc`
        }
        return `background-color: rgba(255, 255, 255, ${this.opcity})`
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      gobackAndNotice () {
        const HISY = getHisy()
        const NEXTY = getNexty()
        if (this.isIndex) {
          this.$router.push('/notice')
          return
        }
        if (this.gobool) {
          this.$router.push('/user-center')
          return
        }
        if (this.$route.path === '/share-back' || this.$route.path === '/sign-deal') {
          this.$router.go(-1)
          return
        }
        if (this.guideBool) {
          this.$router.push('/')
          return
        }
        if ((HISY === '/signIn' || HISY === '/signUp' || NEXTY === '/signIn' || NEXTY === '/signUp') && (this.changeLoginState || this.userId)) {
          this.$router.push('/')
          return
        }
        if (HISY === '/' && document.referrer !== '') {
          self.location = document.referrer
          return
        }
        this.$router.go(-1)
      },
      refreshThisPage () {
        location.reload()
      },
      signMethod (str) {
        if (this.goBack) {
          this.changeReturnPath(this.$route.path)
        }
        this.$router.push(str)
      },
      _getLoginState () {
        if (this.changeLoginState && this.changeLoginState !== '') {
          getLoginState(this.changeLoginState).then((res) => {
            if (res.isLogin === 'true') {
              this.$emit('logined', res)
            } else {
              this.$emit('noLogin', res)
            }
          })
          return
        } else if (this.userId && this.userId !== '') {
          getLoginState(this.userId).then((res) => {
            if (res.isLogin === 'true') {
              this.$emit('logined', res)
              this.setLoginState2(this.userId)
            } else {
              this.$emit('noLogin', res)
            }
          })
        }
      },
      ...mapActions([
        'changeReturnPath',
        'setLoginState2'
      ])
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
      .text
        color: $color-text
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
    .refresh-btn
      position: absolute
      top: 0
      right: 0
      width: 44px
      height: 44px
      background-image: url('refresh.png')
      background-position: center
      background-repeat: no-repeat
      background-size: 20px 20px
      background-size: 15px 15px
</style>
