<template>
  <scroll ref="scroll" class="scroll-box">
    <div class="sign-box" ref="signBox">
      <h3 class="title">Welecome Home</h3>
      <div class="sign-content">
        <div class="user-types border-1px-b" v-if="isSignUp">
          <span class="type" :class="{selected: selectType}" @click="selectUser">投资用户</span>
          <span class="type" :class="{selected: !selectType}" @click="selectUser">借款用户</span>
        </div>
        <div class="input-wrapper">
          <ul class="input-box">
            <li class="input-item">
              <input type="text" v-model="phoneNumber" class="input-box" @focus="focus" @blur="blurTel">
              <p class="place-desc" v-show="phoneNumber.length <= 0">手机号</p>
            </li>
            <li class="input-item">
              <input type="text" v-model="passWord" class="input-box" @focus="focus" v-show="shPass" @blur="blurPassword">
              <input type="password" v-model="passWord" class="input-box" @focus="focus" v-show="!shPass" @blur="blurPassword">
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
              <input type="text" v-model="serviceNumber" class="input-box" @focus="focus">
              <p class="place-desc" v-show="serviceNumber.length <= 0">填写客服顾问工号或手机号（选填）</p>
            </li>
            <li class="input-item" v-if="isSignUp || isForget">
              <input type="text" v-model="verificationCode" class="input-box" @focus="focus">
              <span class="code-btn" @click.stop.prevent="getCode" :class="{clo: !codeClick}">{{codeTxt}}</span>
              <p class="place-desc" v-show="verificationCode.length <= 0">输入验证码</p>
            </li>
          </ul>
          <div class="err-desc">
            <router-link v-if="isSignIn" tag="div" class="forget-btns" to="/forget">忘记密码</router-link>
            <span class="errTxt" v-show="errTxt">{{errTxt}}</span>
          </div>
          <div class="sign-btn" @click.stop.prevent="signFun">{{signBtnTxt}}</div>
        </div>
      </div>
    </div>
    <p class="desc">《有人贷用户服务协议》</p>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getCodeNumber, getRecommend, getImgCode} from 'api/sign'

  const windowHei = document.documentElement.clientHeight
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
        codeClick: true,
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
    methods: {
      changeVerify () {
        if (debug) {
          this.verifyImg = 'http://119.80.183.190:8089/front/register.do?cmd=checkCode&rand=' + Math.random()
        } else {
          this.verifyImg = '/front/register.do?cmd=checkCode&rand=' + Math.random()
        }
      },
      selectUser () {
        this.selectType = !this.selectType
        if (this.selectType) {
          this.userType = 'invest'
        } else {
          this.userType = 'jk'
        }
      },
      focus () {
        setTimeout(() => {
          this.$emit('signErr', '')
          this.$refs.signBox.style.height = windowHei - 44 + 'px'
          this.$refs.scroll.refresh()
        }, 20)
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

        this.$emit('blurTel', this.phoneNumber)

        if (!this.mdNum || this.mdNum.length <= 0) {
          return
        }

        this.codeClick = false
        getCodeNumber(this.phoneNumber, this.mdNum).then((res) => {
          if (res.flag) {
            this.setInter = setInterval(this._setval, 1000)
          } else {
            this.codeClick = true
          }
        })
      },
      needCode () {
        getImgCode().then((res) => {
          if (!res.flag) {
            this.changeVerify()
            this.$emit('imgCodeOk')
          }
          console.log(res)
        })
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
        if (this.passWord === '' || this.passWord === null || this.passWord.length < 8 || this.passWord.length > 16) {
          this.$emit('signErr', '密码长度需控制在8-16位！')
          return false
        } else {
          const reg = /^\w+$/
          let mathes = this.passWord.match(reg)
          if (!mathes) {
            this.$emit('signErr', '密码不能含有特殊字符！')
            return false
          } else {
            this.$emit('signErr', '')
          }
        }
        return true
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
      },
      _setval () {
        this.codeTime--
        this.codeTxt = `${this.codeTime}秒后重试`
        if (this.codeTime < 1) {
          clearInterval(this.setInter)
          this.codeTime = 60
          this.codeTxt = '点击发送'
          this.codeClick = true
        }
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
      margin: 10px 30px 0
      min-height: 100%
      .title
        text-align: center
        font-size: $font-size-large
        color: $color-text
      .sign-content
        position: absolute
        width: 100%
        top: 43.5%
        transform: translateY(-50%)
        border-radius: 8px
        overflow: hidden
        background-color: $color-text-ll
        .user-types
          display: flex
          border-1px-b(#eee)
          .type
            flex: 1
            line-height: 44px
            text-align: center
            height: 44px
            color: $color-dialog-background
            font-size: $font-size-medium
            &.selected
              background-color: $btn-clo
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
              top: 0
              left: 0
              outline: none
              background-color: transparent
              width: 100%
              line-height: 44px
              height: 44px
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
            border-radius: 44px
            font-size: $font-size-large
    .desc
      position: relative
      width: 100%
      left: 0
      bottom: 35px
      text-align: center
      font-size: $font-size-small
      color: $color-text
</style>
