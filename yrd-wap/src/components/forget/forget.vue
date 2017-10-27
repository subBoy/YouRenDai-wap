<template>
  <transition name="slide">
    <div class="sign-wrapper">
      <m-header :titleTxt="titleTxt" :isForget="isForget" :isShow="isShow" :whiteIcon="whiteIcon"></m-header>
      <sign
        ref="sign"
        :signBtnTxt="signBtnTxt"
        :isForget="isForget"
        :mdNum="mdNum"
        :errTxt="errTxt"
        :codeClick="codeClick"
        :passTxt="titleTxt"
        @signMethods="signMethods"
        @signErr="signErr"
        @blurTel="blurTel"
        @blurPassword="blurPassword"
        @getPhoneCode="getPhoneCode"
        @codeClickOk="codeClickOk"
        @codeClickErr="codeClickErr"
      ></sign>
      <confirm ref="customerConfirm" @confirm="confirm" :text="text" :confirmBtnText="confirmBtnText" :realClass="realClass"></confirm>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Sign from 'base/sign/sign'
  import Confirm from 'base/confirm/confirm'
  // import {encryption, compareEncrypt} from 'common/js/bcrypt'
  import {getPassCodeNumber, checkTelPass, forgetPassword} from 'api/sign'

  export default {
    data() {
      return {
        isForget: true,
        isShow: false,
        text: '恭喜您成功重置密码！',
        confirmBtnText: '立即登录',
        titleTxt: '重置密码',
        signBtnTxt: '提交',
        realClass: false,
        whiteIcon: true,
        codeClick: true,
        errTxt: '',
        mdNum: '',
        userName: '',
        password: ''
      }
    },
    methods: {
      signMethods (phoneNumber, passWord, _id, verificationCode, userType, imgVerify) {
        // 加盐、加密
        // encryption(phoneNumber, (hash) => {
        //   // this.userName = hash
        // })
        // 匹配
        // compareEncrypt(passWord, this.password, (res) => {
        //   // console.log(res)
        // })

        forgetPassword(phoneNumber, verificationCode, this.mdNum, passWord).then((res) => {
          if (res.flag) {
            this._real()
            // this.$router.push('signIn')
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
      getPhoneCode (phoneNumber) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (!this.mdNum || this.mdNum.length <= 0) {
            this.signErr('该手机号尚未注册！')
            return
          }

          getPassCodeNumber(phoneNumber, this.mdNum).then((res) => {
            if (res.ret_code === '1') {
              this.codeClickErr()
              this.$refs.sign.setInterFuc()
            } else {
              this.signErr(res.ret_msg)
              this.codeClickOk()
            }
          })
        }, 200)
      },
      codeClickOk () {
        this.codeClick = true
      },
      codeClickErr () {
        this.codeClick = false
      },
      confirm () {
        this.$router.back()
      },
      _real () {
        setTimeout(() => {
          this.$refs.customerConfirm.show()
        }, 20)
      }
    },
    components: {
      MHeader,
      Sign,
      Confirm
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
