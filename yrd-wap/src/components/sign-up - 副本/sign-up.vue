<template>
  <transition name="slide">
    <div class="sign-wrapper" ref="signWrapper">
      <m-header :isShow="isShow">
        <div class="sign">
          <router-link tag="div" class="btns" to="/signIn">立即去登录</router-link>
        </div>
      </m-header>
      <sign
        ref="sign"
        :signBtnTxt="signBtnTxt"
        :isSignUp="isSignUp"
        :mdNum="mdNum"
        :errTxt="errTxt"
        @signMethods="signMethods"
        @signErr="signErr"
        @blurTel="blurTel"
        @blurPassword="blurPassword"
        @getPhoneCode="getPhoneCode"
        @boxHeight="boxHeight"
      ></sign>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Sign from 'base/sign/sign'
  // import {encryption, compareEncrypt} from 'common/js/bcrypt'
  import {encode64} from 'common/js/util'
  import {getCodeNumber, checkTel, signUp, signIn} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'

  const windowHei = document.documentElement.clientHeight
  export default {
    data() {
      return {
        isSignUp: true,
        isShow: false,
        signBtnTxt: '立即注册',
        errTxt: '',
        userName: '',
        password: '',
        mdNum: ''
      }
    },
    computed: {
      ...mapGetters([
        'changeReturnPath'
      ])
    },
    methods: {
      signMethods (phoneNumber, passWord, _id, verificationCode, userType, imgVerify) {
        // 加盐、加密
        // encryption(phoneNumber, (hash) => {
        //   // this.userName = hash
        // })
        // // 匹配
        // compareEncrypt(passWord, this.password, (res) => {
        //   // console.log(res)
        // })

        signUp(phoneNumber, verificationCode, _id, userType, passWord).then((res) => {
          if (res.flag) {
            const _this = this
            signIn(encode64(phoneNumber), encode64(passWord), '').then((signRes) => {
              if (signRes.flag) {
                _this.changeLoginState(signRes.userId)
                if (_this.changeReturnPath === '') {
                  _this.$router.push('/')
                  return
                }
                _this.$router.push(this.changeReturnPath)
              } else {
                _this.$router.push('/sign-in')
              }
            })
          } else {
            this.signErr(res.msg)
          }
        })
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      },
      blurTel (tel) {
        if (!this.$refs.sign._phone()) {
          return
        }

        // 验证手机号
        checkTel(tel).then((res) => {
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
      getPhoneCode (phoneNumber, mdNum) {
        getCodeNumber(phoneNumber, mdNum).then((res) => {
          if (res.flag) {
            this.$refs.sign.setInterFuc()
          } else {
            this.$refs.sign.codeClickOk()
          }
        })
      },
      boxHeight() {
        this.$refs.signWrapper.style.height = windowHei + 'px'
      },
      ...mapActions([
        'changeLoginState'
      ])
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
