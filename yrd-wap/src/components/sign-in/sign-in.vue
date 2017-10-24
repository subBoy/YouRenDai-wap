<template>
  <transition name="slide">
    <div class="sign-wrapper" ref="signWrapper">
      <m-header :isShow="isShow" :whiteIcon="whiteIcon">
        <div class="sign">
          <router-link tag="div" class="btns" to="/signUp">立即去注册</router-link>
        </div>
      </m-header>
      <sign
        ref="sign"
        :signBtnTxt="signBtnTxt"
        :isSignIn="isSignIn"
        :errTxt="errTxt"
        :isImgVerify="isImgVerify"
        :passwordLength="passwordLength"
        @signMethods="signMethods"
        @signErr="signErr"
        @ifImgcode="ifImgcode"
        @imgCodeOk="imgCodeOk"
        @imgCodeErr="imgCodeErr"
        @boxHeight="boxHeight"
      ></sign>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Sign from 'base/sign/sign'
  // import {encryption, compareEncrypt} from 'common/js/bcrypt'
  // import {encode64} from 'common/js/util'
  import {signIn} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'

  const windowHei = document.documentElement.clientHeight
  export default {
    data() {
      return {
        isSignIn: true,
        isShow: false,
        isImgVerify: false,
        signBtnTxt: '立即登录',
        errTxt: '',
        userName: '',
        password: '',
        passwordLength: false,
        whiteIcon: true
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
        // 匹配
        // compareEncrypt(passWord, this.password, (res) => {
        //   // console.log(res)
        // })
        signIn(phoneNumber, passWord, imgVerify).then((res) => {
          if (res.ret_code === '1') {
            this.changeLoginState(res.ret_set.user_id)
            this.imgCodeErr()
            if (this.changeReturnPath === '') {
              this.$router.push('/')
              return
            }
            this.$router.push(this.changeReturnPath)
            // 登录拦截
            // let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            // this.$router.push({
            //   path: redirect
            // })
          } else {
            // this.$refs.sign.changeVerify()
            // this.imgCodeOk()
            this.signErr(res.ret_msg)
          }
        })
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      },
      ifImgcode () {
        this.$refs.sign.needCode()
      },
      imgCodeOk () {
        this.isImgVerify = true
      },
      imgCodeErr () {
        this.isImgVerify = false
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
    z-index: 100
  .sign-wrapper
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: url(sign-bg.jpg)
    background-repeat: no-repeat
    background-size: cover
    .sign
      .btns
        color: $color-text
</style>
