<template>
  <div class="change-pd-wrapper">
    <m-header class="change-ip-mh" :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="setUserInfo"></m-header>
    <div class="change-pd-ctr">
      <div class="set-work-list">
        <div class="work-item border-1px-b">
          <span class="service-name">原密码:</span>
          <span class="service-input">
            <input type="password" class="code-inp" v-model="userOldPd" placeholder="(请输入原密码)">
          </span>
        </div>
        <div class="work-item border-1px-b">
          <span class="service-name">新密码:</span>
          <span class="service-input">
            <input type="password" class="code-inp" v-model="userNewPd" placeholder="(请输入8-16位新密码)">
          </span>
        </div>
        <div class="work-item border-1px-b">
          <span class="service-name">确认密码:</span>
          <span class="service-input">
            <input type="password" class="code-inp" v-model="userNewPd2" placeholder="(请再次输入新密码)">
          </span>
        </div>
        <div class="work-item-wrapper">
          <div class="work-item border-1px-b bbn hasRightBtn">
            <span class="service-name">验证码:</span>
            <span class="service-input">
              <input type="text" class="code-inp" v-model="codeInp" placeholder="(请输入验证码)">
            </span>
          </div>
          <span class="service-info" @click.stop="getSignImgFuc">
            <span class="seio-txt" v-html="codeTxt"></span>
          </span>
        </div>
      </div>
      <div class="change-pd-btn" @click="changeUserPd"><span class="change-ip-btn-txt">确认修改</span></div>
      <div class="change-pd-desc-wrwapper">
        <p class="change-pd-desc-txt">温馨提示：请您定期更换登录密码，确保账户安全。</p>
      </div>
    </div>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import TopTip from 'base/top-tip/top-tip'
  import {chengeSignPd, getSignImg} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '修改密码',
        isShow: false,
        opcity: 1,
        userOldPd: '',
        userNewPd: '',
        userNewPd2: '',
        codeInp: '',
        codeTxt: '',
        topTipTxt: '',
        userInfoObj: {}
      }
    },
    methods: {
      getSignImgFuc () {
        const _this = this
        getSignImg(_this.userInfoObj.user_Id).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = '获取图片验证码失败'
            this.$refs.topTip.show()
            return
          }
          this.codeTxt = res.ret_set.ret_checkCode
        })
      },
      changeUserPd () {
        if (!this.userOldPd) {
          this.topTipTxt = '请输入原密码'
          this.$refs.topTip.show()
          return
        }
        if (!this.userNewPd) {
          this.topTipTxt = '请输入新密码'
          this.$refs.topTip.show()
          return
        }
        if (!this.userNewPd2) {
          this.topTipTxt = '请输入确认密码'
          this.$refs.topTip.show()
          return
        }
        if (!this.codeInp) {
          this.topTipTxt = '请输入验证码'
          this.$refs.topTip.show()
          return
        }
        const _this = this
        chengeSignPd(_this.userInfoObj.user_Id, _this.codeInp, _this.userOldPd, _this.userNewPd, _this.userNewPd2).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.$router.push({
            path: '/user-center'
          })
        })
      },
      setUserInfo (res) {
        this.userInfoObj = res
        this.getSignImgFuc()
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
  .change-pd-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    .change-pd-ctr
      position: relative
      min-height: 100%
      box-sizing: border-box
      padding: 44px 0
    .change-pd-desc-wrwapper
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: 44px
      .change-pd-desc-txt
        display: inline-block
        line-height: 20px
        padding: 0px 3px 0px 13px
        border-radius: 10px
        border: 1px solid #ff4e49
        color: #ff4e49
        font-size: 12px
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .change-ip-mh 
      position: fixed!important
      left: 0
      top: 0
      width: 100%
    .change-pd-btn
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
      .work-item-wrapper
        position: relative
      .work-item
        display: flex
        align-items: center
        margin: 0 10px
        line-height: 44px
        height: 44px
        background-color: $color-text
        font-size: $font-size-medium
        border-1px-b(#f5f5f5)
        position: relative
        .service-name
          flex: 0 0 70px
          display: block
          width: 70px
          margin-right: 10px
          font-size: 14px
          color: #323232;
          letter-spacing: 1px
          text-align: right
        .service-input
          flex: 1
          display: block
          .code-inp
            width: 100%
            height: 44px
            font-size: 12px
            color: #646464;
        &.bbn
          border-1px-b(#fff)
      .service-info
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        right: 10px
        top: 0
        width: 70px
        height: 44px
        .seio-txt
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          padding-left: 2px
          letter-spacing: 2px
          font-style: oblique
          height: 28px
          border-radius: 14px
          font-size: 12px
          color: #fff;
          background-color: #ff4e49
</style>
