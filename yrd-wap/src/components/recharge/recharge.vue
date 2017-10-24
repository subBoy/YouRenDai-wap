<template>
  <div class="recharge-wrapper">
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
      @getSum="getSum"
      @loadMore="loadMore"
      @airBtnMethod="airBtnMethod"
    >
      <div v-if="!realNameOk" class="not-real-name-wrapper" slot="recharge">
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
                    <input type="text" class="info-input" v-model="realName" placeholder="请输入姓名">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">身份证号</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" v-model="idCard" placeholder="请输入身份证号">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">手机号</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" v-model="mobilePhone" maxLength="11" placeholder="请输入手机号">
                  </span>
                </div>
              </li>
              <li class="real-name-info-item border-1px-b">
                <p class="desc">验证码</p>
                <div class="info-input-wrapper">
                  <span class="info-input-group">
                    <input type="text" class="info-input" v-model="verificationCode" placeholder="请输入验证码">
                  </span>
                  <span class="btn-code" @click="rechCode">{{codeBtnTxt}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="styl"></div>
        </div>
      </div>
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
            <span class="text">{{item.rechargeMoney}}</span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl">{{item.rechargeMoney}}</span>
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
  import {userRecharge, rechargeRecord, closeRecharge, continueRecharge} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        titleTxt: '充值',
        opcity: 1,
        realNameOk: false,
        accessTitle: '充值金额',
        codeBtnTxt: '发送验证',
        recordTitle: '充值记录',
        airTxt: '先进行充值体验吧！',
        airBtnTxt: '立即充值',
        submitBtnTxt: '确认充值',
        descTxt: '点击输入充值金额',
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
        codeClick: true
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
        this.money = parseFloat(this.money)
        if (!this.money) {
          this.caveatText = '请输入充值金额'
          this.caveat()
          return
        }
        if (this.money < 0.01) {
          this.caveatText = '充值金额不能小于0.01元'
          this.caveat()
          return
        }
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
            this.caveatText = '请输入正确的姓名（长度2到5个汉字）！'
            this.caveat()
            return
          }

          if (this.idCard === '') {
            this.caveatText = '身份证号不能为空！'
            this.caveat()
            return
          }

          if (!reg2.test(this.idCard)) {
            this.caveatText = '身份证号格式错误, 请核对后重新输入！'
            this.caveat()
            return
          }

          if (!reg3.test(this.mobilePhone)) {
            this.caveatText = '手机号码格式错误, 请核对后重新输入！'
            this.caveat()
            return
          }
        }
        userRecharge(this.money, this.realName, this.idCard, this.mobilePhone, this.verificationCode).then((res) => {
          if (res.status) {
            storage.set('SECHARGE', res.form)
            location.href = '/dist/air.html'
          } else {
            this.caveatText = res.msg
            this.caveat()
          }
        })
      },
      rechCode() {
        const reg3 = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (!this.codeClick) {
          return
        }

        if (!reg3.test(this.mobilePhone)) {
          this.caveatText = '手机号码格式错误, 请核对后重新输入！'
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
        this.codeBtnTxt = `${this.codeTime}后重试`
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
            location.href = '/dist/air.html'
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
      },
      loadMore() {
        if (!this.hasMore) {
          return
        }

        this.page++
        rechargeRecord(this.changeLoginState, this.page, this.rows).then((res) => {
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
      _rechargeRecord() {
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
