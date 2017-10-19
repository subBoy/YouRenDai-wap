<template>
  <scroll ref="scroll" class="scroll-box">
    <div class="sign-box" ref="signBox">
      <h3 class="title">{{signTitle}}</h3>
      <div class="sign-content">
        <div class="input-wrapper">
          <ul class="input-box">
            <li class="input-item">
              <input type="tel" v-model="phoneNumber" class="input-box" @focus="focus" @blur="blurTel" @keyup="checkPhoneVal" maxLength="11">
              <p class="place-desc" v-show="phoneNumber.length <= 0">手机号</p>
            </li>
            <li class="input-item">
              <input type="text" v-model="passWord" class="input-box" @focus="focus" v-show="shPass" @blur="blurPassword" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" @keyup="checkPassVal">
              <input type="password" v-model="passWord" class="input-box" @focus="focus" v-show="!shPass" @blur="blurPassword" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" @keyup="checkPassVal">
              <span class="showPassword" @click.stop.prevent="shPassword" :class="{hidePassword: shPass}"></span>
              <p class="place-desc" v-show="passWord.length <= 0">填写密码<span class="styl">(长度为8-16位的字符串)</span></p>
            </li>
            <li class="input-item" v-if="isImgVerify">
              <input type="text" v-model="imgVerify" class="input-box" @focus="focus">
              <span class="change-verify" @click.stop.prevent="changeVerify">
                <img :src="verifyImg" width="100%" height="100%">
              </span>
              <p class="place-desc" v-show="imgVerify.length <= 0">图形验证码</span></p>
            </li>
            <li class="input-item" v-if="isSignUp">
              <input type="tel" v-model="serviceNumber" class="input-box" @focus="focus" @keyup="checkVal">
              <p class="place-desc" v-show="serviceNumber.length <= 0">填写客服顾问工号或手机号（选填）</p>
            </li>
            <li class="input-item" v-if="isSignUp || isForget">
              <input type="tel" v-model="verificationCode" class="input-box" @focus="focus">
              <span class="code-btn" @click.stop.prevent="getCode" :class="{clo: !codeClick}">{{codeTxt}}</span>
              <p class="place-desc" v-show="verificationCode.length <= 0">输入验证码</p>
            </li>
          </ul>
          <div class="user-types" v-if="isSignUp">
            <p class="line-type" :class="{selected: selectType}">
              <span class="type" @click="selectUser">勾选成为投资人</span>
            </p>
            <p class="line-type" :class="{selected: !selectType}">
              <span class="type" @click="selectUserBl">勾选成为借款人</span>
            </p>
          </div>
          <div class="err-desc">
            <router-link v-if="isSignIn" tag="div" class="forget-btns" to="/forget">忘记密码</router-link>
            <span class="errTxt" v-show="errTxt">{{errTxt}}</span>
          </div>
          <div class="sign-btn" @click.stop.prevent="signFun">{{signBtnTxt}}</div>
        </div>
      </div>
      <p class="desc" @click="lookHttp" v-show="lookBool">《有人贷用户服务协议》</p>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getImgCode} from 'api/sign'

  // const windowHei = document.documentElement.clientHeight
  const debug = process.env.NODE_ENV !== 'production'

  export default {
    props: {
      signBtnTxt: {
        type: String,
        default: ''
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
      isImgVerify: {
        type: Boolean,
        default: false
      },
      errTxt: {
        type: String,
        default: ''
      },
      mdNum: {
        type: String,
        default: ''
      },
      signTitle: {
        type: String,
        default: 'Welcome Home'
      },
      passwordLength: {
        type: Boolean,
        default: true
      },
      codeClick: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        selectType: true,
        shPass: false,
        phoneNumber: '',
        passWord: '',
        serviceNumber: '',
        verificationCode: '',
        imgVerify: '',
        codeTxt: '点击发送',
        lookBool: true,
        codeTime: 60,
        setInter: null,
        userType: 'invest',
        verifyImg: ''
      }
    },
    created () {
      this._getRecommend()
      setTimeout(() => {
        this.$emit('ifImgcode')
      }, 20)
    },
    activated () {
      this.phoneNumber = ''
      this.passWord = ''
      this.serviceNumber = ''
      this.verificationCode = ''
      this.imgVerify = ''
    },
    methods: {
      changeVerify () {
        if (debug) {
          this.verifyImg = 'http://119.80.183.190:8089/front/register.do?cmd=checkCode&rand=' + Math.random()
        } else {
          this.verifyImg = '/front/register.do?cmd=checkCode&rand=' + Math.random()
        }
      },
      selectUser () {
        this.selectType = true
        this.userType = 'invest'
      },
      selectUserBl () {
        this.selectType = false
        this.userType = 'jk'
      },
      focus () {
        setTimeout(() => {
          this.$emit('signErr', '')
          this.$refs.scroll.refresh()
        }, 20)
      },
      checkPhoneVal() {
        this.phoneNumber = this.check(this.phoneNumber)
      },
      checkPassVal() {
        this.passWord = this.check(this.passWord)
      },
      checkVal() {
        this.serviceNumber = this.check(this.serviceNumber)
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
      blurTel () {
        this.$emit('blurTel', this.phoneNumber)
      },
      blurPassword () {
        this.$emit('blurPassword', this.passWord)
      },
      signFun () {
        if (!this._phone()) {
          return
        }
        if (!this._password()) {
          return
        }
        if (this.isSignUp || this.isForget) {
          if (!this._code()) {
            return
          }
        }
        if (this.isImgVerify) {
          if (!this._verify()) {
            return
          }
        }
        this.$emit('signMethods', this.phoneNumber, this.passWord, this.$route.params.id, this.verificationCode, this.userType, this.imgVerify)
      },
      shPassword () {
        this.shPass = !this.shPass
      },
      getCode () {
        if (!this.codeClick) {
          return
        }
        if (!this._phone()) {
          return
        }

        this.$emit('getPhoneCode', this.phoneNumber)
      },
      needCode () {
        getImgCode().then((res) => {
          if (!res.flag) {
            this.changeVerify()
            this.$emit('imgCodeOk')
          }
        })
      },
      codeClickOk () {
        this.codeClick = true
      },
      codeClickErr () {
        this.codeClick = false
      },
      setInterFuc () {
        this.setInter = setInterval(this.setval, 1000)
      },
      setval () {
        this.codeTime--
        this.codeTxt = `${this.codeTime}秒后重试`
        if (this.codeTime < 1) {
          clearInterval(this.setInter)
          this.codeTime = 60
          this.codeTxt = '点击发送'
          this.codeClickOk()
        }
      },
      lookHttp () {
        location.href = '/newApp/Agreement.html'
      },
      _getRecommend () {
        let _id = this.$route.params.id
        if (_id && _id.length > 0) {
          getRecommend(_id).then((res) => {
            console.log(res)
            this.serviceNumber = res.result
          })
        }
      },
      _phone () {
        if (this.phoneNumber === '' || this.phoneNumber === null) {
          this.$emit('signErr', '请输入手机号！')
          return false
        } else if (this.phoneNumber.length !== 11) {
          this.$emit('signErr', '手机号格式错误！')
          return false
        } else {
          const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
          let mathes = this.phoneNumber.match(reg)
          if (!mathes) {
            this.$emit('signErr', '手机号格式错误！')
            return false
          }
        }
        return true
      },
      _password () {
        if (this.passWord === '' || this.passWord === null) {
          this.$emit('signErr', '请输入密码！')
          return false
        } else if (this.passwordLength) {
          if (this.passWord.length < 8 || this.passWord.length > 16) {
            this.$emit('signErr', '密码长度需控制在8-16位！')
            return false
          }
          if (this._checkPass(this.passWord) < 3) {
            this.$emit('signErr', '密码必须由大小写字母以及数字组成！')
            return false
          }
          const reg = /^[a-zA-Z0-9]\w{7,15}$/
          const mathes = reg.test(this.passWord)
          if (!mathes) {
            this.$emit('signErr', '密码不能含有特殊字符！')
            return false
          } else {
            this.$emit('signErr', '')
          }
        }
        return true
      },
      _checkPass(pass) {
        let ls = 0
        if (pass.match(/([a-z])+/)) {
          ls++
        }
        if (pass.match(/([0-9])+/)) {
          ls++
        }
        if (pass.match(/([A-Z])+/)) {
          ls++
        }
        if (pass.match(/[^a-zA-Z0-9]+/)) {
          ls++
        }
        return ls
      },
      _verify () {
        if (this.imgVerify === '' || this.imgVerify === null) {
          this.$emit('signErr', '请输入图片验证码')
          return false
        } else {
          this.$emit('signErr', '')
        }
        return true
      },
      _code () {
        if (this.verificationCode === '' || this.verificationCode === null) {
          this.$emit('signErr', '请输入验证码！')
          return false
        } else {
          this.$emit('signErr', '')
        }
        return true
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .scroll-box
    position: absolute
    top: 44px
    left: 0
    right: 0
    bottom: 0
    .sign-box
      position: relative
      margin: 10px 20px 0
      min-height: 100%
      z-index: 998
      .title
        text-align: center
        font-size: $font-size-large
        color: $color-text
      .sign-content
        position: absolute
        width: 100%
        top: 48%
        transform: translateY(-50%)
        border-radius: 4px
        overflow: hidden
        background-color: $color-text-ll
        z-index: 1
        .user-types
          display: flex
          padding-top: 15px
          .line-type
            flex: 1
            text-align: center
            .type
              display: inline-block
              margin: 0 auto
              padding-left: 16px
              line-height: 44px
              color: $color-dialog-background
              font-size: $font-size-medium
              background-size: 12px 12px
              background-position: left center
              background-repeat: no-repeat
              bg-image('select')
            &.selected
              background-color: #4a81ff
              .type
                bg-image('selected')
                color: $color-text
        .input-wrapper
          padding: 6px 20px 20px 20px
          .input-item
            margin-top: 5px
            height: 44px
            border-1px-b(#eee)
            .change-verify
              display: block
              position: absolute
              right: 0
              top: 0
              width: 100px
              height: 39px
              z-index: 10
            .code-btn
              extend-click()
              display: inline-block
              position: absolute
              right: 0px
              top: 0
              line-height: 44px
              color: $btn-clo
              font-size: $font-size-small
              z-index: 10
              &.clo
                color: $color-q
            .showPassword
              extend-click()
              display: block
              position: absolute
              right: 0
              top: 15px
              width: 15px
              height: 15px
              bg-image('pw1')
              background-size: 15px 15px
              z-index: 10
              &.hidePassword
                bg-image('pw2')
            .input-box
              position: absolute
              top: 10px
              left: 0
              outline: none
              background-color: transparent
              width: 100%
              line-height: 24px
              height: 24px
              font-size: $font-size-medium
              z-index: 10
            .place-desc
              width: 100%
              line-height: 44px
              height: 44px
              font-size: $font-size-small
              color: $color-q
              .styl
                font-size: $font-size-small-s
          .err-desc
            position: relative
            padding-top: 20px
            text-align: center
            font-size: 0
            .forget-btns
              position: absolute
              right: 0
              top: 0
              line-height: 30px
              font-size: $font-size-small
              color: $btn-clo
            .errTxt
              display: inline-block
              padding-left: 15px
              bg-image('error')
              background-position: left center
              background-size: 10px 10px
              background-repeat: no-repeat
              line-height: 10px
              font-size: $font-size-small-s
              color: $btn-clo
          .sign-btn
            margin: 20px auto 0
            background-color: $btn-clo
            line-height: 44px
            width: 160px
            height: 44px
            text-align: center
            color: $color-text
            border-radius: 3px
            font-size: $font-size-large
    .desc
      extend-click()
      position: absolute
      width: 100%
      left: 0
      bottom: 20px
      text-align: center
      font-size: $font-size-small
      color: $color-text
</style>
