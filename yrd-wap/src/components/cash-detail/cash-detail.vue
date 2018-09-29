<template>
  <div class="cash-detail-wrapper" @click="calendarHide">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined"></m-header>
    <div class="cash-detail-box">
      <div class="is-record-wrapper">
        <div class="cash-detail-nav border-1px-b">
          <span class="cdv-item" @click.stop="calendarFuc(0)" v-html="dateTime1"></span>
          <span class="cdv-hr"></span>
          <span class="cdv-item" @click.stop="calendarFuc(1)" v-html="dateTime2"></span>
          <span class="cdv-item cdv-item-jj">
            <span class="cdvi-jj" v-for="ij in timeArea" v-html="ij.tm" :class="{'seled': sedIdx === ij.idx}" @click.stop="cdvijFuc(ij.idx)"></span>
          </span>
        </div>
        <div v-if="loadState">
          <div class="has-record-list" v-show="cashList.length > 0">
            <ul class="has-record-item border-1px-b" v-for="item in cashList">
              <li class="ri-box">
                <span class="ri-box-name">主单号</span>
                <span class="ri-box-desc" v-html="item.num"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">奖励金额</span>
                <span class="ri-box-desc clr">￥{{checkNum(item.transfer_money)}}</span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">创建时间</span>
                <span class="ri-box-desc" v-html="item.create_date"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">发放状态</span>
                <span class="ri-box-desc" v-html="item.transfer_status"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">详情备注</span>
                <span class="ri-box-desc" v-html="item.comments"></span>
              </li>
            </ul>
          </div>
          <div class="no-record-wrapper" v-show="cashList.length === 0">
            <div class="icon"></div>
            <p class="desc">您暂时没有现金奖励哦</p>
          </div>
        </div>
        <loading :title="loadTitle" v-else></loading>
      </div>
    </div>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
    <transition name="drop">
      <div class="calendar-wrapper-win" v-show="calendarIsShow">
        <div class="calendar-wrapper-box" @click.stop>
          <calendar :btnSnow="btnSnow" ref="calendarDom" @returnDt="returnDt"></calendar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Calendar from 'components/calendar/calendar'
  import Loading from 'base/loading/loading'
  import TopTip from 'base/top-tip/top-tip'

  import {getCashList} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '现金奖励明细',
        loadTitle: '正在载入更多...',
        topTipTxt: '',
        isShow: false,
        opcity: 1,
        userId: '',
        loadState: true,
        sedIdx: 2,
        btnSnow: false,
        calendarIsShow: false,
        timeArea: [
          {
            tm: '一个月',
            idx: 0
          },
          {
            tm: '一周',
            idx: 1
          },
          {
            tm: '今天',
            idx: 2
          }
        ],
        thisYear1: new Date().getFullYear(),
        thisMonth1: new Date().getMonth() + 1,
        thisDay1: new Date().getDate(),
        thisYear2: new Date().getFullYear(),
        thisMonth2: new Date().getMonth() + 1,
        thisDay2: new Date().getDate(),
        numDe: 0,
        cashList: []
      }
    },
    computed: {
      monthVal1 () {
        let monthNum = '00' + this.thisMonth1
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dayVal1 () {
        let monthNum = '00' + this.thisDay1
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dateTime1 () {
        return this.thisYear1 + '-' + this.monthVal1 + '-' + this.dayVal1
      },
      monthVal2 () {
        let monthNum = '00' + this.thisMonth2
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dayVal2 () {
        let monthNum = '00' + this.thisDay2
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dateTime2 () {
        return this.thisYear2 + '-' + this.monthVal2 + '-' + this.dayVal2
      }
    },
    methods: {
      logined (res) {
        this.userId = res.user_Id
        this.getCashListFuc()
      },
      checkNum (num) {
        num = num - 0
        return num.toFixed(2)
      },
      calendarFuc (num) {
        this.numDe = num
        const _this = this
        this.calendarIsShow = true
        if (num === 0) {
          this.$refs.calendarDom.setRun(_this.thisYear1, _this.thisMonth1, _this.thisDay1)
          return
        }
        this.$refs.calendarDom.setRun(_this.thisYear2, _this.thisMonth2, _this.thisDay2)
      },
      calendarHide () {
        this.calendarIsShow = false
      },
      returnDt (thisYear, thisMonth, thisDay) {
        this.calendarHide()
        if (this.numDe === 0) {
          this.thisYear1 = thisYear
          this.thisMonth1 = thisMonth
          this.thisDay1 = thisDay
          this.getCashListFuc()
          return
        }
        this.thisYear2 = thisYear
        this.thisMonth2 = thisMonth
        this.thisDay2 = thisDay
        this.getCashListFuc()
      },
      cdvijFuc (idx) {
        this.calendarHide()
        this.sedIdx = idx
        this.thisYear2 = new Date().getFullYear()
        this.thisMonth2 = new Date().getMonth() + 1
        this.thisDay2 = new Date().getDate()
        if (idx === 1) {
          let oneweekdate = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)
          this.thisYear1 = oneweekdate.getFullYear()
          this.thisMonth1 = oneweekdate.getMonth() + 1
          this.thisDay1 = oneweekdate.getDate()
          this.getCashListFuc()
          return
        }
        if (idx === 0) {
          let nowdate = new Date()
          nowdate.setMonth(nowdate.getMonth() - 1)
          this.thisYear1 = nowdate.getFullYear()
          this.thisMonth1 = nowdate.getMonth() + 1
          this.thisDay1 = nowdate.getDate()
          this.getCashListFuc()
          return
        }
        this.thisYear1 = new Date().getFullYear()
        this.thisMonth1 = new Date().getMonth() + 1
        this.thisDay1 = new Date().getDate()
        this.getCashListFuc()
      },
      getCashListFuc () {
        const _this = this
        this.loadState = false
        getCashList(_this.userId, _this.dateTime1, _this.dateTime1).then((res) => {
          this.loadState = true
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.cashList = res.ret_set
        })
      }
    },
    components: {
      MHeader,
      Calendar,
      Loading,
      TopTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .cash-detail-wrapper
    padding: 60px 0 20px
    .calendar-wrapper-win
      position: fixed
      left: 0
      top: 100px
      right: 0
      bottom: 0
      z-index: 999
      &.drop-enter-active, &.drop-leave-active
        transition: all 0.3s
      &.drop-enter, &.drop-leave-to
        opacity: 0
        transform: scale(0)
        transform-origin: 0 0
      .calendar-wrapper-box
        position: absolute
        left: 9%
        top: 0
        width: 250px
        background-color: #fff
        border-radius: 10px
        box-shadow: 0px 0px 5px -2px #ccc
      .calendar-wrapper
        padding: 0 0 5px 0
        .calendar-list
          .calendar-item
            .item-txt
              color: #969696
            &.now-payment-day
              .item-txt
                background-image: none
            &.now
              .item-txt
                background-image: none
            &.payment-day
              .item-txt
                color: #969696
        .calendar-header
          .record-ctr-btns-wrapper
            .record-ctr-btns-box
              height: 36px
              .record-ctr-btns
                &.rcb-tb-time 
                  .rcb-l
                    height: 36px
                  .rcb-ct
                    height: 36px
                  .rcb-r
                    height: 36px
        .item-txt
          font-size: 12px
    .m-header
      position: fixed !important
      width: 100%
      left: 0
      top: 0
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .is-record-wrapper
      margin: 0 auto 15px
      width: 90%
      border-radius: 10px
      box-shadow: 0px 5px 5px -6px #ccc
      background-color: $color-text
      padding-bottom: 20px
      .cash-detail-nav
        display: flex
        align-items: center
        border-1px-b(#f5f5f5)
        .cdv-hr
          flex: 0 0 1px
          width: 1px
          height: 12px
          background-color: #f5f5f5
        .cdv-item
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          height: 50px
          font-size: 12px
          color: #ff4e49
          &.cdv-item-jj
            flex: 1.5
            .cdvi-jj
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              height: 50px
              color: #646464
              font-size: 12px
              &.seled
                color: #ff4e49
      .loading
        padding-top: 20px !important
      .has-record-list
        .has-record-item
          padding: 10px 15px 15px 15px
          border-1px-b(#f5f5f5)
          &:last-child
            padding: 10px 15px 0 15px
            border-1px-b(#fff)
          .ri-box
            display: flex
            .ri-box-name
              flex: 0 0 120px
              display: flex
              line-height: 20px
              padding: 8px 0
              width: 120px
              font-size: 12px
              color: #323232
            .ri-box-desc
              flex: 1
              display: flex
              justify-content: flex-end
              line-height: 20px
              padding: 8px 0
              font-size: 12px
              color: #969696
              &.clr
                color: #ff4e49
      .no-record-wrapper
        padding-top: 20px
        .icon
          height: 50px
          bg-image('air')
          background-position: center
          background-size: 25px 25px
          background-repeat: no-repeat
        .desc
          color: #323232
          line-height: 20px
          text-align: center
          font-size: 12px
</style>
