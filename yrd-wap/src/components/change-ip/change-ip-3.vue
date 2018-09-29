<template>
  <div class="change-ip-wrapper">
    <m-header class="change-ip-mh" :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="setUserInfo"></m-header>
    <div class="set-work-list">
      <div class="work-item border-1px-b bbn">
        <span class="service-name t-center">为保证您的账号安全，请验证手机</span>
      </div>
    </div>
    <div class="set-work-list">
      <div class="work-item border-1px-b">
        <span class="service-name">
          <input type="text" class="code-inp" maxlength="11" v-model="userInp" placeholder="请输入您的手机号码">
        </span>
      </div>
      <div class="work-item border-1px-b bbn hasRightBtn">
        <span class="service-name">
          <input type="text" class="code-inp" v-model="codeInp" placeholder="请输入验证码">
        </span>
        <span class="service-info" @click.stop="getCode">
          <span class="seio-txt" :class="{'n-click': !codeClick}" v-html="codeTxt"></span>
        </span>
      </div>
    </div>
    <div class="change-ip-btn" :class="{'n-click': notVal}" @click="setNewIpFuc"><span class="change-ip-btn-txt">确定</span></div>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
    <a :href="threePagelink" id="threePagelink"></a>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import TopTip from 'base/top-tip/top-tip'
  import {getNewCode, setNewIp} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '绑定新手机号码',
        isShow: false,
        opcity: 1,
        userInfoObj: '',
        userInp: '',
        codeInp: '',
        codeTxt: '获取验证码',
        topTipTxt: '',
        codeClick: true,
        codeTime: 60,
        threePagelink: ''
      }
    },
    computed: {
      notVal () {
        if (!this.codeInp || !this.userInp) {
          return true
        }
        return false
      }
    },
    methods: {
      setNewIpFuc () {
        if (this.notVal) {
          return
        }
        const _this = this
        setNewIp(this.userInfoObj.user_Id, _this.userInp, _this.codeInp).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.threePagelink = res.ret_set.redirect_url
          setTimeout(() => {
            document.getElementById('threePagelink').click()
          }, 20)
        })
      },
      getCode () {
        if (!this.codeClick) {
          return
        }
        if (!this.userInp) {
          this.topTipTxt = '请输入手机号'
          this.$refs.topTip.show()
          return
        }
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        let mathes = this.userInp.match(reg)
        if (!mathes) {
          this.topTipTxt = '手机号格式错误'
          this.$refs.topTip.show()
          return
        }
        const _this = this
        getNewCode(this.userInfoObj.username, this.userInfoObj.username, _this.userInp).then((res) => {
          if (res.ret_code === '1') {
            this.codeClickErr()
            this.setInterFuc()
            return
          }
          this.topTipTxt = res.ret_msg
          this.$refs.topTip.show()
        })
      },
      setUserInfo (res) {
        this.userInfoObj = res
      },
      setInterFuc () {
        const _this = this
        this.setInter = setInterval(_this.setval, 1000)
      },
      setval () {
        this.codeTime--
        this.codeTxt = `重新获取(${this.codeTime})`
        if (this.codeTime < 1) {
          clearInterval(this.setInter)
          this.codeTime = 60
          this.codeTxt = '重新发送'
          this.codeClickOk()
        }
      },
      codeClickOk () {
        this.codeClick = true
      },
      codeClickErr () {
        this.codeClick = false
      }
    },
    components: {
      MHeader,
      TopTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .change-ip-wrapper
    position: relative
    padding-top: 44px
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .change-ip-mh 
      position: absolute!important
      left: 0
      top: 0
      width: 100%
    .change-ip-btn
      display: flex
      align-items: center
      justify-content: center
      margin: 30px auto
      line-height: 44px
      width: 90%
      background-color: #ff4e49
      text-align: center
      border-radius: 22px
      box-shadow: 0px 5px 5px -6px #ccc
      &.n-click
        background-color: #c8c8c8
      .change-ip-btn-txt
        display: block
        padding-left: 2px
        letter-spacing: 2px
        color: #fff
        font-size: 18px
    .set-work-list
      margin: 10px auto
      width: 90%
      border-radius: 10px
      box-shadow: 0px 5px 5px -6px #ccc
      background-color: #FFF
      .work-item
        margin: 0 10px
        line-height: 44px
        height: 44px
        background-color: $color-text
        font-size: $font-size-medium
        border-1px-b(#f5f5f5)
        position: relative
        .service-name
          display: block
          width: 100%
          font-size: 12px
          color: #646464;
          &.t-center
            display: block
            text-align: center
          .code-inp
            width: 100%
            height: 44px
        .service-info
          display: block
          position: absolute
          right: 0
          top: 0
          .seio-txt
            font-size: 12px
            color: #ff4e49;
            &.n-click
              color: #c8c8c8
        &.bbn
          border-1px-b(#fff)
</style>
