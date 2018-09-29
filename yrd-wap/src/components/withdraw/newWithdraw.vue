<template>
  <div class="withdraw-wrapper" @touchmove.prevent>
    <m-header :isShow="isShow" :opcity="opcity" :titleTxt="titleTxt" @logined="logined"></m-header>
    <access
      ref="accessEl"
      :accessTitle="accessTitle"
      :recordTitle="recordTitle"
      :airTxt="airTxt"
      :airBtnTxt="airBtnTxt"
      :accessList="accessList"
      :hasMore="hasMore"
      :caveatText="caveatText"
      :descTxt="descTxt"
      :isWith="isWith"
      @getSum="getSum"
      @loadMore="loadMore"
      @lookWithRule="lookWithRule"
      @airBtnMethod="airBtnMethod"
    >
      <div class="recharge-slot" slot="recharge-tle">
        <div class="recharge-slot-item border-1px-b">
          <div class="recharge-balance">
            <span class="recharge-balance-num" v-html="checkVal(userInfo.activity)"></span>
          </div>
          <p class="recharge-balance-desc">可用提现余额 (元)</p>
        </div>
        <div class="recharge-slot-item border-1px-b" v-if="bankName.length > 0">
          <div class="recharge-bank">
            <div class="recharge-bank-name">
              <span class="recharge-bank-logo-wrapper">
                <img :src="bankLogo" class="recharge-bank-logo">
              </span>
              <span class="recharge-bank-tle" v-html="bankName"></span>
            </div>
            <div class="recharge-bank-code">到账银行</div>
          </div>
        </div>
      </div>
      <div class="access-record-list" slot="record-list" v-show="accessList.length && accessList.length > 0">
        <ul class="record-list border-1px-b" v-for="item in accessList">
          <li class="record-item">
            <span class="name">提现编号</span>
            <span class="text">{{item.withdrawalReqNo}}</span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text">{{item.createdDate}}</span>
          </li>
          <li class="record-item">
            <span class="name">提现金额</span>
            <span class="text">{{checkVal(item.withdrawalMoney + '')}}元</span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl">{{checkVal(item.actualMoney  + '')}}元</span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text">{{item.statusCode}}</span>
          </li>
        </ul>
      </div>
    </access>
    <transition name="confirm-fade">
      <div class="confirm" v-show="showFlag">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <h3 class="cc-tle border-1px-b">提现规则</h3>
            <p class="text">
              <span class="cc-util">1、</span>
              <span class="cc-txt">成功开通新网银行存管账户并绑定银行卡后，才能进行提现操作</span>
            </p>
            <p class="text">
              <span class="cc-util">2、</span>
              <span class="cc-txt">
                <span class="cc-txt-1">单笔≥2万元的提现，提现手续费由平台补贴用户；</span>
                <span class="cc-txt-1">单笔＜2万元的提现，第三方会收取用户每笔2元提现手续费；</span>
              </span>
            </p>
            <p class="text">
              <span class="cc-util">3、</span>
              <span class="cc-txt">受理中到出款中为提现处理时间 <span class="fwbc">(T+1天)</span> , 出款中到已完成为具体到 账时间（以银行接收时间为准）。</span>
            </p>
          </div>
          <span class="close-btn" @click.stop="hide"></span>
        </div>
      </div>
    </transition>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
    <a :href="threePagelink" id="threePagelink"></a>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Access from 'base/access/access'
  import FootBtn from 'base/foot-btn/foot-btn'
  import storage from 'good-storage'
  import {userWithdrawal, withdrawalRecord, userCenter, rechargeCall} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        titleTxt: '提现',
        opcity: 1,
        accessTitle: '提现金额',
        recordTitle: '提现记录',
        airTxt: '先进行出借体验吧！',
        airBtnTxt: '立即出借',
        submitBtnTxt: '确认提现',
        descTxt: '请输入提现金额 (元)',
        page: 1,
        rows: 5,
        accessList: [],
        hasMore: true,
        caveatText: '',
        userInfo: {},
        user_id: '',
        bankLimitTxt: '',
        bankCode: '',
        bankLogo: '',
        bankName: '',
        rechargeCallData: {},
        isWith: true,
        showFlag: false,
        threePagelink: ''
      }
    },
    created () {
      this._withdrawalRecord()
    },
    activated () {
      this._withdrawalRecord()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      lookWithRule () {
        this.show()
      },
      getSum(val) {
        this.money = val
      },
      submitFuc() {
        if (!this.rechargeCallData.bankCardNo || this.rechargeCallData.bankCardNo.length < 1) {
          this.caveatText = '你还未绑定银行卡<br/>请先去绑卡'
          this.$refs.accessEl.caveat()
          return
        }
        this.money = parseFloat(this.money)
        if (!this.money) {
          this.caveatText = '请输入提现金额'
          this.$refs.accessEl.caveat()
          return
        }
        if (this.money < 100) {
          this.caveatText = '最低提现<br/>金额为100元'
          this.$refs.accessEl.caveat()
          return
        }
        const _this = this
        userWithdrawal(_this.user_id, _this.money).then((res) => {
          if (res.status === 'success') {
            storage.set('SECHARGE', res.data1.form)
            this.threePagelink = '/dist/withdraw.html'
            setTimeout(() => {
              document.getElementById('threePagelink').click()
            }, 20)
            return
          }
          this.caveatText = res.msg
          this.$refs.accessEl.caveat()
        })
      },
      logined (res) {
        if (res.usernameCh && res.usernameCh !== '') {
          this.realNameOk = true
          setTimeout(() => {
            this.$refs.accessEl.refresh()
          }, 20)
        }
        this.user_id = res.user_Id
        this._getUser()
        const _this = this
        rechargeCall(_this.user_id).then((res) => {
          this.rechargeCallData = res
          if (res.bankLimt && res.bankLimt.length > 0) {
            const bankCardNo = res.bankCardNo
            const len = bankCardNo.length
            this.bankCode = '**** **** **** ' + bankCardNo.substr(len - 4, len)
            this.bankName = res.bankLimt[0].bankName + '银行'
            this.bankLogo = res.bankLimt[0].icons
            this.bankLimitTxt = res.bankLimt[0].remarks
          }
        })
      },
      loadMore() {
        if (!this.hasMore) {
          return
        }

        this.page++
        withdrawalRecord(this.changeLoginState, this.page, this.rows).then((res) => {
          this.accessList = this.accessList.concat(res.rows)
          this._checkMore(res)
        })
      },
      airBtnMethod() {
        this.$router.push('/product-list')
      },
      checkVal (sum) {
        if (!sum) return
        let flostNum = ''
        const indexD = sum.split('.')
        if (!indexD[1]) {
          flostNum = '00'
        } else {
          flostNum = indexD[1] + '00'
        }
        let ret = indexD[0] + '.' + flostNum
        return ret.substring(0, indexD[0].length + 3)
      },
      _withdrawalRecord() {
        this.page = 1
        this.hasMore = true
        withdrawalRecord(this.changeLoginState, this.page, this.rows).then((res) => {
          this.accessList = res.rows
          this._checkMore(res)
        })
      },
      _checkMore (data) {
        const rows = data.rows
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      },
      _getUser () {
        const _this = this
        userCenter(_this.user_id).then((res) => {
          this.userInfo = res.ret_set
        })
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

  .withdraw-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .recharge-slot
      padding: 0 20px
      background-color: #FFF
      .recharge-slot-item
        padding: 20px 0
        text-align: center
        font-size: 0
        border-1px-b(#f0f0f0)
        .recharge-slot-item-tle
          line-height: 20px
          margin-top: -3px
          padding-bottom: 17px
          font-size: $font-size-medium
          color: $color-tle
          text-align: left
        .recharge-pay-type
          position: relative
          padding: 20px 0 20px
          &.border-1px-b
            padding-top: 0 
            border-1px-b(#f5f5f5)
            .recharge-pay-type-btn
              top: 5px
          .recharge-pay-type-btn
            display: flex
            align-items: center
            justify-content: center
            position: absolute
            right: 0
            top: 25px
            width: 14px
            height: 14px
            border-radius: 50%
            border: 1px solid #f0f0f0
            .recharge-pay-type-sel
              width: 8px
              height: 8px
              border-radius: 50%
              &.seled
                background-color: #ff4e49
        .recharge-pay-type-desc
          padding-top: 15px
          border-1px(#f5f5f5)
          color: #ff4d4a
          font-size: 12px
        .recharge-bank
          position: relative
          .recharge-bank-name
            display: flex
            align-items: center
            .recharge-bank-logo-wrapper
              display: flex
              align-items: center
              justify-content: center
              margin-right: 20px
              width: 30px
              height: 30px
              border-radius: 15px
              border: 1px solid #f5f5f5
              .recharge-bank-logo
                width: 20px
            .recharge-bank-tle
              font-size: 14px
          .recharge-bank-code
            position: absolute
            right: 0
            top: 50%
            width: 100%
            line-height: 40px
            margin-top: -20px
            font-size: 14px
            color: #464646
            text-align: right
        .recharge-balance-num
          display: inline-block
          line-height: 45px
          font-size: 35px
          color: #ff4e49
          vertical-align: middle
        .recharge-balance-unit
          display: inline-block
          line-height: 55px
          height: 45px
          padding-left: 3px
          font-size: 15px
          color: #ff4e49
          vertical-align: middle
        .recharge-balance-desc
          line-height: 24px
          font-size: 14px
          color: #464646
    .confirm
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 998
      background-color: $color-background-d
      &.confirm-fade-enter-active
        animation: confirm-fadein 0.3s
        .confirm-content
          animation: confirm-zoom 0.3s
      .confirm-wrapper
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        z-index: 999
        overflow: hidden
        .close-btn
          display: block
          position: absolute
          top: 0
          right: 0
          width: 40px
          height: 40px
          bg-image('close')
          background-position: right top
          background-size: 23px
        .confirm-content
          width: 270px
          padding: 24px 0
          border-radius: 13px
          background: $color-text
          .cc-tle
            padding-bottom: 24px
            line-height: 20px
            margin-bottom: 24px
            border-1px-b(#f5f5f5)
            font-size: 14px
            text-align: center
          .text
            display: flex
            padding: 0 10px
            line-height: 24px
            font-size: 12px
            color: #969696
            .cc-util
              flex: 0 0 20px
              width: 20px
            .cc-txt
              flex: 1
              .fwbc
                color: #ff4e49
                font-weight: bold
              .cc-txt-1
                display: block
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
