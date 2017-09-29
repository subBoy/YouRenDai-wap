<template>
  <transition name="slide">
    <div class="set-user-wrapper">
      <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
      <div class="set-user-center">
        <div class="logo">
          <span class="icon"></span>
          <p class="text">有人贷</p>
        </div>
        <div class="work-time">
          <span class="service-time">
            <span class="title">咨询客服</span>
            <span class="time">9:00-18:00</span>
          </span>
          <span class="service-tel">
            <a class="tel-txt" href="tel:400-663-9190">400-663-9190</a>
          </span>
        </div>
        <div class="login-out-btn"><span class="btn-txt" @click="_singOut">退出账号</span></div>
      </div>
    </div>
  </transition>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import {signOut} from 'api/sign'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '设置',
        isShow: false,
        opcity: 1
      }
    },
    methods: {
      _singOut() {
        signOut().then(() => {
          this.changeLoginState('')
          this.changeReturnPath('')
          this.$router.push('/')
        })
      },
      ...mapActions([
        'changeLoginState',
        'changeReturnPath'
      ])
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .set-user-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .set-user-center
      .logo
        margin: 5px 0
        padding: 20px 0
        background-color: $color-text
        text-align: center
        .icon
          display: block
          margin-bottom: 10px
          width: 100%
          height: 51px
          bg-image('logo')
          background-size: 51px 51px
          background-position: center
          background-repeat: no-repeat
        .text
          font-size: $font-size-medium
          color: $color-tle
      .work-time
        margin-bottom: 20px
        padding: 0 20px
        line-height: 58px
        height: 58px
        background-color: $color-text
        font-size: $font-size-medium
        .service-time
          font-size: 0
          .title
            font-size: $font-size-medium
          .time
            font-size: $font-size-small
            padding-left: 10px
            color: #c8c8c8
        .service-tel
          float: right
          .tel-txt
            font-size: $font-size-medium
            color: $color-tle
      .login-out-btn
        margin: 0 20px
        .btn-txt
          display: block
          line-height: 45px
          width: 100%
          height: 45px
          text-align: center
          border-radius: 22.5px
          font-size: $font-size-large
          background-color: $color-theme
          color: $color-text
</style>
