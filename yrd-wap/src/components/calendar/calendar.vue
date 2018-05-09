<template>
  <div class="calendar-wrapper">
    <div class="calendar-header border-1px-b">

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
            <span class="item-txt">六</span>
          </span>
        </li>
        <li class="calendar-item">
          <span class="item-wrapper">
            <span class="item-txt">日</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="calendar-content">
      <ul class="calendar-list">
        <li class="calendar-item" v-for="(item, index) in oData" :class="item.CN">
          <span class="item-wrapper">
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
  export default {
    data() {
      return {
        iNow: 0,
        paymentDay: 25,
        oDate: new Date(),
        oData: []
      }
    },
    created () {
      this.setRun()
    },
    methods: {
      setRun (y, m, d) {
        if (y && m && d) {
          this.oDate.setFullYear(y)
          this.oDate.setMonth(m - 1)
          this.oDate.setDate(d)
        }

        let year = this.oDate.getFullYear()
        let month = this.oDate.getMonth()
        let today = this.oDate.getDate()

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
            val: ''
          }
          this.oData.push(obj1)
        }

        for (let i = 1; i <= allDay; i++) {
          let obj2 = {}
          obj2 = {
            CN: '',
            val: i
          }
          this.oData.push(obj2)
        }

        for (let i = 0; i < this.oData.length; i++) {
          if (this.oData[i].val === this.paymentDay) {
            this.$set(this.oData[i], 'CN', 'payment-day')
          } else if (this.oData[i].val === today) {
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
          } else if (ActualYear < year) {
            if (i % 7 === 5 || i % 7 === 6) {
              this.$set(this.oData[i], 'CN', 'sun')
            } else {
              this.$set(this.oData[i], 'CN', 'new')
            }
          } else {
            if (ActualMonth > month) {
              this.$set(this.oData[i], 'CN', 'old')
            } else if (ActualMonth < month) {
              if (i % 7 === 5 || i % 7 === 6) {
                this.$set(this.oData[i], 'CN', 'sun')
              } else {
                this.$set(this.oData[i], 'CN', 'new')
              }
            } else if (this.oData[i].val < today) {
              this.$set(this.oData[i], 'CN', 'old')
            } else if (i % 7 === 5 || i % 7 === 6) {
              this.$set(this.oData[i], 'CN', 'sun')
            } else {
              this.$set(this.oData[i], 'CN', 'new')
            }
          }
        }
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
        &.now
          .item-txt
            z-index: 1
            bg-image('now-bg')
            color: #288cf0
        &.old-now
          .item-txt
            border: 1px solid #000
            z-index: 1
        &.new-now
          .item-txt
            border: 1px solid #000
            z-index: 1
        &.payment-day
          .item-txt
            z-index: 1
            bg-image('payment-bg')
            color: #ff4e49
</style>
