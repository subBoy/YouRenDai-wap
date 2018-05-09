<template>
  <div class="calendar-payment-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="calendar-payment-group">
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Calendar from 'components/calendar/calendar'

  export default {
    data() {
      return {
        titleTxt: '还款日历',
        isShow: false,
        opcity: 1
      }
    },
    components: {
      MHeader,
      Calendar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .calendar-payment-wrapper
    .calendar-payment-group
      margin: 20px
      background-color: #fff
      border-radius: 10px;
</style>
