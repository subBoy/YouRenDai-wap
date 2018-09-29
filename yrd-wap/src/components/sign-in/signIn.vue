<template>
  <div class="sign-in-wrapper">
    <div class="sign-header-wrapper">
      <img src="./bg.jpg" width="100%">
      <div class="sign-header-ct">资金由新网银行存管</div>
      <m-header class="sign-header" :titleTxt="titleTxt" :isShow="isShow" :whiteIcon="whiteIcon" :opcity="opcity"></m-header>
    </div>
    <div class="sign-content">
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userName" placeholder="请输入您的手机号" @keyup="checkIpVal" maxLength="11">
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="password" @focus="ipFocus" v-model="password" placeholder="请输入密码" @keyup="checkPdVal" v-show="!islookpd">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="password" placeholder="请输入密码" @keyup="checkPdVal" v-show="islookpd">
        <span class="look-pd-btn" :class="{'islook': islookpd}" @click.stop.prevent="lookPw"></span>
      </div>
      <div class="sign-err" v-html="errTxt"></div>
      <div class="sign-btn" @click="signMethods(userName, password)">登录</div>
      <p class="sign-rest-btn">
        <router-link tag="span" class="rest-btn forget-btn" to="/forget">忘记密码</router-link>
        <router-link tag="span" class="rest-btn sign-up-btn" to="/signUp">点击注册</router-link>
      </p>
    </div>
    <p class="sign-desc-b">网贷有风险，出借需谨慎</p>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import {signIn} from 'api/sign'
  import {getHisy} from 'common/js/cache'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '登录',
        isShow: false,
        errTxt: '',
        userName: '',
        password: '',
        whiteIcon: true,
        islookpd: false,
        opcity: 0
      }
    },
    computed: {
      ...mapGetters([
        'changeReturnPath'
      ])
    },
    created () {
      this.wScroll()
    },
    methods: {
      wScroll () {
        const _this = this
        window.onscroll = function () {
          let sTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
          _this.opcity = sTop / 44
          if (_this.opcity > 0.2) {
            _this.whiteIcon = false
          } else {
            _this.whiteIcon = true
          }
        }
      },
      lookPw () {
        this.islookpd = !this.islookpd
      },
      ipFocus () {
        this.signErr('')
      },
      check (str) {
        let temp = ''
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) {
            temp += str.charAt(i)
          }
        }
        return temp
      },
      checkIpVal () {
        this.userName = this.check(this.userName)
      },
      checkPdVal () {
        this.password = this.check(this.password)
      },
      _phone () {
        if (this.userName === '' || this.userName === null) {
          this.signErr('请输入手机号！')
          return false
        } else if (this.userName.length !== 11) {
          this.signErr('手机号格式错误！')
          return false
        } else {
          const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
          let mathes = this.userName.match(reg)
          if (!mathes) {
            this.signErr('手机号格式错误！')
            return false
          }
        }
        return true
      },
      _password () {
        if (this.password === '' || this.password === null) {
          this.signErr('请输入密码！')
          return false
        }
        return true
      },
      signMethods (phoneNumber, passWord) {
        if (!this._phone()) {
          return
        }
        if (!this._password()) {
          return
        }
        signIn(phoneNumber, passWord).then((res) => {
          if (res.ret_code === '1') {
            this.changeLoginState(res.ret_set.user_id)
            const HISY = getHisy()
            if (HISY !== '/' && HISY !== '/signUp' && HISY !== '/forget') {
              this.$router.replace(HISY)
              return
            }

            if (document.referrer !== '') {
              self.location = document.referrer
              return
            }

            this.$router.replace('/')
          } else {
            this.signErr(res.ret_msg)
          }
        })
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      },
      ...mapActions([
        'changeLoginState'
      ])
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .sign-in-wrapper
    display: flex
    min-height: 100vh
    flex-direction: column
    background-color: #fff
    .sign-header-wrapper
      position: relative
      .sign-header-ct
        position: absolute
        top: 50%
        left: 0
        right: 0
        transform: translateY(-50%)
        font-weight: bold
        font-size: 24px
        text-align: center
        color: #fff
      .sign-header.m-header
        position: fixed
        top: 0
        right: 0
        left: 0
        z-index: 998
    .sign-content
      flex: 1
      margin: 0 auto
      padding-top: 10px
      width: 90%
      text-align: center
      .sign-input-item
        position: relative
        padding: 10px 0
        border-1px-b(#ebebeb)
        .sign-input
          width: 100%
          height: 25px
          font-size: 12px
        .look-pd-btn
          display: block
          position: absolute
          right: 0
          top: 50%
          width: 40px
          height: 40px
          bg-image('notlook')
          background-position: center
          background-size: 20px 15px
          transform: translateY(-50%)
          &.islook
            bg-image('islook')
      .sign-err
        height: 42px
        line-height: 42px
        font-size: 12px
        color: #ff4e49
      .sign-btn
        line-height: 40px
        font-size: 18px
        color: #fff
        border-radius: 20px
        background-color: #ff4e49
        box-shadow: 0 4px 15px -4px #ccc
      .sign-rest-btn
        font-size: 0
        .rest-btn
          display: inline-block
          line-height: 36px
          padding: 0 15px
          font-size: 12px
          &.forget-btn
            color: #646464
          &.sign-up-btn
            color: #3387e9
    .sign-desc-b
      width: 100%
      font-size: 10px
      line-height: 50px
      text-align: center
      color: #969696
</style>
