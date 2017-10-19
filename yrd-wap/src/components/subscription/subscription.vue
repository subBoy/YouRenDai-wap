<template>
  <div class="subscription-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined"></m-header>
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <scroll class="subscription-scroll" :data="rewardList">
      <div class="subscription-group">
        <div class="prompt-wrapper">
          <div class="realed-name-desc" v-if="realed">
            <p class="txt">{{userTxt}}</p>
          </div>
          <div class="real-name-desc" v-else>
            <h3 class="title">实名认证 安全保障</h3>
            <p class="desc">落实监管新规 保障用户的每一分钱</p>
          </div>
        </div>
        <div class="real-name-operate" v-show="!realed">
          <ul class="real-operate-wrapper">
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" placeholder="输入姓名" v-model="realName">
              <p class="prompt-txt styl">{{nameErr}}</p>
            </li>
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" placeholder="身份证号" v-model="idCard">
              <p class="prompt-txt styl">{{idCardErr}}</p>
            </li>
          </ul>
        </div>
        <div class="real-name-operate">
          <ul class="real-operate-wrapper">
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" disabled="disabled" placeholder="剩余可投资">
              <p class="prompt-txt">{{surplus}}元</p>
            </li>
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" disabled="disabled" placeholder="本次投资">
              <p class="prompt-txt">{{loanMoney}}元</p>
            </li>
          </ul>
        </div>
        <div class="reward-wrapper">
          <h3 class="title border-1px-b">使用平台奖励</h3>
          <ul class="reward-group" v-show="rewardList.length > 0">
            <li class="reward-item" v-for="(reward, index) in rewardList">
              <div class="reward-view-wrapper" :class="{'selected': reward.selected}" @click="selectReward(index)">
                <div class="reward-bg"><span class="reward-val">{{ckeckVal(reward)}}</span><span class="reward-name">{{reward.rewardName}}</span></div>
                <div class="reward-num">共计：<span class="styl">{{reward.rewardNum}}</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">{{reward.descTxtNum}}</span></p>
                <div class="reward-input">
                  <div class="btn-remove" @click="removeInvest(index)"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" type="tel" v-model="reward.investAmount">
                  </div>
                  <div class="btn-add" @click="addInvest(index)"></div>
                </div>
              </div>
            </li>
          </ul>
          <div class="air-reward" v-show="!rewardList.length || rewardList.length === 0">暂无奖励可用~</div>
        </div>
      </div>
    </scroll>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import FootBtn from 'base/foot-btn/foot-btn'
  import TopTip from 'base/top-tip/top-tip'
  import {subscription, getRewardList} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '确认认购',
        realed: true,
        realName: '',
        idCard: '',
        nameErr: '',
        idCardErr: '',
        surplus: this.$route.params.surplus,
        loanMoney: this.$route.params.loanMoney,
        submitBtnTxt: '确认提交',
        reward: '',
        rewardLines: '',
        rewardType: '',
        projectId: this.$route.params.id,
        projectType: '',
        rewardList: [],
        selectItems: [],
        userTxt: '',
        caveatText: ''
      }
    },
    created() {
      this._getRewardList()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      submitFuc () {
        console.log('确认认购')
        this._subscription()
      },
      logined (res) {
        this.userTxt = res.isEvaluatedResult
        if (res.usernameCh && res.usernameCh !== '') {
          this.realed = true
        } else {
          this.realed = false
        }
      },
      selectReward(sn) {
        let bool = this.rewardList[sn].selected
        bool = !bool
        this.$set(this.rewardList[sn], 'selected', bool)
      },
      removeInvest(sn) {
        let num3 = this.rewardList[sn].investAmount
        if (num3 <= 1) {
          return
        }
        num3--
        this.$set(this.rewardList[sn], 'investAmount', num3)
      },
      addInvest(sn) {
        let num1 = this.rewardList[sn].rewardNum
        let num2 = this.rewardList[sn].descTxtNum
        let num3 = this.rewardList[sn].investAmount
        if (num3 >= num1 || num3 >= num2) {
          return
        }
        num3++
        this.$set(this.rewardList[sn], 'investAmount', num3)
      },
      caveat() {
        this.$refs.topTip.show()
      },
      ckeckVal(reward) {
        if (reward.rewardName === '现金券') {
          return `${reward.rewardLines}元现金券`
        }
        if (reward.rewardName === '返现券') {
          if (reward.rewardLines === 1.8 || reward.rewardLines === 1.2) {
            return `${reward.rewardLines}%返现券`
          }
          return `${reward.rewardLines}元返现券`
        }
        if (reward.rewardName === '加息券') {
          if (reward.rewardLines === 1) {
            return `${reward.rewardLines}%八月奖励加息券`
          }
          return `${reward.rewardLines}%加息券`
        }
        return `${reward.rewardLines}%收益券`
      },
      _getRewardList() {
        getRewardList(this.projectId, this.loanMoney).then((res) => {
          this.rewardList = this._formatData(res.data_list)
          console.log(res)
        })
      },
      _formatData(data) {
        let ret = []
        data.forEach((item, index) => {
          ret.push({
            rewardVal: item.reward_name,
            rewardName: item.reward_type_name_ch,
            rewardNum: item.actual_possession,
            descTxtNum: item.use_max,
            investAmount: 1,
            selected: false,
            minInvestAmout: item.min_investment_amount,
            rewardId: item.reward_id,
            rewardLines: item.reward_lines,
            rewardEnName: item.reward_type_name_en,
            useWithLuckMoney: item.use_with_luck_money,
            useWithOthersType: item.use_with_others_type,
            useWithSameType: item.use_with_same_type
          })
        })
        return ret
      },
      _subscription() {
        this.selectItems = []
        this.rewardList.forEach((item) => {
          if (item.selected) {
            this.selectItems.push(item)
          }
        })
        this.selectItems.forEach((rewardItem) => {
          this.reward += `${rewardItem.rewardId}_${rewardItem.investAmount},`
          this.rewardType += `${rewardItem.rewardEnName},`
          this.rewardLines += `${rewardItem.rewardLines},`
        })

        this.reward = this.reward.substring(0, this.reward.length - 1)
        this.rewardType = this.rewardType.substring(0, this.rewardType.length - 1)
        this.rewardLines = this.rewardLines.substring(0, this.rewardLines.length - 1)

        subscription(this.changeLoginState, this.realName, this.idCard, this.reward, this.rewardLines, this.rewardType, this.projectId, this.loanMoney, this.projectType).then((res) => {
          this.reward = ''
          this.rewardType = ''
          this.rewardLines = ''
          if (res.ret_code === '1') {
            location.href = res.ret_set.redirect_url
          } else {
            this.caveatText = res.ret_msg
            this.caveat()
          }
          console.log('认购确认：', res)
        })
      }
    },
    components: {
      MHeader,
      Scroll,
      FootBtn,
      TopTip
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .subscription-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .subscription-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 84px
      left: 0
      .subscription-group
        min-height: 100%
        background-color: $color-text
        .prompt-wrapper
          padding: 10px 20px
          background-color: $color-background
          .real-name-desc
            padding: 10px 0
            .title
              line-height: 30px
              font-size: $font-size-large-z
              color: $color-tle
            .desc
              line-height: 22px
              font-size: $font-size-small
              color: $color-q
          .realed-name-desc
            padding: 5px 0
            .txt
              line-height: 20px
              font-size: $font-size-small-s
              color: $color-tle
        .real-name-operate
          padding-bottom: 5px
          background-color: $color-background
          .real-operate-wrapper
            padding: 0 20px
            background-color: $color-text
            .real-operate-item
              position: relative
              padding: 10px 0
              border-1px-b(#f5f5f5)
              &:last-child:after
                border: none
              .operate-input
                position: absolute
                left: 0
                top: 10px
                width: 100%
                line-height: 34px
                width: 100%
                height: 34px
                font-size: $font-size-medium
                color: $color-q
                outline: none
                background-color: transparent
              .prompt-txt
                line-height: 34px
                width: 100%
                height: 34px
                font-size: $font-size-medium
                color: $color-tle
                text-align: right
                .styl
                  color: $btn-clo
                  font-size: $font-size-small-s
        .reward-wrapper
          padding: 0 20px
          .title
            padding: 10px 0
            line-height: 34px
            font-size: $font-size-medium
            color: $color-tle
            border-1px-b(#f5f5f5)
          .reward-item
            padding-top: 17px
            .reward-view-wrapper
              position: relative
              padding-left: 25px
              bg-image('select')
              background-position: center left
              background-size: 20px 20px
              &.selected
                bg-image('selected')
              .reward-bg
                position: relative
                height: 24px
                width: 82px
                bg-image('prick')
                background-size: 100% 100%
                .reward-val
                  display: block
                  position: absolute
                  width: 157%
                  left: 0
                  top: 50%
                  line-height: 24px
                  font-size: $font-size-medium-x
                  color: $color-text
                  height: 24px
                  text-align: center
                  transform: translate3d(0, -50%, 0) scale(0.5)
                  transform-origin: 0
                .reward-name
                  display: block
                  position: absolute
                  width: 23px
                  right: 17.75%
                  top: 50%
                  line-height: 16px
                  font-size: $font-size-small
                  color: $color-text
                  height: 200%
                  text-align: center
                  transform: translate3d(50%, -50%, 0) scale(0.5)
                  transform-origin: 100% 50%
              .reward-num
                position: absolute
                right: 0
                top: 0
                line-height: 24px
                font-size: $font-size-small
            .reward-desc-wrapper
              position: relative
              padding: 11px 0 3px
              .desc-txt
                line-height: 20px
                font-size: $font-size-small
              .reward-input
                display: flex
                position: absolute
                right: 0
                top: 11px
                height: 20px
                width: 83px
                border: 1px solid #f5f5f5
                border-radius: 3px
                .btn-remove
                  flex: 0 0 20px
                  width: 20px
                  height: 20px
                  extend-click()
                  bg-image('buyDeBtn')
                  background-size: 50% auto
                  background-position: center
                  background-repeat: no-repeat
                .btn-add
                  flex: 0 0 20px
                  width: 20px
                  hieght: 20px
                  extend-click()
                  bg-image('buyPlusBtn')
                  background-size: 50% auto
                  background-position: center
                  background-repeat: no-repeat
                .input-wrapper
                  flex: 1
                  .input-self
                    width: 100%
                    line-height: 20px
                    height: 20px
                    font-size: $font-size-small
                    background-color: $color-background
                    color: $color-tle
                    text-align: center
          .air-reward
            line-height: 54px
            text-align: center
            font-size: $font-size-small
            color: $color-q
</style>
