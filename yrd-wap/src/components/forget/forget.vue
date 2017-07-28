<template>
  <transition name="slide">
    <div class="sign-wrapper">
      <m-header :titleTxt="titleTxt" :isForget="isForget" :isShow="isShow"></m-header>
      <sign :signBtnTxt="signBtnTxt" :isForget="isForget" @signMethods="signMethods" @signErr="signErr" :errTxt="errTxt"></sign>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Sign from 'base/sign/sign'
  import {encryption, compareEncrypt} from 'common/js/bcrypt'

  export default {
    data() {
      return {
        isForget: true,
        isShow: false,
        titleTxt: '重置密码',
        signBtnTxt: '提交',
        errTxt: '',
        userName: '',
        password: ''
      }
    },
    methods: {
      signMethods (phoneNumber, passWord, serviceNumber, verificationCode) {
        // 加盐、加密
        encryption(phoneNumber, (hash) => {
          this.userName = hash
        })
        // 匹配
        compareEncrypt(passWord, this.password, (res) => {
          console.log(res)
        })
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      }
    },
    components: {
      MHeader,
      Sign
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .sign-wrapper
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: url(sign-bg.jpg)
    background-repeat: no-repeat
    background-size: cover
</style>
