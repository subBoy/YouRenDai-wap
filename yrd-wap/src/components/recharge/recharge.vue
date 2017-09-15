<template>
  <div class="recharge-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :titleTxt="titleTxt"></m-header>
    <access
      :accessTitle="accessTitle"
      :recordTitle="recordTitle"
      :airTxt="airTxt"
      :airBtnTxt="airBtnTxt"
    >
      <div v-if="!realName" class="not-real-name-wrapper" slot="recharge">
        <div class="desc-text">
          <p class="prompt-focus">同一手机号只能绑定一张银行卡</p>
          <p class="prompt">该号码必须为银行预留手机号</p>
          <p class="prompt">且保证卡余额充足</p>
        </div>
        <div class="real-name-wrapper">
          <div class="real-name-group">
            <ul class="real-name-info-list">
              <li class="real-name-info-item border-1px-b">
                <p class="desc">姓名</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" placeholder="请输入姓名">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">身份证号</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" placeholder="请输入身份证号">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">手机号</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" placeholder="请输入手机号">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">验证码</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" placeholder="请输入验证码">
                  </span>
                  <span class="btn-code">{{codeBtnTxt}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="styl"></div>
        </div>
      </div>
      <div class="access-record-list" slot="record-list">
        <ul class="record-list border-1px-b">
          <li class="record-item">
            <span class="name">订单编号</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">充值金额</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl"></span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text">待支付</span>
          </li>
          <li class="record-item border-1px">
            <span class="btn styl">取消支付</span>
            <span class="btn">继续支付</span>
          </li>
        </ul>
        <ul class="record-list border-1px-b">
          <li class="record-item">
            <span class="name">订单编号</span>
            <span class="text">201709061528</span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text">2017-09-06 15:28:00</span>
          </li>
          <li class="record-item">
            <span class="name">充值金额</span>
            <span class="text">￥100.00</span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl">￥100.00</span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text">已处理</span>
          </li>
        </ul>
      </div>
    </access>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Access from 'base/access/access'
  import FootBtn from 'base/foot-btn/foot-btn'

  export default {
    data() {
      return {
        isShow: false,
        titleTxt: '充值',
        opcity: 1,
        realName: false,
        accessTitle: '充值金额',
        codeBtnTxt: '发送验证',
        recordTitle: '充值记录',
        airTxt: '先进行充值体验吧！',
        airBtnTxt: '立即充值',
        submitBtnTxt: '确认充值'
      }
    },
    methods: {
      submitFuc() {
        this.$router.push('/user-center/recharge/recharge-success')
      }
    },
    components: {
      MHeader,
      Access,
      FootBtn
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .recharge-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .not-real-name-wrapper
      margin: 0 20px
      padding-bottom: 5px
      .desc-text
        padding-bottom: 16px
        .prompt-focus
          line-height: 20px
          padding: 10px 0 6px 0
          font-size: $font-size-large-z
          color: $color-tle
        .prompt
          line-height: 16px
          font-size: $font-size-small
          color: $color-tle
      .real-name-wrapper
        position: relative
        .styl
          position: absolute
          left: 10%
          bottom: -6px
          width: 80%
          height: 6px
          background-color: #f0f0f0
          z-index: -1
        .real-name-group
          box-shadow: 0px 0px 10px -1px #f0f0f0
          background-color: $color-text
          .real-name-info-list
            padding:0 20px
            .real-name-info-item
              border-1px-b(#f5f5f5)
              padding: 10px 0
            .desc
              line-height: 34px
              margin-bottom: 10px
              font-size: $font-size-medium
              color: $color-q
            .info-input-wrapper
              display: flex
              .info-input-group
                flex: 1
                .info-input
                  width: 100%
                  line-height: 30px
                  height: 30px
                  font-size: $font-size-medium
                  color: $color-tle
                  outline: none
              .btn-code
                flex: 0 0 70px
                line-height: 30px
                height: 30px
                text-align: center
                width: 70px
                color: $color-tle
                font-size: $font-size-small
                background-color: #f0f0f0
</style>
