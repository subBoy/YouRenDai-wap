<template>
  <div class="subscribe-wrapper">
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <div class="subscribe-grounp">
      <div class="subscribe-bar-wrapper">
        <m-header class="subscribe-header-wrapper" :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" :whiteIcon="whiteIcon" @logined="logined"></m-header>
        <div class="user-ct-set-btn-wrapper">
          <a href="/loan/customer_service_wap.shtml" class="user-ct-set-btn-item item-1"></a>
        </div>
        <div class="subscribe-bar">
          <progress-circle :percent="percent">
            <div class="subscribe-return">
              <h3 class="return">{{subscribe.yearRate}}<span class="unti">%</span></h3>
              <p class="desc" @click="show1">年化借款利率</p>
            </div>
          </progress-circle>
        </div>
        <div class="subscribe-info">
          <p class="desc-info">借款期限 <span class="fwb">{{subscribe.limit}}个月</span></p>
          <p class="desc-info styl-flex">起借金额 <span class="fwb">{{subscribe.ascendmoney}}元</span></p>
          <p class="desc-info">剩余出借额 <span class="fwb">{{conversion(subscribe.surplus)}}万元</span></p>
        </div>
        <div class="subscribe-info-2">
          <p class="desc-info">信用等级 <span class="fwb">{{subscribe.borrowerLevel}}</span></p>
          <p class="desc-info">出借人评级 <span class="fwb">{{subscribe.borrowerLevelDesc}}</span></p>
        </div>
      </div>
      <div class="expected-income">
        <div class="income-bar-wrapper" ref="inputSelf"><span class="income-bar"></span></div>
        <div class="expected-income-list" ref="expectedIncomeList">
          <span class="item" v-for="item in incomeList"><em class="icon"></em>{{formatMoney(item)}} <span class="until" v-show="item === incomeList[incomeList.length - 1]">(元)</span></span>
        </div>
        <div class="icon-b">
          <p class="desc-text">{{income.toFixed(2)}}(历史年化借款收益)</p>
        </div>
      </div>
      <div class="invest-amount">
        <div class="invest-input">
          <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
          <div class="input-wrapper">
            <input class="input-self" ref="inputWrapper" :disabled="parseInt(subscribe.surplus) === 0" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
          </div>
          <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
        </div>
        <p class="input-desc">请输入出借金额，{{subscribe.minmoney}}元的整数倍</p>
      </div>
      <ul class="product-info">
        <li class="info-item info-item-1" @click="httpTxt">协议范本</li>
        <li class="info-item info-item-2" @click="productInfo">项目信息</li>
        <li class="info-item info-item-3" @click="productRepayment">还款计划</li>
        <li class="info-item info-item-4" @click="riskWarning">风险提示</li>
      </ul>
    </div>
    <div class="subscribe-btn" ref="subscribeBtn">
      <div class="btn-wrapper">
        <span class="btn-txt" :class="{'click-err': !subscribe.btnClass}" @click="subscribeSubmit"><em class="desc">{{subscribe.btnTxt}}</em></span>
      </div>
    </div>
    <transition name="drop">
      <div class="flag-win" v-show="sFg">
        <div class="flag-win-ct">
          <div class="flag-win-box">
            <div class="flag-win-desc">
              <p class="flag-win-dtxt">年化借款利率</p>
              <p class="flag-win-dtxt">不等于实际收益承诺，出借需谨慎！</p>
            </div>
            <div class="flag-win-btn" @click="hide1">
              <span class="flag-win-btn-ctr">确认</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import TopTip from 'base/top-tip/top-tip'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import {prefixStyle} from 'common/js/dom'
  import {getSubscribeData} from 'api/product'
  import {getLoginState} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'

  const ERR_OK = 1
  const ITEM_WIDTH = 70
  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        whiteIcon: true,
        subscribe: {},
        titleTxt: '',
        isShow: false,
        opcity: 0,
        percent: 0,
        investAmount: 1000,
        incomeList: [],
        income: 0,
        logVal: 100,
        addBool: true,
        removeBool: true,
        userType: true,
        project_id: '',
        qaAssess: 'no',
        caveatText: '',
        sFg: false
      }
    },
    created () {
      this.pathNow = this.$route.path
      this.project_id = this.$route.params.id

      this._getSubscribeData()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      hide1 () {
        this.sFg = false
      },
      show1 () {
        this.sFg = true
      },
      conversion (num) {
        return (num / 10000).toFixed(2)
      },
      formatMoney (num) {
        return this._format(num)
      },
      removeInvest () {
        if (!this.removeBool) {
          return
        }
        this.investAmount = this.investAmount - this.subscribe.minmoney
        this._invest()
      },
      addInvest () {
        if (!this.addBool) {
          return
        }
        this.investAmount = this.investAmount - 0 + this.subscribe.minmoney
        this._invest()
      },
      investKeyup () {
        const bool = isNaN(this.investAmount)
        if (bool) {
          this.investAmount = this.logVal
          return
        }
        if (this.investAmount <= 100) {
          this.removeBool = false
          this.addBool = true
          this.investAmount = this.logVal
        } else if (this.investAmount >= parseInt(this.subscribe.surplus)) {
          this.investAmount = parseInt(this.subscribe.surplus)
          this.addBool = false
          this.removeBool = true
        }
        this._invest()
      },
      logined(res) {
        this.userType = res.userType
      },
      subscribeSubmit () {
        if (!this.userType) {
          this.caveatText = '借款人不允许出借！'
          this.caveat()
          return
        }
        if (!this.subscribe.btnClass) {
          return
        }

        if (this.investAmount < 100) {
          this.caveatText = '请输入100的整数倍金额，且最小出借额100！'
          this.caveat()
          return
        }

        if ((this.investAmount % 100) !== 0) {
          this.caveatText = '请输入100的整数倍金额！'
          this.caveat()
          return
        }

        if (this.changeLoginState === '') {
          this.changeReturnPath(this.$route.path)
          this.$router.push({
            path: '/signIn'
          })
          return
        }

        getLoginState(this.changeLoginState).then((res) => {
          if (!res.isEvaluated) {
            this.$router.push({
              path: `/investor-notice/${this.project_id}/${this.investAmount}/${this.subscribe.surplus}/${this.subscribe.limit}`
            })
            return
          }
          this.$router.push({
            path: `/subscription/${this.project_id}/${this.investAmount}/${this.subscribe.surplus}/${this.subscribe.limit}`
          })
        })
      },
      caveat() {
        this.$refs.topTip.show()
      },
      httpTxt () {
        if (this.subscribe.limit !== 12) {
          this.$router.push({
            path: `/contract-6`
          })
        } else {
          this.$router.push({
            path: `/contract`
          })
        }
      },
      productInfo () {
        this.$router.push({
          path: `/project-info/${this.project_id}`
        })
      },
      productRepayment () {
        this.$router.push({
          path: `/repayment-plan/${this.project_id}`
        })
      },
      riskWarning () {
        this.$router.push({
          path: `/risk-warning`
        })
      },
      _genResult (data) {
        /**
          * yugao   历史参考中
          * touzi   立即认购
          * checking   复核中
          * repayment  还款中
          * guoqi    结束
          **/
        let obj = {}
        switch (data.canrongzi) {
          case 'yugao':
            obj = {
              btnTxt: '敬请历史参考',
              btnClass: false,
              surplus: 0
            }
            break
          case 'touzi':
            obj = {
              btnTxt: '立即认购',
              btnClass: true,
              surplus: data.canrongzimoney
            }
            break
          case 'guoqi':
            obj = {
              btnTxt: '已结束',
              btnClass: false,
              surplus: 0
            }
            break
          case 'checking':
            obj = {
              btnTxt: '复核中',
              btnClass: false,
              surplus: 0
            }
            break
          case 'repayment':
            obj = {
              btnTxt: '还款中',
              btnClass: false,
              surplus: 0
            }
            break
          default:
            obj = {
              btnTxt: '立即认购',
              btnClass: true,
              surplus: data.canrongzimoney
            }
        }
        return obj
      },
      _getSubscribeData () {
        getSubscribeData(this.project_id, this.changeLoginState).then((res) => {
          if (parseInt(res.ret_code) === ERR_OK) {
            this.subscribe = Object.assign(res.ret_set, this._genResult(res.ret_set))
            this.percent = 1 - parseInt(this.subscribe.surplus) / parseInt(this.subscribe.total)
            if (parseInt(this.subscribe.surplus) <= 1000) {
              this.investAmount = parseInt(this.subscribe.surplus)
              this.addBool = false
              this.removeBool = true
            }
            if (parseInt(this.subscribe.surplus) === 0) {
              this.investAmount = 0
              this.addBool = false
              this.removeBool = false
            }

            if (parseInt(this.subscribe.surplus) === 0) {
              this.investAmount = 0
              this.addBool = false
              this.removeBool = false
              return
            }
            this.addBool = true
            this.removeBool = true
            if (this.investAmount <= 100) {
              this.removeBool = false
            } else if (this.investAmount >= parseInt(this.subscribe.surplus)) {
              this.addBool = false
            }
            setTimeout(() => {
              this._psInit()
              this._invest()
            }, 20)
          }
        })
      },
      _psInit () {
        const len = Math.ceil(parseInt(this.subscribe.surplus) / 10000)
        const width = (len + 1) * ITEM_WIDTH
        this.$refs.expectedIncomeList.style.width = `${width}px`
        for (let i = 0; i <= len; i++) {
          let _str = i * 10000
          this.incomeList.push(_str)
        }
      },
      _invest () {
        const winWidth = window.innerWidth / 2 - 50
        if (parseInt(this.subscribe.surplus) === 0) {
          this.investAmount = 0
          this.$refs.expectedIncomeList.style[transform] = `translateX(${winWidth}px)`
          return
        }
        let percent = this.investAmount / parseInt(this.subscribe.surplus)
        const len = Math.ceil(parseInt(this.subscribe.surplus) / 10000)
        const width = len * ITEM_WIDTH
        const left = winWidth - (width * percent)
        this.$refs.expectedIncomeList.style[transform] = `translateX(${left}px)`
        this.income = this.investAmount * parseFloat(this.subscribe.yearRate) * this.subscribe.limit / 1200
      },
      _format (number, places, symbol, thousand, decimal) {
        number = number || 0
        places = !isNaN(places = Math.abs(places)) ? places : 0 // 2
        symbol = symbol !== undefined ? symbol : '' // $
        thousand = thousand || ','
        decimal = decimal || '.'
        let negative = number < 0 ? '-' : ''
        let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
        let j = (j = i.length) > 3 ? j % 3 : 0
        return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
      },
      ...mapActions([
        'changeReturnPath'
      ])
    },
    components: {
      MHeader,
      TopTip,
      ProgressCircle
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
  .subscribe-wrapper
    padding-bottom: 70px
    .flag-win
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      background: rgba(0, 0, 0, 0.8)
      z-index: 1000
      opacity: 1
      text-align: center
      border-radius: 10px
      .flag-win-ct
        position: absolute
        top: 50%
        left: 50%
        width: 75%
        min-width: 280px
        transform: translate3d(-50%, -50%, 0) scale(1)
        background-color: #FFF
        border-radius: 15px
        .flag-win-box
          padding: 20px
          .flag-win-desc
            padding-bottom: 40px
            &.pb-15
              padding-bottom: 15px
            .flag-win-dtxt
              line-height: 30px
              font-size: 15px
              color: #333
              .clo
                color: #ff4e49
              &.fz-12
                text-align: left
                text-indent: 2em
                line-height: 24px
                font-size: 12px
          .flag-win-btn
            display: flex
            align-items: center
            justify-content: center
            margin: 0 auto
            width: 160px
            height: 44px
            border-radius: 22px
            background-color: #ff4e49
            font-size: 0
            &.bgcr-c8
              margin-top: 10px
              background-color: #c8c8c8
            .flag-win-btn-ctr
              display: inline-block
              padding-left: 1px
              letter-spacing: 1px
              font-size: 18px
              color: #fff
              &.fz-15
                font-size: 15px
      &.drop-enter-active, &.drop-leave-active
        transition: all 0.3s
        .flag-win-ct
          transition: all 0.3s
      &.drop-enter, &.drop-leave-to
        opacity: 0
        .flag-win-ct
          transform: translate3d(-50%, -50%, 0) scale(0)
    .subscribe-header-wrapper
      position: absolute !important
      top: 0
      left: 0
      width: 50%
    .caveatText
      padding: 20px
      line-height: 16px
      font-size: 12px
      color: #fff
    .subscribe-grounp
      .subscribe-scroll
      .subscribe-bar-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        text-align: center
        bg-image('subscribe-bg')
        background-size: 100% auto
        background-repeat: no-repeat
        z-index: 100
        .user-ct-set-btn-wrapper
          display: flex
          position: absolute
          left: 85%
          top: 0
          right: 0
          .user-ct-set-btn-item
            flex: 1
            display: block
            height: 50px
            background-position: center
            background-size: 20px
            &.item-1
              bg-image('kefu')
        .subscribe-bar
          position: absolute
          top: 40%
          left: 50%
          transform: translate3d(-50%, -50%, 0)
          .subscribe-return
            position: absolute
            top: 50%
            width: 100%
            transform: translateY(-50%)
            text-align: center
            color: $color-text
            .return
              font-size: 40px
              margin-bottom: 8px
              .unti
                font-size: $font-size-large
            .desc
              extend-click()
              display: inline-block
              padding-right: 13px
              bg-image('ii')
              background-position: right center
              background-size: 11px 11px
              font-size: $font-size-small
        .subscribe-info
          display: flex
          position: absolute
          width: 100%
          top: 74%
          transform: translateY(-50%)
          .desc-info
            flex: 1
            text-align: center
            font-size: $font-size-small
            color: $color-text
            .fwb
              font-weight: bold
            &.styl-flex
              flex: 0 0 90px
              width: 80px
        .subscribe-info-2
          display: flex
          position: absolute
          width: 100%
          top: 82%
          transform: translateY(-50%)
          .desc-info
            flex: 1
            text-align: center
            font-size: $font-size-small
            color: $color-text
            .fwb
              font-weight: bold
      .expected-income
        position: relative
        padding-top: 70px
        margin: 0 15px
        overflow: hidden
        .income-bar-wrapper
          .income-bar
            display: block
            width: 100%
            height: 5px
            background-color: $btn-clo
            border-radius: 5px
        .expected-income-list
          transition: all 0.3s
          transform: translateX(0)
          .item
            display: block
            position: relative
            top: -7px
            float: left
            width: 70px
            text-align: center
            font-size: 9px
            padding-top: 15px
            color: $color-tle
            .icon
              display: block
              position: absolute
              top: 1px
              left: 50%
              transform: translateX(-50%)
              width: 5px
              height: 5px
              background-color: $color-text
              border: 1px solid #85d826
              border-radius: 100%
            .until
              position: absolute
              top: 15
              right: -15px
              color: $color-tle
              font-size: 9px
        .icon-b
          position: absolute
          top: 21px
          left: 50%
          transform: translateX(-50%)
          width: 25px
          height: 64px
          bg-image('icon-b')
          background-size: 100% 100%
          .desc-text
            position: absolute
            left: 0
            top: -15px
            width: 200px
            font-size: $font-size-small
            color: $color-tle
      .invest-amount
        padding: 35px 15px
        .invest-input
          display: flex
          .btn-remove
            flex: 0 0 35px
            margin-right: 8px
            width: 35px
            height: 35px
            bg-image('remove-y')
            background-size: 100% 100%
            &.remove
              bg-image('remove-n')
          .input-wrapper
            flex: 1
            height: 33px
            border: 1px solid #ccc
            .input-self
              width: 100%
              height: 33px
              text-align: center
              line-height: 33px
              color: $color-tle
              background-color: $color-text
          .btn-add
            flex: 0 0 35px
            margin-left: 8px
            width: 35px
            height: 35px
            bg-image('add-y')
            background-size: 100% 100%
            &.add
              bg-image('add-n')
        .input-desc
          padding-top: 5px
          font-size: $font-size-small-s
          color: #ccc
          text-align: center
      .product-info
        display: flex
        padding-bottom: 20px
        .info-item
          flex: 1
          padding-top: 60px
          text-align: center
          font-size: 12px
          color: $color-tle
          background-repeat: no-repeat
          background-position: top center
          background-size: 45px 45px
          &.info-item-1
            bg-image('http')
          &.info-item-2
            bg-image('info')
          &.info-item-3
            bg-image('repay')
          &.info-item-4
            bg-image('risk')
    .subscribe-btn
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      padding: 10px 0
      box-shadow: 0px -1px 15px -2px #ccc
      background-color: #fff
      z-index: 99
      .btn-wrapper
        margin: 0 15px
        .btn-txt
          position: relative
          display: block
          height: 45px
          background-color: $btn-clo
          border-radius: 22.5px
          &.click-err
            background-color: $not-c
          .desc
            display: block
            position: absolute
            top: 50%
            width: 100%
            transform: translateY(-50%)
            color: $color-text
            font-style: normal
            text-align: center
            font-size: $font-size-large
</style>
