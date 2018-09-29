<template>
  <div class="bill-details-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="bill-details-scroll" ref="billScroll" :data="recordList">
      <div class="bill-details-content">
        <div class="Investment-details common-block">
          <h3 class="block-name border-none ic-1">出借明细</h3>
          <div class="not-investment-wrapper border-1px" v-show="!recordList.length || !recordList.length === 0">
            <div class="txt-box">
              <p class="txt">本月您还未出借~~~</p>
            </div>
            <router-link tag="div" class="invest-btn" to="/product-list">立即出借</router-link>
          </div>
          <div class="investment-wrapper" v-show="recordList.length && recordList.length > 0">
            <ul class="investment-title-list">
              <li class="investment-title-item flex-1"><span class="txt">项目名称</span></li>
              <li class="investment-title-item flex-1-1"><span class="txt">出借时间</span></li>
              <li class="investment-title-item flex-1-1"><span class="txt">出借到期日</span></li>
              <li class="investment-title-item flex-1-2"><span class="txt">出借金额/元</span></li>
              <li class="investment-title-item flex-1-2"><span class="txt">利息收益/元</span></li>
            </ul>
            <ul class="investment-record-item" v-for="(item, index) in recordList">
              <li class="investment-record-desc border-1px flex-1"><span class="txt">{{item.project_name}}</span></li>
              <li class="investment-record-desc border-1px flex-1-1"><span class="txt">{{item.create_date.split(' ')[0]}}<br/>{{item.create_date.split(' ')[1]}}</span></li>
              <li class="investment-record-desc border-1px flex-1-1"><span class="txt">{{item.pepayment_date.split(' ')[0]}}<br/>{{item.pepayment_date.split(' ')[1]}}</span></li>
              <li class="investment-record-desc border-1px flex-1-2"><span class="txt">{{item.invest_money}}</span></li>
              <li class="investment-record-desc border-1px flex-1-2"><span class="txt">{{item.earnings}}</span></li>
            </ul>
          </div>
        </div>
        <div class="Investment-details common-block">
          <h3 class="block-name border-none ic-1">回款明细</h3>
          <div class="not-investment-wrapper border-1px" v-show="!recordList2.length || !recordList2.length === 0">
            <div class="txt-box">
              <p class="txt">本月您还没有回款明细~~~</p>
            </div>
            <router-link tag="div" class="invest-btn" to="/product-list">立即出借</router-link>
          </div>
          <div class="investment-wrapper" v-show="recordList2.length && recordList2.length > 0">
            <ul class="investment-title-list">
              <li class="investment-title-item flex-1"><span class="txt">回款项目</span></li>
              <li class="investment-title-item flex-1-1"><span class="txt">回款时间</span></li>
              <li class="investment-title-item flex-1-1"><span class="txt">本金/元</span></li>
              <li class="investment-title-item flex-1-2"><span class="txt">利息/元</span></li>
              <li class="investment-title-item flex-1-2"><span class="txt">回款总计/元</span></li>
            </ul>
            <ul class="investment-record-item" v-for="(item, index) in recordList2">
              <li class="investment-record-desc border-1px flex-1"><span class="txt">{{item.project_name}}</span></li>
              <li class="investment-record-desc border-1px flex-1-1"><span class="txt">{{item.createdate.split(' ')[0]}}<br/>{{item.createdate.split(' ')[1]}}</span></li>
              <li class="investment-record-desc border-1px flex-1-1"><span class="txt">{{item.principal}}</span></li>
              <li class="investment-record-desc border-1px flex-1-2"><span class="txt">{{item.rate}}</span></li>
              <li class="investment-record-desc border-1px flex-1-2"><span class="txt">{{item.total}}</span></li>
            </ul>
          </div>
        </div>
        <div class="activity-recommend common-block">
          <h3 class="block-name ic-2">活动推荐</h3>
          <div class="not-investment-wrapper" v-show="!oldRules && !newRules">
            <div class="txt-box">
              <p class="txt">暂无活动，热情不减</p>
              <p class="txt">出借再继续~~~</p>
            </div>
            <router-link tag="div" class="invest-btn" to="/product-list">立即出借</router-link>
          </div>
          <div class="activity-recommend-wrapper" v-show="oldRules || newRules">
            <div class="img-wrapper" v-show="oldRules">
              <div class="img-box"></div>
            </div>
            <div class="news-user-wrapper" v-show="newRules">
              <div class="news-user-box"></div>
            </div>
            <router-link tag="div" class="invest-btn" to="/product-list">立即参加</router-link>
          </div>
        </div>
        <div class="remarks common-block" v-show="oldRules || newRules">
          <h3 class="block-name ic-3">备注</h3>
          <div class="remarks-wrapper">
            <ul class="rules-list" v-show="oldRules">
              <li class="rules-item"><span class="serial">1.</span>出借10000元（包含10000）以上使用；</li>
              <li class="rules-item"><span class="serial">2.</span>本活动不与其他活动同享，不与新手红包同享，只限老用户使用；</li>
              <li class="rules-item"><span class="serial">3.</span>在平台出借超过1次，为老用户。</li>
            </ul>
            <ul class="desc-list" v-show="newRules">
              <li class="desc-item">平台标的均可使用，本活动不与其他活动同享，不与现金券同享，只限注册新用户使用；</li>
              <li class="desc-item"><span class="hb">18元红包</span><span class="desc-txt">出借满1800元</span></li>
              <li class="desc-item"><span class="hb">20元红包</span><span class="desc-txt">出借满2000元</span></li>
              <li class="desc-item"><span class="hb">50元红包</span><span class="desc-txt">出借满5000元</span></li>
              <li class="desc-item"><span class="hb">100元红包</span><span class="desc-txt">出借满10,000元</span></li>
              <li class="desc-item"><span class="hb">200元红包</span><span class="desc-txt">出借满20,000元</span></li>
              <li class="desc-item"><span class="hb">500元红包</span><span class="desc-txt">出借满50,000元</span></li>
              <li class="desc-item"><span class="hb">1000元红包</span><span class="desc-txt">出借满100,000元</span></li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getBillDetails} from 'api/user'
  import {getMessageId, getCreateDate} from 'common/js/cache'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '账单详情',
        recordList: [],
        recordList2: [],
        oldRules: false,
        newRules: false
      }
    },
    created() {
      this._getBillDetails()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      _getBillDetails() {
        const createDate = getCreateDate()
        const messageId = getMessageId()
        getBillDetails(this.changeLoginState, createDate, messageId).then((res) => {
          const billData = res.ret_set
          if (res.ret_code === '1') {
            this.recordList = billData.InvestmentRecord
            this.recordList2 = billData.RepaymentRecord
            if (billData.status === 'oldLogin') {
              if (billData.reward_old === 'yes') {
                this.oldRules = true
              } else {
                this.oldRules = false
              }
            } else {
              if (billData.reward === 'yes') {
                this.newRules = true
              } else {
                this.newRules = false
              }
            }
          }
        })
      }
    },
    watch: {
      oldRules() {
        this.$refs.billScroll.refresh()
      },
      newRules() {
        this.$refs.billScroll.refresh()
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .bill-details-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .bill-details-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .bill-details-content
        padding: 5px 0
        .common-block
          margin: 10px auto
          width: 90%
          background-color: $color-text
          border-radius: 15px
          box-shadow: 0px 5px 5px -6px #ccc
        .block-name
          line-height: 44px
          padding-left: 35px
          font-size: $font-size-medium
          color: $color-tle
          border-1px-b(#f5f5f5)
          background-position: 10px center
          background-size: 20px 20px
          background-repeat: no-repeat
          &.border-none
            border-1px-b(#fff)
          &.ic-1
            bg-image('details')
          &.ic-2
            bg-image('recommend')
          &.ic-3
            bg-image('remarks')
        .invest-btn
          margin: 0 auto
          line-height: 28px
          padding-left: 2px
          width: 35%
          height: 28px
          border-radius: 14px
          color: $color-text
          background-color: $btn-clo
          box-shadow: 0px 5px 5px -6px #ccc
          font-size: 14px
          letter-spacing: 2px
        .not-investment-wrapper
          padding: 20px 0 30px
          text-align: center
          &.border-1px
            border-1px(#f5f5f5)
          .txt-box
            padding: 0 0 14px
            .txt
              line-height: 24px
              font-size: $font-size-small
              color: $color-tle
        .activity-recommend-wrapper
          padding: 20px 0 30px
          text-align: center
          .img-wrapper
            margin: 0 auto
            padding-bottom: 25px
            width: 60%
            .img-box
              padding-top: 50%
              height: 0
              background-repeat: no-repeat
              background-position: center
              background-size: 100% auto
              bg-image('ticket')
          .news-user-wrapper
            margin: 0 auto
            padding-bottom: 25px
            width: 90%
            .news-user-box
              padding-top: 50%
              height: 0
              background-repeat: no-repeat
              background-position: center
              background-size: 100% auto
              bg-image('hb')
        .remarks-wrapper
          padding-bottom: 20px
          .rules-list
            padding: 7px 0
            .rules-item
              position: relative
              padding-left: 15px
              line-height: 26px
              font-size: $font-size-small
              color: #666
              .serial
                display: block
                position: absolute
                top: 0
                left: 0
          .desc-list
            padding: 7px 0
            .desc-item
              display: flex
              line-height: 26px
              font-size: $font-size-small
              color: #666
              .hb
                flex: 1
              .desc-txt
                flex: 1.5
                padding-left: 25px
                bg-image('jt')
                background-size: 20px 15px
                background-position: center left
                background-repeat: no-repeat
        .flex-1
          width: 17%
        .flex-1-1
          width: 20%
        .flex-1-2
          width: 21.5%
        .investment-title-list
          height: 24px
          background-color: #ff4e49
          text-align: center
          overflow: hidden
          border-radius: 5px 5px 0 0
          .investment-title-item
            display: flex
            height: 24px
            flex-direction: column
            justify-content: center
            align-items: center
            float: left
            .txt
              display: block
              width: 200%
              line-height: 46px
              font-size: 22px
              transform: scale(0.5)
              color: $color-text
        .investment-record-item
          text-align: center
          overflow: hidden
          box-sizing: border-box
          .investment-record-desc
            display: flex
            flex-direction: column
            justify-content: center
            height: 60px
            float: left
            box-sizing: border-box
            border-1px(#f5f5f5)
            .txt
              display: block
              width: 200%
              line-height: 30px
              font-size: 20px
              transform: scale(0.5)
              transform-origin: 0
              color: #666
</style>
