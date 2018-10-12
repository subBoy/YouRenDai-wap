<template>
  <div class="recharge-wrapper border-none" @touchmove.prevent>
    <m-header :isShow="isShow" :opcity="opcity" :titleTxt="titleTxt" @logined="logined"></m-header>
    <a id="three-link-btn" href="/dist/air.html"></a>
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
      @getSum="getSum"
      @loadMore="loadMore"
      @airBtnMethod="airBtnMethod"
    >
      <div class="recharge-slot" slot="recharge-tle">
        <div class="recharge-slot-item border-1px-b">
          <div class="recharge-balance">
            <span class="recharge-balance-num" v-html="checkVal(userInfo.activity)"></span>
            <span class="recharge-balance-unit">元</span>
          </div>
          <p class="recharge-balance-desc">可用余额</p>
        </div>
        <div class="recharge-slot-item border-1px-b" v-if="bankName.length > 0">
          <div class="recharge-bank">
            <div class="recharge-bank-name">
              <span class="recharge-bank-logo-wrapper">
                <img :src="bankLogo" class="recharge-bank-logo">
              </span>
              <span class="recharge-bank-tle" v-html="bankName"></span>
            </div>
            <div class="recharge-bank-code" v-html="bankCode"></div>
          </div>
        </div>
      </div>
      <!-- <div class="access-input" slot="recharge-code">
        <div class="access-input-box border-b-none">
          <span class="title">短信验证</span>
          <div class="input-box">
            <div class="input-box-wrapper">
              <input class="access-input-sum" type="tel" v-model="verificationCode" maxLength="8" placeholder="请输入验证码">
            </div>
          </div>
          <div class="recharge-input-code-btn" :class="{'not-click': !codeClick}" v-html="codeBtnTxt" @click.stop="getRhCode"></div>
        </div>
      </div> -->
      <div class="access-record-list" slot="record-list" v-show="accessList.length && accessList.length > 0">
        <ul class="record-list border-1px-b" v-for="item in accessList">
          <li class="record-item">
            <span class="name">订单编号</span>
            <span class="text">{{item.orderCode}}</span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text">{{item.rechargeDate}}</span>
          </li>
          <li class="record-item">
            <span class="name">充值金额</span>
            <span class="text">{{checkVal(item.rechargeMoney + '')}}元</span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl">{{checkVal(item.rechargeMoney + '')}}元</span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text">{{item.status}}</span>
          </li>
          <li class="record-item border-1px" v-if="item.status === '等待支付'">
            <span class="btn styl" @click="closeItem(item)">取消支付</span>
            <span class="btn" @click="continueItem(item)">继续支付</span>
          </li>
        </ul>
      </div>
    </access>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Access from 'base/access/access'
  import FootBtn from 'base/foot-btn/foot-btn'
  import storage from 'good-storage'
  import {userRecharge, rechargeRecord, closeRecharge, continueRecharge, userCenter, rechargeCall, getRechargeCode} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        seled: true,
        payType: 'ALLINPAY',
        isShow: false,
        titleTxt: '充值',
        opcity: 1,
        realNameOk: false,
        accessTitle: '充值金额',
        codeBtnTxt: '获取验证码',
        recordTitle: '充值记录',
        airTxt: '先进行充值体验吧！',
        airBtnTxt: '立即充值',
        submitBtnTxt: '确认充值',
        descTxt: '请输入充值金额 (元)',
        money: 0,
        realName: '',
        idCard: '',
        mobilePhone: '',
        verificationCode: '',
        page: 1,
        rows: 5,
        accessList: [],
        hasMore: true,
        caveatText: '',
        codeTime: 60,
        codeClick: true,
        userInfo: {},
        user_id: '',
        bankLimitTxt: '',
        bankCode: '',
        bankLogo: '',
        bankName: '',
        rechargeCallData: {}
      }
    },
    created () {
      this._rechargeRecord()
    },
    activated () {
      this._rechargeRecord()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      submitFuc() {
        if (!this.rechargeCallData.bankCardNo || this.rechargeCallData.bankCardNo.length < 1) {
          this.caveatText = '你还未绑定银行卡<br/>请先去绑卡'
          this.caveat()
          return
        }
        this.money = parseFloat(this.money)
        if (!this.money) {
          this.caveatText = '请输入充值金额'
          this.caveat()
          return
        }
        if (this.money < 100) {
          this.caveatText = '充值金额不能小于100元'
          this.caveat()
          return
        }
        // if (!this.verificationCode) {
        //   this.caveatText = '请输入验证码'
        //   this.caveat()
        //   return
        // }
        if (!this.realNameOk) {
          const reg = /^[\u4e00-\u9fa5]+$/gi

          const reg2 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

          const reg3 = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/

          if (!this.realName || this.realName === '') {
            this.caveatText = '真实姓名不能为空！'
            this.caveat()
            return
          }

          if (!reg.test(this.realName)) {
            this.caveatText = '请输入中文名字！'
            this.caveat()
            return
          }

          if (this.realName.length < 2 || this.realName.length > 5) {
            this.caveatText = '请输入正确的姓名<br/>（长度2到5个汉字）'
            this.caveat()
            return
          }

          if (this.idCard === '') {
            this.caveatText = '身份证号不能为空'
            this.caveat()
            return
          }

          if (!reg2.test(this.idCard)) {
            this.caveatText = '身份证号格式错误<br/>请核对后重新输入'
            this.caveat()
            return
          }

          if (!reg3.test(this.mobilePhone)) {
            this.caveatText = '手机号码格式错误<br/>请核对后重新输入'
            this.caveat()
            return
          }
        }
        const _this = this
        userRecharge(_this.user_id, _this.money, _this.realName, _this.idCard, _this.mobilePhone, _this.verificationCode).then((res) => {
          if (res.status) {
            storage.set('SECHARGE', res.form)
            setTimeout(() => {
              document.getElementById('three-link-btn').click()
            }, 20)
          } else {
            this.caveatText = res.msg
            this.caveat()
          }
        })
      },
      getRhCode () {
        if (!this.rechargeCallData.bankCardNo || this.rechargeCallData.bankCardNo.length < 1) {
          this.caveatText = '你还未绑定银行卡<br/>请先去绑卡'
          this.caveat()
          return
        }
        if (!this.codeClick) {
          return
        }
        const _this = this
        getRechargeCode(_this.user_id).then((res) => {
          if (res.ret_code !== '1') {
            this.caveatText = res.ret_msg
            this.caveat()
            return
          }
          this.setInterFuc()
          this.codeClickErr()
        })
      },
      rechCode () {
        const reg3 = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (!this.codeClick) {
          return
        }

        if (!reg3.test(this.mobilePhone)) {
          this.caveatText = '手机号码格式错误<br/>请核对后重新输入'
          this.caveat()
          return
        }
        this.setInterFuc()
        this.codeClickErr()
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
        this.codeBtnTxt = `重新获取 (${this.codeTime})`
        if (this.codeTime < 1) {
          clearInterval(this.setInter)
          this.codeTime = 60
          this.codeBtnTxt = '重新发送'
          this.codeClickOk()
        }
      },
      closeItem(item) {
        closeRecharge(item.orderCode).then((res) => {
          if (res.msg) {
            for (let i = 0; i < this.accessList.length; i++) {
              if (this.accessList[i].orderCode === item.orderCode) {
                this.accessList.splice(i, 1)
              }
            }
          }
        })
      },
      continueItem(item) {
        continueRecharge(item.rechargeMoney, item.orderCode).then((res) => {
          if (res.status) {
            storage.set('SECHARGE', res.form)
            setTimeout(() => {
              document.getElementById('three-link-btn').click()
            }, 20)
          }
        })
      },
      getSum(sum) {
        this.money = sum
      },
      logined(res) {
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
        const _this = this
        rechargeRecord(_this.changeLoginState, _this.page, _this.rows).then((res) => {
          this.accessList = this.accessList.concat(res.rows)
          this._checkMore(res)
        })
      },
      airBtnMethod() {
        this.submitFuc()
      },
      caveat () {
        this.$refs.accessEl.caveat()
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
      seledFuc (num) {
        if (num === 0) {
          this.seled = true
          this.payType = 'ALLINPAY'
          if (this.rechargeCallData.bankLimt[0]) {
            this.bankLimitTxt = this.rechargeCallData.bankLimt[0].remarks
          } else {
            this.bankLimitTxt = ''
          }
          return
        }
        if (num === 1) {
          this.seled = false
          this.payType = 'FUIOU'
          if (this.rechargeCallData.bankLimt[1]) {
            this.bankLimitTxt = this.rechargeCallData.bankLimt[1].remarks
          } else {
            this.bankLimitTxt = ''
          }
          return
        }
      },
      _rechargeRecord () {
        this.page = 1
        this.hasMore = true
        rechargeRecord(this.changeLoginState, this.page, this.rows).then((res) => {
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

  .recharge-wrapper
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
    .access-wrapper .access-scroll .access-group .access-input
      padding: 0 20px
    .access-wrapper .access-scroll .access-group .access-input .access-input-box
      padding: 20px 0
      border-1px-b(#f0f0f0)
    .access-wrapper .access-scroll .access-group .access-input .border-b-none
      padding: 20px 0
      border-1px-b(#fff)
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
                flex: 0 0 96px
                line-height: 30px
                height: 30px
                text-align: center
                width: 96px
                color: $color-tle
                font-size: $font-size-small
                background-color: #f0f0f0
</style>
