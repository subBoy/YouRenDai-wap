<template>
  <div class="subscribe-wrapper" ref="subscribeWrapper" @touchstart="lineBlur">
    <m-header :titleTxt="titleTxt" :opcity="opcity" :whiteIcon="whiteIcon" @logined="logined"></m-header>
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <div class="subscribe-grounp" ref="subscribeGrounp">
      <scroll class="subscribe-scroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="scroll">
        <div>
          <div class="subscribe-bar-wrapper">
            <div class="subscribe-bar">
              <progress-circle :percent="percent">
                <div class="subscribe-return">
                  <h3 class="return">{{subscribe.yearRate}}<span class="unti">%</span></h3>
                  <p class="desc">预期年化收益</p>
                </div>
              </progress-circle>
            </div>
            <div class="subscribe-info">
              <p class="desc-info">借款期限 {{subscribe.limit}}个月</p>
              <p class="desc-info styl-flex">起投金额 {{subscribe.ascendmoney}}元</p>
              <p class="desc-info">剩余投资额 {{conversion(subscribe.surplus)}}万元</p>
            </div>
          </div>
          <div class="expected-income">
            <div class="income-bar-wrapper" ref="inputSelf"><span class="income-bar"></span></div>
            <div class="expected-income-list" ref="expectedIncomeList">
              <span class="item" v-for="item in incomeList"><em class="icon"></em>{{formatMoney(item)}} <span class="until" v-show="item === incomeList[incomeList.length - 1]">(元)</span></span>
            </div>
            <div class="icon-b">
              <p class="desc-text">{{income.toFixed(2)}}(预期收益)</p>
            </div>
          </div>
          <div class="invest-amount">
            <div class="invest-input">
              <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
              <div class="input-wrapper">
                <input class="input-self" ref="inputWrapper" :disabled="parseInt(subscribe.surplus) === 0" @blur="investBlur" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
              </div>
              <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
            </div>
            <p class="input-desc">请输入投资金额，{{subscribe.minmoney}}元的整数倍</p>
          </div>
          <ul class="product-info">
            <li class="info-item info-item-1" @click="httpTxt">协议范本</li>
            <li class="info-item info-item-2" @click="productInfo">项目信息</li>
            <li class="info-item info-item-3" @click="productRepayment">还款计划</li>
            <li class="info-item info-item-4" @click="riskWarning">风险提示</li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="subscribe-btn" ref="subscribeBtn">
      <div class="btn-wrapper">
        <span class="btn-txt" :class="{'click-err': !subscribe.btnClass}" @click="subscribeSubmit"><em class="desc">{{subscribe.btnTxt}}</em></span>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import TopTip from 'base/top-tip/top-tip'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import {prefixStyle} from 'common/js/dom'
  import {debounce} from 'common/js/util'
  import {getSubscribeData} from 'api/product'
  import {getLoginState} from 'api/sign'
  import {mapGetters, mapActions} from 'vuex'

  const ERR_OK = 1
  const ITEM_WIDTH = 70
  const transform = prefixStyle('transform')
  let windowHei = document.documentElement.clientHeight

  export default {
    data () {
      return {
        whiteIcon: true,
        subscribe: {},
        listenScroll: true,
        probeType: 3,
        titleTxt: '',
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
        screenHeight: document.documentElement.clientHeight,
        qaAssess: 'no',
        caveatText: ''
      }
    },
    created () {
      this.pathNow = this.$route.path
      this.project_id = this.$route.params.id

      this._getSubscribeData()
      this.$watch('investAmount', debounce((newQuery) => {
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
        this._invest()
      }, 200))
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      lineBlur () {
        this.$refs.inputWrapper.blur()
        this.$refs.subscribeWrapper.style.top = 0
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      scroll (pos) {
        if (pos.y < 0) {
          this.opcity = Math.abs(pos.y / 44)
          this.whiteIcon = false
        } else {
          this.opcity = 0
          this.whiteIcon = true
        }
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
      },
      addInvest () {
        if (!this.addBool) {
          return
        }
        this.investAmount = this.investAmount - 0 + this.subscribe.minmoney
      },
      investKeyup () {
        const reg = /^(0|[1-9][0-9]*)$/
        const bool = reg.test(this.investAmount)
        if (bool) {
          this.logVal = this.investAmount
          if (this.logVal < 10) {
            this.logVal = ''
          }
        } else {
          this.investAmount = this.logVal
        }
        if (this.investAmount <= 100) {
          this.removeBool = false
          this.addBool = true
        } else if (this.investAmount >= parseInt(this.subscribe.surplus)) {
          this.investAmount = parseInt(this.subscribe.surplus)
          this.addBool = false
          this.removeBool = true
        }
        console.log(this.investAmount)
        this._invest()
      },
      investBlur () {
        this.investKeyup()
        this.$refs.subscribeWrapper.style.top = 0
      },
      investFocus () {
        this.$refs.subscribeWrapper.style.height = windowHei + 'px'
        this.$refs.subscribeWrapper.style.top = '-55%'
      },
      logined(res) {
        this.userType = res.userType
      },
      subscribeSubmit () {
        if (!this.userType) {
          this.caveatText = '借款人不允许投资！'
          this.caveat()
          return
        }
        if (!this.subscribe.btnClass) {
          return
        }

        if (this.investAmount < 100) {
          this.caveatText = '请输入100的整数倍金额，且最小投资额100！'
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
              path: `${this.$route.path}/investor-notice/${this.investAmount}/${this.subscribe.surplus}`
            })
            return
          }
          this.$router.push({
            path: `${this.$route.path}/subscription/${this.investAmount}/${this.subscribe.surplus}`
          })
        })
      },
      caveat() {
        this.$refs.topTip.show()
      },
      httpTxt () {
        if (this.subscribe.limit !== 12) {
          this.$router.push({
            path: `${this.$route.path}/contract-6`
          })
        } else {
          this.$router.push({
            path: `${this.$route.path}/contract`
          })
        }
      },
      productInfo () {
        this.$router.push({
          path: `${this.$route.path}/project-info/${this.project_id}`
        })
      },
      productRepayment () {
        this.$router.push({
          path: `${this.$route.path}/repayment-plan/${this.project_id}`
        })
      },
      riskWarning () {
        this.$router.push({
          path: `${this.$route.path}/risk-warning`
        })
      },
      _genResult (data) {
        /**
          * yugao   期待中
          * touzi   立即认购
          * checking   复核中
          * repayment  还款中
          * guoqi    结束
          **/
        let obj = {}
        switch (data.canrongzi) {
          case 'yugao':
            obj = {
              btnTxt: '敬请期待',
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

            setTimeout(() => {
              this._init()
              this._invest()
            }, 20)
          }
        })
      },
      _init () {
        const len = Math.ceil(parseInt(this.subscribe.surplus) / 10000)
        const width = (len + 1) * ITEM_WIDTH
        this.$refs.expectedIncomeList.style.width = `${width}px`
        for (let i = 0; i <= len; i++) {
          let _str = i * 10000
          this.incomeList.push(_str)
        }
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
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
    mounted () {
      const bottom = this.$refs.subscribeBtn.clientHeight
      this.$refs.subscribeGrounp.style.bottom = `${bottom}px`

      const _this = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.documentElement.clientHeight
          _this.screenHeight = window.screenHeight
        })()
      }
    },
    watch: {
      screenHeight (newVal, oldVal) {
        if (!this.timer) {
          console.log('oldVal', oldVal)
          console.log('newVal', newVal)
          if (this.pathNow !== this.$route.path) return
          this.screenHeight = newVal
          this.timer = true
          let _this = this
          setTimeout(() => {
            if (oldVal < newVal) {
              _this.lineBlur()
            } else {
              _this.investFocus()
            }
            _this.timer = false
          }, 20)
        }
      }
    },
    components: {
      MHeader,
      Scroll,
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
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    background-color: $color-text
    z-index: 9999
    .caveatText
      padding: 20px
      line-height: 16px
      background-color: $btn-clo
      font-size: 12px
      color: #fff
    .subscribe-grounp
      position: absolute
      top: 0
      right: 0
      left: 0
      .subscribe-scroll
        width: 100%
        height: 100%
        overflow: hidden
      .subscribe-bar-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        text-align: center
        bg-image('subscribe-bg')
        background-size: 100% auto
        background-repeat: no-repeat
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
              font-size: $font-size-small
        .subscribe-info
          display: flex
          position: absolute
          width: 100%
          top: 78%
          transform: translateY(-50%)
          .desc-info
            flex: 1
            text-align: center
            font-size: $font-size-small
            color: $color-text
            &.styl-flex
              flex: 0 0 90px
              width: 80px
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
              top: 0
              left: 50%
              transform: translateX(-50%)
              width: 7px
              height: 7px
              background-color: $color-text
              border: 1px solid #85d826
              border-radius: 100%
            .until
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
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      padding: 10px 0
      box-shadow: 0px -1px 15px -2px #ccc
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
