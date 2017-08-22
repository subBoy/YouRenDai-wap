<template>
  <transition name="slide">
    <div class="sign-wrapper">
      <m-header :titleTxt="titleTxt" :isForget="isForget" :isShow="isShow"></m-header>
      <sign
        ref="sign"
        :signBtnTxt="signBtnTxt"
        :isForget="isForget"
        :mdNum="mdNum"
        :errTxt="errTxt"
        @signMethods="signMethods"
        @signErr="signErr"
        @blurTel="blurTel"
        @blurPassword="blurPassword"
        @getPhoneCode="getPhoneCode"
      ></sign>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Sign from 'base/sign/sign'
  import {encryption, compareEncrypt} from 'common/js/bcrypt'
  import {getPassCodeNumber, checkTelPass, forgetPassword} from 'api/sign'

  export default {
    data() {
      return {
        isForget: true,
        isShow: false,
        titleTxt: '重置密码',
        signBtnTxt: '提交',
        errTxt: '',
        mdNum: '',
        userName: '',
        password: ''
      }
    },
    methods: {
      signMethods (phoneNumber, passWord, _id, verificationCode, userType, imgVerify) {
        // 加盐、加密
        encryption(phoneNumber, (hash) => {
          // this.userName = hash
        })
        // 匹配
        compareEncrypt(passWord, this.password, (res) => {
          // console.log(res)
        })

        forgetPassword(phoneNumber, verificationCode, this.mdNum, passWord).then((res) => {
          if (res.flag) {
            this.$router.push('signIn')
          } else {
            this.signErr(res.msg)
          }
        })
      },
      blurTel (tel) {
        if (!this.$refs.sign._phone()) {
          return
        }

        // 验证手机号
        checkTelPass(tel).then((res) => {
          if (!res.status) {
            this.signErr(res.msg)
          } else {
            this.mdNum = res.mdNum
          }
          console.log(res)
        })
      },
      blurPassword (password) {
        if (!this.$refs.sign._password()) {
          return
        }
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      },
      getPhoneCode (phoneNumber, mdNum) {
        getPassCodeNumber(phoneNumber, mdNum).then((res) => {
          if (res.flag) {
            this.$refs.sign.setInterFuc()
          } else {
            this.$refs.sign.codeClickOk()
          }
        })
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
