<template>
  <div class="calendar-wrapper">
    <div class="calendar-header border-1px-b">
      <div class="record-ctr-btns-wrapper">
          <div class="record-ctr-btns-box">
            <div class="record-ctr-btns rcb-tb-time rcb-tb-mr">
              <span class="rcb-l" @click.stop="removeYear"></span>
              <span class="rcb-ct">{{thisYear}}</span>
              <span class="rcb-r" @click.stop="addYear"></span>
            </div>
            <div class="record-ctr-btns rcb-tb-time">
              <span class="rcb-l" @click.stop="removeMonth"></span>
              <span class="rcb-ct">{{monthVal}}月</span>
              <span class="rcb-r" @click.stop="addMonth"></span>
            </div>
            <div class="record-ctr-btns rcb-tb-now" v-show="btnSnow">
              <span class="rcb-tb" @click.stop="dealInit">返回今天</span>
            </div>
          </div>
        </div>
    </div>
    <div class="calendar-title">
      <ul class="calendar-list">
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">一</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">二</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">三</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">四</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">五</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt clo">六</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt clo">日</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="calendar-content">
      <ul class="calendar-list">
        <li class="calendar-item" v-for="(item, index) in checkoData" :class="item.CN">
          <span class="item-wrapper" @click.stop="findData(item)">
            <span class="item-txt">{{item.val}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  const ActualYear = new Date().getFullYear()
  const ActualMonth = new Date().getMonth()
  const ActualDay = new Date().getDate()
  const yearSection = 2
  export default {
    props: {
      repaymentDateAll: {
        type: Array,
        default: () => {
          return []
        }
      },
      btnSnow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        oDate: new Date(),
        oData: [],
        userId: '',
        thisYear: new Date().getFullYear(),
        thisMonth: new Date().getMonth() + 1,
        thisDay: new Date().getDate()
      }
    },
    created () {
      this.setRun()
    },
    computed: {
      monthVal () {
        let monthNum = '00' + this.thisMonth
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dayVal () {
        let monthNum = '00' + this.thisDay
        return monthNum.substr(monthNum.length - 2, monthNum.length)
      },
      dateTime () {
        return this.thisYear + '-' + this.monthVal + '-' + this.dayVal
      },
      paymentDay () {
        return this.thisDay
      },
      checkoData () {
        if (this.oData.length < 1 || this.repaymentDateAll.length < 1 || !this.btnSnow) {
          return this.oData
        }
        for (let i = 0; i < this.oData.length; i++) {
          for (let j = 0; j < this.repaymentDateAll.length; j++) {
            if (this.oData[i].deTime === this.repaymentDateAll[j]) {
              const cn = this.oData[i].CN
              const cn1 = cn + ' hasRd'
              this.$set(this.oData[i], 'CN', cn1)
            }
          }
        }
        return this.oData
      }
    },
    methods: {
      setRun (y, m, d) {
        this.oData = []
        if (y && m && d) {
          this.oDate.setFullYear(y)
          this.oDate.setMonth(m - 1)
          this.oDate.setDate(d)
        }

        this.thisYear = this.oDate.getFullYear()
        this.thisMonth = this.oDate.getMonth() + 1
        this.thisDay = this.oDate.getDate()

        let year = this.oDate.getFullYear()
        let month = this.oDate.getMonth()

        let allDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

        if (month === 1) {
          if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            allDay = 29
          }
        }

        this.oDate.setDate(1)
        let week = this.oDate.getDay() - 1

        if (week < 0) {
          week = 6
        }

        for (let i = 0; i < week; i++) {
          let obj1 = {}
          obj1 = {
            CN: '',
            val: '',
            deTime: ''
          }
          this.oData.push(obj1)
        }

        for (let i = 1; i <= allDay; i++) {
          let obj2 = {}
          let iNum = '00' + i
          const iVal = iNum.substr(iNum.length - 2, iNum.length)
          obj2 = {
            CN: '',
            val: i,
            deTime: `${year}-${this.monthVal}-${iVal}`
          }
          this.oData.push(obj2)
        }

        for (let i = 0; i < this.oData.length; i++) {
          if (this.oData[i].val === this.paymentDay) {
            if (ActualDay === this.oData[i].val && ActualYear === year && ActualMonth === month) {
              this.$set(this.oData[i], 'CN', 'now-payment-day')
            } else {
              this.$set(this.oData[i], 'CN', 'payment-day')
            }
          } else if (ActualDay === this.oData[i].val) {
            if (ActualYear > year) {
              this.$set(this.oData[i], 'CN', 'old-now')
            } else if (ActualYear < year) {
              this.$set(this.oData[i], 'CN', 'new-now')
            } else {
              if (ActualMonth > month) {
                this.$set(this.oData[i], 'CN', 'old-now')
              } else if (ActualMonth < month) {
                this.$set(this.oData[i], 'CN', 'new-now')
              } else {
                this.$set(this.oData[i], 'CN', 'now')
              }
            }
          } else if (ActualYear > year) {
            this.$set(this.oData[i], 'CN', 'old')
            if (i % 7 === 5 || i % 7 === 6) {
              this.$set(this.oData[i], 'CN', 'old sun')
            }
          } else if (ActualYear < year) {
            this.$set(this.oData[i], 'CN', 'new')
            if (i % 7 === 5 || i % 7 === 6) {
              this.$set(this.oData[i], 'CN', 'new sun')
            }
          } else {
            if (ActualMonth > month) {
              this.$set(this.oData[i], 'CN', 'old')
              if (i % 7 === 5 || i % 7 === 6) {
                this.$set(this.oData[i], 'CN', 'old sun')
              }
            } else if (ActualMonth < month) {
              this.$set(this.oData[i], 'CN', 'new')
              if (i % 7 === 5 || i % 7 === 6) {
                this.$set(this.oData[i], 'CN', 'new sun')
              }
            } else if (ActualDay > this.oData[i].val) {
              this.$set(this.oData[i], 'CN', 'old')
              if (i % 7 === 5 || i % 7 === 6) {
                this.$set(this.oData[i], 'CN', 'old sun')
              }
            } else {
              this.$set(this.oData[i], 'CN', 'new')
              if (i % 7 === 5 || i % 7 === 6) {
                this.$set(this.oData[i], 'CN', 'new sun')
              }
            }
          }
        }
        this.$emit('getCPdata', this.dateTime)
      },
      dealInit () {
        this.thisYear = new Date().getFullYear()
        this.thisMonth = new Date().getMonth() + 1
        this.thisDay = new Date().getDate()
        const _this = this
        this.setRun(_this.thisYear, _this.thisMonth, _this.thisDay)
      },
      logined (res) {
        this.userId = res.user_Id
      },
      addYear () {
        this.thisYear++
        if (this.thisYear > ActualYear + yearSection) {
          this.thisYear--
          return
        }
        this.thisMonth = 1
        this.thisDay = 1
        this.carryRun()
      },
      removeYear () {
        this.thisYear--
        if (this.thisYear < ActualYear - yearSection) {
          this.thisYear++
          return
        }
        this.thisMonth = 1
        this.thisDay = 1
        this.carryRun()
      },
      addMonth () {
        this.thisDay = 1
        if (this.thisMonth > 11) {
          this.thisYear++
          if (this.thisYear > ActualYear + yearSection) {
            this.thisYear--
            return
          }
          this.thisMonth = 1
          this.carryRun()
          return
        }
        this.thisMonth++
        this.carryRun()
      },
      removeMonth () {
        this.thisDay = 1
        if (this.thisMonth < 2) {
          this.thisYear--
          if (this.thisYear < ActualYear - yearSection) {
            this.thisYear++
            return
          }
          this.thisMonth = 12
          this.carryRun()
          return
        }
        this.thisMonth--
        this.carryRun()
      },
      findData (item) {
        if (!item.val) {
          return
        }
        this.thisDay = item.val
        const _this = this
        this.$emit('returnDt', _this.thisYear, _this.thisMonth, _this.thisDay)
        this.carryRun()
      },
      carryRun () {
        const _this = this
        let timer = ''
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.setRun(_this.thisYear, _this.thisMonth, _this.thisDay)
        }, 50)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .calendar-wrapper
    padding: 5px 0
    .calendar-header
      border-1px-b(#f5f5f5)
      .record-ctr-btns-wrapper
        .record-ctr-btns-box
          display: flex
          margin: 0 auto
          width: 90%
          height: 50px
          .record-ctr-btns
            display: flex
            &.rcb-tb-time
              flex: 0 0 90px
              width: 90px
              &.rcb-tb-mr
                margin-right: 12px
              .rcb-l
                display: flex
                align-items: center
                justify-content: center
                flex: 0 0 20px
                width: 20px
                height: 50px
                bg-image('l')
                background-position: center
                background-size: 10px auto
                background-repeat: no-repeat
                // extend-click()
              .rcb-ct
                flex: 1
                display: flex
                align-items: center
                justify-content: center
                height: 50px
                font-size: 12px
                color: #ff4e49
              .rcb-r
                display: flex
                align-items: center
                justify-content: center
                flex: 0 0 20px
                width: 20px
                height: 50px
                bg-image('r')
                background-position: center
                background-size: 10px auto
                background-repeat: no-repeat
                // extend-click()
            &.rcb-tb-now
              flex: 1
              justify-content: flex-end
              .rcb-tb
                display: flex
                align-items: center
                justify-content: flex-end
                flex: 0 0 60px
                width: 60px
                height: 50px
                color: #ff4e49
                font-size: 12px
                extend-click()
    .calendar-title
      padding: 0 5px
    .calendar-content
      padding: 0 5px
    .calendar-list
      overflow: hidden
      .calendar-item
        float: left
        width: 14.2857%
        text-align: center
        line-height: 36px
        .item-wrapper
          position: relative
          display: block
          height: 0
          padding-top: 100%
          .item-txt
            position: absolute
            display: block
            width: 36px
            height: 36px
            top: 50%
            left: 50%
            transform: translate3d(-50%, -50%, 0)
            background-size: auto 100%
            color: #646464
            &.clo
              color: #ff4e49
        &.new
          .item-txt
            z-index: 1
            color: #969696
        &.now
          .item-txt
            z-index: 1
            bg-image('now-bg')
            color: #288cf0
        &.now-payment-day
          .item-txt
            z-index: 1
            bg-image('now-bg')
            color: #ff4e49
        &.old-now
          .item-txt
            z-index: 1
        &.new-now
          .item-txt
            z-index: 1
            color: #969696
        &.payment-day
          .item-txt
            z-index: 1
            color: #ff4e49
        &.hasRd
          .item-txt
            z-index: 1
            bg-image('payment-bg')
            color: #ff4e49
</style>
