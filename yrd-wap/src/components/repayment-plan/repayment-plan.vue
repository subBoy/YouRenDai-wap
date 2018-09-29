<template>
  <div class="repayment-plan-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="repayment-plan-scroll" :data="plans">
      <div class="repayment-plan-group">
        <div class="repayment-plan">
          <h3 class="repayment-plan-title-box">还款期数<output id="totle">共{{plans.length}}期</output></h3>
        </div>
        <div class="repayment-plan-ct-wrapper repayment-plan-title-box">
          <div class="subScription-1">
            <ul class="recording-header">
              <li class="t-align-l">还款类型</li>
              <li>还款时间</li>
              <li class="t-align-r">应付金额</li>
            </ul>
            <div class="recording-context" id="repaymentPlan">
              <!-- 有记录 -->
              <ul v-show="plans.length && plans.length > 0" v-for="plan in plans">
                <li class="t-align-l-123"><p>{{plan.repayment_type}}</p></li>
                <li>{{plan.repayment_date.split(" ")[0]}}</li>
                <li class="t-align-r">￥{{plan.repayment_money}}</li>
              </ul>
              <!-- 无记录 -->
              <p class="not-repay" v-show="!plans.length || plans.length <= 0">暂未产生还款计划</p>
            </div>
          </div>
          <div class="repayment-plan pt-none">
            <h3>总计本息金额<output id="totleMoney">￥{{totleMoney}}</output></h3>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getRepaymentPlan} from 'api/product'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '还款计划',
        plans: [],
        totleMoney: 0
      }
    },
    activated () {
      setTimeout(() => {
        this._getRepaymentPlan()
      }, 20)
    },
    created() {
      this._getRepaymentPlan()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      _getRepaymentPlan() {
        getRepaymentPlan(this.changeLoginState, this.$route.params.projectId).then((res) => {
          if (res.ret_code === '1') {
            this.plans = res.repaymentplanJson
            this.totleMoney = res.totleMoney
          }
        })
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .repayment-plan-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .repayment-plan-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .repayment-plan-group
        margin: 0 20px 20px 20px
        .subScription-1
          padding: 0
          background: #fff
        .subScription-1 ul
          padding: 0 10px
          overflow: hidden
          border-bottom: 1px solid #f0f0f0
        *
          box-sizing: border-box
        .subScription-1 ul li
          width: 33.33333%
          float: left
          font-size: 14px
          line-height: 14px
          text-align: center
          padding: 15px 0
          color: #c8c8c8
        .subScription-1 ul li.t-align-l
          text-align: left
        .subScription-1 ul li.t-align-l-123 p
          text-align: left
          padding-left: 10px
        .subScription-1 ul li.t-align-r
          text-align: right
          color: #464646
        .subScription-1 ul.recording-header li
          font-size: 12px
          line-height: 12px
          padding: 15px 0
          color: #464646
        .not-repay
          color: #c8c8c8
          text-align: center
          font-size: 12px
          line-height: 12px
          padding: 25px 0
          border-bottom: 1px solid #f0f0f0
        .repayment-plan
          padding: 10px 0
        .repayment-plan.pt-none
          padding: 0
        .repayment-plan h3
          position: relative
          color: #666
          font-size: 12px
          line-height: 45px
          padding: 0px 10px
          background: #fff
        .repayment-plan-title-box
          border-radius: 10px
          -webkit-box-shadow:0 1px 8px -3px #ccc
          -moz-box-shadow:0 1px 8px -3px #ccc
          box-shadow:0 1px 8px -3px #ccc
          overflow: hidden
        .repayment-plan h3 output
          position: absolute
          right: 10px
          top: 0
          display: block
          font-size: 12px
          color: #666
          padding: 0
        .repayment-plan h3 output em
          font-size: 19px
          color: #464646
</style>
