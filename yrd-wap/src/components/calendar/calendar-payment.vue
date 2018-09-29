<template>
  <div class="calendar-payment-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined"></m-header>
    <scroll class="calendar-payment-scroll" ref="calendarPaymentScroll" :data="refreshData" :pullup="pullup" @scrollToEnd="loadMore">
      <div class="calendar-payment-box">
        <div class="calendar-payment-group">
          <calendar ref="calendarDom" @getCPdata="getCPdata" :repaymentDateAll="repaymentDateAll"></calendar>
          <div class="cp-data-wrapper border-1px">
            <div class="cp-data-group" v-show="cpDataList.length && cpDataList.length > 0">
              <ul class="cp-data-list" v-for="item in cpDataList">
                <li class="cp-data-item item-1"><span class="cp-data-item-txt" v-html="item.repayment_date_time"></span></li>
                <li class="cp-data-item item-2"><span class="cp-data-item-txt" v-html="item.repayment_money_interest"></span></li>
                <li class="cp-data-item item-2"><span class="cp-data-item-txt" v-html="item.repayment_money_principal"></span></li>
                <li class="cp-data-item item-1"><span class="cp-data-item-txt" v-html="item.repayment_project_name"></span></li>
              </ul>
              <ul class="cp-data-list cp-data-tle">
                <li class="cp-data-item item-1">回款时间</li>
                <li class="cp-data-item item-2">当日回款本金</li>
                <li class="cp-data-item item-2">当日回款利息</li>
                <li class="cp-data-item item-1">项目名称</li>
              </ul>
            </div>
            <div class="cp-data-group-air" v-show="!cpDataList.length || cpDataList.length <= 0">
              <p class="cp-data-group-air-desc">您这天没有回款哦，去看看其他天的吧！</p>
            </div>
          </div>
        </div>
        <div class="is-record-wrapper">
          <div class="record-tabs-wrapper border-1px-b">
            <span class="record-tab-item" v-for="(tab, index) in tabs" :class="{'seled': tabIdx === index}" v-html="tab.name" @click="seledTab(tab, index)"></span>
          </div>
          <div class="has-record-list" v-show="recordList.length > 0 && type !== 'close'">
            <ul class="has-record-item border-1px-b" v-for="(item, index) in recordList">
              <li class="ri-box">
                <span class="ri-box-name">项目名称</span>
                <span class="ri-box-desc" v-html="item.project_name"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">还款时间</span>
                <span class="ri-box-desc" v-html="item.invest_create_date"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">还款利息</span>
                <span class="ri-box-desc">{{item.earnings_mob}}元</span>
              </li>
              <li class="ri-box" v-show="item.isShow">
                <span class="ri-box-name">还款本金</span>
                <span class="ri-box-desc">{{item.invest_money_mob}}元</span>
              </li>
              <li class="ri-box" v-show="item.isShow">
                <span class="ri-box-name">管理费</span>
                <span class="ri-box-desc">{{item.glMoney}}元</span>
              </li>
              <li class="ri-box" v-show="item.isShow">
                <span class="ri-box-name">还款总计</span>
                <span class="ri-box-desc">{{item.totleMonty}}元</span>
              </li>
              <li class="ri-box" v-show="item.isShow">
                <span class="ri-box-name">是否回款</span>
                <span class="ri-box-desc" v-html="item.code"></span>
              </li>
              <li class="ri-sh-btn" @click="setSH(index)">
                <p class="desc" :class="{'ish': item.isShow}" v-html="rishBtnTxt(item.isShow)"></p>
              </li>
            </ul>
          </div>
          <div class="has-record-list" v-show="recordList.length > 0 && type === 'close'">
            <ul class="has-record-item border-1px-b" v-for="(item, index) in recordList">
              <li class="ri-box">
                <span class="ri-box-name">项目名称</span>
                <span class="ri-box-desc" v-html="item.projectName"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">操作时间</span>
                <span class="ri-box-desc" v-html="item.createdDate"></span>
              </li>
              <li class="ri-box">
                <span class="ri-box-name">退款金额</span>
                <span class="ri-box-desc">{{item.operationMoney}}元</span>
              </li>
              <li class="ri-box" v-show="item.isShow">
                <span class="ri-box-name">操作类型</span>
                <span class="ri-box-desc" v-html="item.recordType"></span>
              </li>
              <li class="ri-sh-btn" @click="setSH(index)">
                <p class="desc" :class="{'ish': item.isShow}" v-html="rishBtnTxt(item.isShow)"></p>
              </li>
            </ul>
          </div>
          <div class="no-record-wrapper" v-show="!recordList.length || recordList.length === 0">
            <div class="icon"></div>
            <p class="desc" v-html="airTxt"></p>
          </div>
        </div>
        <loading :title="loadTitle" v-show="hasMore"></loading>
      </div>
    </scroll>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Calendar from 'components/calendar/calendar'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import TopTip from 'base/top-tip/top-tip'

  import {getCalenderPayment, getCPdataFuc, getCPdataFuc2} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '回款日历',
        loadTitle: '正在载入更多...',
        topTipTxt: '',
        isShow: false,
        opcity: 1,
        userId: '',
        pullup: true,
        hasMore: true,
        dateTime: '',
        tabIdx: 0,
        page: 1,
        rows: 5,
        type: 'repayment',
        tabs: [
          {
            name: '回款中',
            type: 'repayment'
          },
          {
            name: '已回款',
            type: 'finished'
          },
          {
            name: '已取消借款',
            type: 'close'
          }
        ],
        recordList: [],
        cpDataList: [],
        repaymentDateAll: []
      }
    },
    computed: {
      refreshData () {
        return this.recordList.concat(this.cpDataList)
      },
      airTxt () {
        if (this.type === 'repayment') {
          return '您暂时没有回款中记录哦'
        }
        if (this.type === 'finished') {
          return '您暂时没有已回款记录哦'
        }
        return '您暂时没有已取消借款记录哦'
      }
    },
    methods: {
      logined (res) {
        this.userId = res.user_Id
        this.getInvestRecord()
      },
      rishBtnTxt (bool) {
        if (bool) {
          return '收起'
        }
        return '展开'
      },
      setSH (idx) {
        const _this = this
        let isShow = !this.recordList[idx].isShow
        this.$set(_this.recordList[idx], 'isShow', isShow)
        setTimeout(() => {
          this.$refs.calendarPaymentScroll.refresh()
        })
      },
      seledTab (tab, idx) {
        this.tabIdx = idx
        this.type = tab.type
        this.getInvestRecord()
      },
      getCPdata (dateTime) {
        this.dateTime = dateTime
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        const _this = this
        if (this.type === 'close') {
          getCPdataFuc2(_this.userId, _this.page, _this.rows).then((res) => {
            if (res.ret_code !== '1') {
              this.topTipTxt = res.ret_msg
              this.$refs.topTip.show()
              return
            }
            this.recordList = this.recordList.concat(this.genResult(res.ret_set))
            this.checkMore(res)
          })
          return
        }
        getCPdataFuc(_this.userId, _this.page, _this.rows, _this.type).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.recordList = this.recordList.concat(this.genResult(res.ret_set))
          this.checkMore(res)
        })
      },
      getInvestRecord () {
        this.page = 1
        this.hasMore = true
        const _this = this
        if (this.type === 'close') {
          getCPdataFuc2(_this.userId, _this.page, _this.rows).then((res) => {
            if (res.ret_code !== '1') {
              this.topTipTxt = res.ret_msg
              this.$refs.topTip.show()
              return
            }
            this.recordList = this.genResult(res.ret_set)
            this.checkMore(res)
          })
          return
        }
        getCPdataFuc(_this.userId, _this.page, _this.rows, _this.type).then((res) => {
          if (res.ret_code !== '1') {
            this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
          }
          this.recordList = this.genResult(res.ret_set)
          this.checkMore(res)
        })
      },
      checkMore (data) {
        const rows = data.ret_set
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      },
      genResult (data) {
        let ret = []
        for (let i = 0; i < data.length; i++) {
          let obj = {
            isShow: false
          }
          ret.push(Object.assign(data[i], obj))
        }
        return ret
      }
    },
    watch: {
      userId () {
        if (this.userId !== '' && this.dateTime !== '') {
          var _this = this
          getCalenderPayment(_this.userId, _this.dateTime).then((res) => {
            if (res.ret_code !== '1') {
              this.topTipTxt = res.ret_msg
              this.$refs.topTip.show()
              return
            }
            this.cpDataList = res.ret_set
            this.repaymentDateAll = res.repayment_date_all
          })
        }
      },
      dateTime () {
        if (this.userId !== '' && this.dateTime !== '') {
          var _this = this
          getCalenderPayment(_this.userId, _this.dateTime).then((res) => {
            if (res.ret_code !== '1') {
              this.topTipTxt = res.ret_msg
              this.$refs.topTip.show()
              return
            }
            this.cpDataList = res.ret_set
            this.repaymentDateAll = res.repayment_date_all
          })
        }
      }
    },
    components: {
      MHeader,
      Calendar,
      Scroll,
      Loading,
      TopTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .calendar-payment-wrapper
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: 999
    background-color: $color-background
    .calendar-payment-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      overflow: hidden
      z-index: 1
      .calendar-payment-box
        padding: 1px 0
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .calendar-payment-group
      margin: 20px
      background-color: #fff
      border-radius: 10px;
      box-shadow: 0px 5px 5px -6px #ccc
      .cp-data-wrapper
        margin: 0 auto
        padding: 15px 10px
        border-1px(#f5f5f5)
        .cp-data-group-air
          .cp-data-group-air-desc
            margin-top: 10px
            padding-top: 50px
            line-height: 30px
            bg-image('cp-air')
            background-size: 50px 50px
            background-position: top center
            font-size: 12px
            text-align: center
        .cp-data-group
          padding: 10px 5px
          box-shadow: 0px 0px 5px -1px #ccc
          background-color: #fff
          border-radius: 6px;
          .cp-data-list
            display: flex
            &.cp-data-tle
              .cp-data-item
                color: #646464
            .cp-data-item
              position: relative
              display: flex
              justify-content: center
              align-items: center
              height: 30px
              font-size: 12px
              color: #ff4e49
              .cp-data-item-txt
                position: absolute
                left: 0
                right: 0
                top: 50%
                transform: translateY(-50%)
                text-align: center
                font-size: 12px
                no-wrap()
              &.item-1
                flex: 1
              &.item-2
                flex: 1.5
    .is-record-wrapper
      margin: 0 auto 15px
      width: 90%
      border-radius: 10px
      box-shadow: 0px 5px 5px -6px #ccc
      background-color: $color-text
      padding-bottom: 20px
      .record-tabs-wrapper
        display: flex
        border-1px-b(#f5f5f5)
        .record-tab-item
          flex: 1
          position: relative
          display: flex
          justify-content: center
          align-items: center
          height: 40px
          font-size: 12px
          &.seled
            color: #ff4e49
            &:before
              content: ''
              position: absolute
              bottom: -1px
              left: 10%
              right: 10%
              height: 3px
              background-color: #ff4e49
              z-index: 1
              transform: scaleY(0.5)
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
          .ri-sh-btn
            display: flex
            padding-top: 10px
            .desc
              flex: 1
              line-height: 20px
              padding-bottom: 10px
              font-size: 12px
              color: #323232
              text-align: center
              bg-image('s')
              background-position: bottom center
              background-size: 10px 10px
              background-repeat: no-repeat
              &.ish
                bg-image('h')
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
