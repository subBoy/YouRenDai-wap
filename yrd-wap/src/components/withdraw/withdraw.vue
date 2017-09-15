<template>
  <div class="withdraw-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :titleTxt="titleTxt"></m-header>
    <access
      :accessTitle="accessTitle"
      :recordTitle="recordTitle"
      :airTxt="airTxt"
      :airBtnTxt="airBtnTxt"
    >
      <div class="access-record-list" slot="record-list">
        <ul class="record-list border-1px-b">
          <li class="record-item">
            <span class="name">提现编号</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">提现金额</span>
            <span class="text"></span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl"></span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text"></span>
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
            <span class="text">已完成</span>
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
        titleTxt: '提现',
        opcity: 1,
        accessTitle: '提现金额',
        recordTitle: '提现记录',
        airTxt: '先进行投资体验吧！',
        airBtnTxt: '立即投标',
        submitBtnTxt: '确认提现'
      }
    },
    methods: {
      submitFuc() {
        this.$router.push('/user-center/withdraw/withdraw-success')
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
  .withdraw-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
</style>
