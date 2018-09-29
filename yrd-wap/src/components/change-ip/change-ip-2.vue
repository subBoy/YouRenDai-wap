<template>    
  <div class="change-ip-wrapper">
    <m-header class="change-ip-mh" :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="setUserInfo"></m-header>
    <div class="set-work-list">
      <div class="work-item">
        <span class="service-name">已向{{userIp}}手机号发送了验证码，请注意查收短信</span>
      </div>
    </div>
    <div class="set-work-list">
      <div class="work-item hasRightBtn">
        <span class="service-name">
          <input type="text" class="code-inp" v-model="codeInp" placeholder="请输入验证码">
        </span>
        <span class="service-info" @click.stop="getCode">
          <span class="seio-txt" :class="{'n-click': !codeClick}" v-html="codeTxt"></span>
        </span>
      </div>
    </div>
    <div class="change-ip-btn" @click="changIp"><span class="change-ip-btn-txt">确定</span></div>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import {getChangeCode, getChangeIp} from 'api/user'
  import TopTip from 'base/top-tip/top-tip'

  export default {
    data() {
      return {
        titleTxt: '更改绑定手机号码',
        isShow: false,
        opcity: 1,
        userIp: '',
        codeInp: '',
        codeTxt: '获取验证码',
        codeTime: 60,
        loginName: '',
        topTipTxt: '',
        codeClick: true
      }
    },
    methods: {
      changIp () {
        const _this = this
        if (!_this.codeInp) {
          this.topTipTxt = '请输入验证码'
          this.$refs.topTip.show()
          return
        }
        getChangeIp(_this.loginName, _this.codeInp).then((res) => {
          if (res.ret_code !== '1') {
            _this.topTipTxt = res.ret_msg
            _this.$refs.topTip.show()
            return
          }
          this.$router.push({
            path: '/change-ip/step3'
          })
        })
      },
      getCode () {
        if (!this.codeClick) {
          return
        }
        const _this = this
        getChangeCode(_this.loginName, _this.loginName).then((res) => {
          if (res.ret_code === '1') {
            this.codeClickErr()
            this.setInterFuc()
          }
        })
      },
      setUserInfo (res) {
        this.loginName = res.mobile
        this.getCode()
        this.userIp = `${res.mobile.substr(0, 3)}****${res.mobile.substr(res.mobile.length - 4, 4)}`
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
          this.codeTxt = '重新获取'
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
        &.hasRightBtn
          position: relative
          .service-name
            display: block
            width: 100%
            .code-inp
              width: 100%
              height: 44px
          .service-info
            display: block
            position: absolute
            right: 0
            top: 0
        .service-name
          font-size: 12px
          color: #646464;
        .service-info
          float: right
          .seio-txt
            font-size: 12px
            color: #ff4e49;
            &.n-click
              color: #c8c8c8
</style>
