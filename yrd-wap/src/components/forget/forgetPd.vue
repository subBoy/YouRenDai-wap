<template>
  <div class="sign-up-wrapper">
    <div class="sign-header-wrapper">
      <m-header class="sign-header" :titleTxt="titleTxt" :isShow="isShow" :whiteIcon="whiteIcon"></m-header>
    </div>
    <div class="sign-content">
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userName" placeholder="请输入手机号" @keyup="checkIpVal" maxLength="11">
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="password" @focus="ipFocus" v-model="password" placeholder="请输入8-16位新密码" @keyup="checkPdVal" v-show="!islookpd">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="password" placeholder="请输入8-16位新密码" @keyup="checkPdVal" v-show="islookpd">
        <span class="look-pd-btn" :class="{'islook': islookpd}" @click.stop.prevent="lookPw"></span>
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userCode" placeholder="请输入验证码" @keyup="checkCodeVal">
        <span class="get-code-btn" :class="{'iscode': !codeClick}" @click.stop.prevent="getCode" v-html="codeTxt"></span>
      </div>
      <div class="sign-err" v-html="errTxt"></div>
      <div class="sign-btn" @click="signMethods(userName, password, userCode, mdNum)">确认</div>
      <confirm ref="customerConfirm" @confirm="confirm" :text="text" :confirmBtnText="confirmBtnText" :realClass="realClass"></confirm>
      <hint ref="hint" :hintDesc="hintDesc" :leftBtnTxt="leftBtnTxt" :rightBtnTxt="rightBtnTxt" @hint="hint" @close="hintClose"></hint>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Confirm from 'base/confirm/confirm'
  import Hint from 'base/hint/hint'
  import {getPassCodeNumber, checkTelPass, forgetPassword} from 'api/sign'

  export default {
    data() {
      return {
        titleTxt: '重置密码',
        text: '恭喜您成功重置密码！',
        confirmBtnText: '立即登录',
        realClass: false,
        isShow: false,
        codeTxt: '获取验证码',
        errTxt: '',
        userName: '',
        userCode: '',
        password: '',
        whiteIcon: false,
        islookpd: false,
        codeClick: true,
        mdNum: '',
        codeTime: 60,
        hintDesc: '该手机号还没有注册，<br/>是否立即注册？',
        leftBtnTxt: '取消',
        rightBtnTxt: '立即注册'
      }
    },
    methods: {
      hint () {
        this.$router.push('/signUp')
      },
      hintClose () {
        // 取消操作
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
      checkCodeVal () {
        this.userCode = this.check(this.userCode)
      },
      getCode () {
        if (!this.codeClick) {
          return
        }
        if (!this._phone()) {
          return
        }
        this.codeClickErr()
        checkTelPass(this.userName).then((res) => {
          if (!res.status) {
            this.signErr(res.msg)
            this.codeClickOk()
            if (res.msg.indexOf('注册') !== -1) {
              this._hint()
            }
          } else {
            this.mdNum = res.mdNum
            getPassCodeNumber(this.userName, this.mdNum).then((data) => {
              if (data.ret_code === '1') {
                this.codeClickErr()
                this.setInterFuc()
              } else {
                this.signErr(data.msg)
                this.codeClickOk()
              }
            })
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
        const _this = this
        this.setInter = setInterval(_this.setval, 1000)
      },
      setval () {
        this.codeTime--
        this.codeTxt = `重新发送(${this.codeTime})`
        if (this.codeTime < 1) {
          clearInterval(this.setInter)
          this.codeTime = 60
          this.codeTxt = '重新发送'
          this.codeClickOk()
        }
      },
      confirm () {
        this.$router.replace('/signIn')
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
        } else if (this.password.length) {
          if (this.password.length < 8 || this.password.length > 16) {
            this.signErr('密码长度需控制在8-16位！')
            return false
          }
          if (this._checkPass(this.password) < 3) {
            this.signErr('密码必须由大小写字母以及数字组成！')
            return false
          }
          const reg = /^[a-zA-Z0-9]\w{7,15}$/
          const mathes = reg.test(this.password)
          if (!mathes) {
            this.signErr('密码不能含有特殊字符！')
            return false
          } else {
            this.signErr('')
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
      _code () {
        if (this.userCode === '' || this.userCode === null) {
          this.signErr('请输入验证码！')
          return false
        } else {
          this.signErr('')
        }
        return true
      },
      signMethods (phoneNumber, passWord, code, mdNum) {
        if (!this._phone()) {
          return
        }
        if (!this._password()) {
          return
        }
        if (!this._code()) {
          return
        }
        forgetPassword(phoneNumber, code, mdNum, passWord).then((res) => {
          if (res.flag) {
            this._real()
          } else {
            this.signErr(res.msg)
          }
        })
      },
      signErr (errTxt) {
        this.errTxt = errTxt
      },
      _real () {
        setTimeout(() => {
          this.$refs.customerConfirm.show()
        }, 20)
      },
      _hint () {
        setTimeout(() => {
          this.$refs.hint.show()
        }, 20)
      }
    },
    components: {
      MHeader,
      Confirm,
      Hint
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .sign-up-wrapper
    display: flex
    min-height: 100vh
    flex-direction: column
    background-color: #fff
    .sign-header-wrapper
      position: relative
      .sign-header.m-header
        position: fixed
        top: 0
        right: 0
        left: 0
        z-index: 998
    .sign-content
      flex: 1
      margin: 0 auto
      padding-top: 44px
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
        .get-code-btn
          display: block
          position: absolute
          right: 0
          top: 50%
          line-height: 40px
          width: 80px
          height: 40px
          text-align: right
          color: #3387e9
          font-size: 12px
          transform: translateY(-50%)
          &.iscode
            color: #969696
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
</style>
