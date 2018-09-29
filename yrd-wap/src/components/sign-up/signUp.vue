<template>
  <div class="sign-up-wrapper">
    <div class="sign-header-wrapper">
      <img src="./bg.jpg" width="100%">
      <div class="sign-header-ct">
        <p class="sign-header-ct-txt">新用户福利</p>
        <p class="sign-header-ct-txt">注册即送<span class="fwb">1888</span>元现金红包</p>
      </div>
      <m-header class="sign-header" :titleTxt="titleTxt" :isShow="isShow" :whiteIcon="whiteIcon" :opcity="opcity"></m-header>
    </div>
    <div class="sign-content">
      <div class="sign-nav-btn border-1px-b">
        <div class="sign-nav-item" :class="{'seled': userType === 'invest'}" @click="selectUserType('invest')">
          <span class="in-bk">出借人</span>
        </div>
        <div class="sign-nav-item" :class="{'seled': userType === 'jk'}" @click="selectUserType('jk')">
          <span class="in-bk">借款人</span>
        </div>
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userName" placeholder="请输入手机号码" @keyup="checkIpVal" maxLength="11">
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userCode" placeholder="请输入验证码" @keyup="checkCodeVal">
        <span class="get-code-btn" :class="{'iscode': !codeClick}" @click.stop.prevent="getCode" v-html="codeTxt"></span>
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="password" @focus="ipFocus" v-model="password" placeholder="请输入8-16位字母加字数登录密码" @keyup="checkPdVal" v-show="!islookpd">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="password" placeholder="请输入8-16位字母加字数登录密码" @keyup="checkPdVal" v-show="islookpd">
        <span class="look-pd-btn" :class="{'islook': islookpd}" @click.stop.prevent="lookPw"></span>
      </div>
      <div class="sign-input-item border-1px-b">
        <input class="sign-input" type="text" @focus="ipFocus" v-model="userInviter" placeholder="填写客服顾问工号或手机号（选填）" @keyup="checkInviterVal" maxLength="11">
      </div>
      <div class="sign-err" v-html="errTxt"></div>
      <div class="sign-btn" @click="signMethods(userName, password, userCode, userType)">立即领取红包</div>
      <p class="sign-rest-btn">
        <span class="rest-btn">注册代表同意</span>
        <a href="/dist/Agreement.html" class="rest-btn sign-deal-btn">《有人贷服务协议》</a>
        <a class="rest-btn sign-deal-btn">、</a>
        <a href="/dist/privacy.html" class="rest-btn sign-deal-btn">《有人贷隐私条款》</a>
      </p>
    </div>
    <p class="sign-desc-b">
      <span class="rest-btn">已有账户？</span>
      <router-link tag="span" class="rest-btn sign-in-btn" to="/signIn">立即登录</router-link>
    </p>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import {getCodeNumber, checkTel, signIn, signUp} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '注册',
        isShow: false,
        codeTxt: '获取验证码',
        errTxt: '',
        userName: '',
        userCode: '',
        password: '',
        userInviter: '',
        userType: 'invest',
        whiteIcon: true,
        islookpd: false,
        codeClick: true,
        mdNum: '',
        codeTime: 60,
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
      checkCodeVal () {
        this.userCode = this.check(this.userCode)
      },
      checkInviterVal () {
        this.userInviter = this.check(this.userInviter)
      },
      selectUserType (str) {
        this.userType = str
      },
      getCode () {
        if (!this.codeClick) {
          return
        }
        if (!this._phone()) {
          return
        }
        this.codeClickErr()
        checkTel(this.userName).then((res) => {
          if (!res.status) {
            this.signErr(res.msg)
            this.codeClickOk()
          } else {
            this.mdNum = res.mdNum
            getCodeNumber(this.userName, this.mdNum).then((data) => {
              const debug = process.env.NODE_ENV !== 'production'
              if (debug) {
                if (data.flag) {
                  this.codeClickErr()
                  this.setInterFuc()
                } else {
                  this.signErr(data.msg)
                  this.codeClickOk()
                }
                return
              }
              if (data.ret_code === '1') {
                this.codeClickErr()
                this.setInterFuc()
              } else {
                this.signErr(data.ret_msg)
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
      signMethods (phoneNumber, passWord, code, userType) {
        if (!this._phone()) {
          return
        }
        if (!this._code()) {
          return
        }
        if (!this._password()) {
          return
        }
        signUp(phoneNumber, code, this.$route.params.id, userType, passWord).then((res) => {
          if (res.ret_code === '1') {
            const _this = this
            signIn(phoneNumber, passWord, '').then((signRes) => {
              if (signRes.ret_code === '1') {
                _this.changeLoginState(signRes.ret_set.user_id)
                if (_this.changeReturnPath === '') {
                  _this.$router.replace('/')
                  return
                }
                _this.$router.replace(this.changeReturnPath)
              } else {
                _this.$router.replace('/signIn')
              }
            })
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
  .sign-up-wrapper
    display: flex
    min-height: 100vh
    flex-direction: column
    background-color: #fff
    .sign-header-wrapper
      position: relative
      .sign-header-ct
        position: absolute
        top: 42%
        left: 0
        right: 0
        transform: translateY(-50%)
        text-align: center
        color: #fff
        .sign-header-ct-txt
          line-height: 36px
          font-size: 18px
          .fwb
            font-size: 24px
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
      .sign-nav-btn
        display: flex
        border-1px-b(#ebebeb)
        .sign-nav-item
          flex: 1
          position: relative
          text-align: center
          font-size: 0
          &.seled
            &:before
              position: absolute
              left: 0
              bottom: -1px
              content: ''
              width: 100%
              height: 5px
              bg-image('seled')
              background-position: center
              background-size: auto 5px
              z-index: 10
            .in-bk
              color: #ff4e49
              bg-image('y-ic')
          .in-bk
            display: inline-block
            line-height: 50px
            padding-left: 17px
            font-size: 15px
            color: #646464
            bg-image('n-ic')
            background-position: left center
            background-size: 12px 12px
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
      .sign-rest-btn
        font-size: 0
        .rest-btn
          display: inline-block
          line-height: 36px
          padding: 0 1px
          font-size: 12px
          color: #646464
          &.sign-deal-btn
            color: #3387e9
    .sign-desc-b
      width: 100%
      font-size: 0
      height: 50px
      line-height: 50px
      text-align: center
      color: #969696
      .rest-btn
        display: inline-block
        font-size: 12px
        color: #646464
        &.sign-in-btn
          color: #3387e9
</style>
