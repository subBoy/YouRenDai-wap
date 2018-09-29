<template>
  <div class="subscription-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined"></m-header>
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <a :href="threePagelink" id="threePagelink"></a>
    <scroll class="subscription-scroll" ref="subScroll" :data="rewardList">
      <div class="subscription-group">
        <div class="prompt-wrapper add-comm-styl">
          <div class="realed-name-desc" v-if="realed">
            <p class="txt">{{userTxt}}</p>
          </div>
          <div class="real-name-desc" v-else>
            <h3 class="title">实名认证 安全保障</h3>
            <p class="desc">落实监管新规 保障用户的每一分钱</p>
          </div>
        </div>
        <div class="real-name-operate add-comm-styl" v-show="!realed">
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
        <div class="real-name-operate add-comm-styl">
          <ul class="real-operate-wrapper">
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" disabled="disabled" placeholder="剩余可出借">
              <p class="prompt-txt">{{surplus}}元</p>
            </li>
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" disabled="disabled" placeholder="本次出借">
              <p class="prompt-txt">{{loanMoney}}元</p>
            </li>
          </ul>
        </div>
        <div class="reward-wrapper add-comm-styl">
          <h3 class="title border-1px-b">使用平台奖励</h3>
          <ul class="reward-group" v-show="rewardList.length > 0">
            <li class="reward-item" v-for="(reward, index) in rewardList">
              <div class="reward-view-wrapper" :class="{'selected': reward.selected}" @click="selectReward(reward, index)">
                <div class="reward-bg"><span class="reward-val">{{ckeckVal(reward)}}</span><span class="reward-name">{{reward.rewardName}}</span></div>
                <div class="reward-num">共计：<span class="styl">{{reward.rewardNum}}</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次出借可用：<span class="num">{{reward.descTxtNum}}</span></p>
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
          <!-- v-show="rewardList.length > 0" -->
          <!-- <div class="air-reward">暂不支持使用奖励券，如有奖励券，<br/>请到<a class="styl" :href="getPc()">电脑</a>或<a class="styl" @click="downLoadApp">下载APP</a>使用</div> -->
          <div class="air-reward" v-show="!rewardList.length || rewardList.length === 0">暂无奖励可用~</div>
        </div>
        <!-- <div class="recharge-slot add-comm-styl" v-if="loanMoney > activityNum && bankCardNo.length > 0">
          <div class="recharge-slot-item border-1px-b">
            <div class="recharge-slot-item-tle">支付平台</div>
            <div class="recharge-pay-type border-1px-b" @click="seledFuc(0)">
              <img src="./tlzf.jpg" height="25">
              <span class="recharge-pay-type-btn">
                <span class="recharge-pay-type-sel" :class="{'seled': seled}"></span>
              </span>
            </div>
            <div class="recharge-pay-type" @click="seledFuc(1)">
              <img src="./fyzf.jpg" height="25">
              <span class="recharge-pay-type-btn">
                <span class="recharge-pay-type-sel" :class="{'seled': !seled}"></span>
              </span>
            </div>
            <p class="recharge-pay-type-desc border-1px" v-show="bankLimitTxt && bankLimitTxt.length > 0" v-html="bankLimitTxt"></p>
          </div>
        </div> -->
      </div>
    </scroll>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc">
      <div class="submit-https" slot="fb"><p class="submit-https-desc" :class="{'isReady': isReady}"><span class="submit-https-btn" @click="readyHttps"></span>我已阅读<span class="clo" @click="gotoSignDeal">《有人贷网络借贷风险及禁止性行为》</span></p></div>
    </foot-btn>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import FootBtn from 'base/foot-btn/foot-btn'
  import TopTip from 'base/top-tip/top-tip'
  import {subscription, getRewardList, rechargeCall} from 'api/user'
  import {_UA} from 'common/js/ua'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        threePagelink: '',
        bankCardNo: '',
        payType: 'ALLINPAY',
        seled: true,
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
        caveatText: '',
        activityNum: 0,
        userInfo: {},
        bankLimitTxt: '',
        rechargeCallData: {},
        isReady: false
      }
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      gotoSignDeal () {
        this.$router.push({
          path: '/sign-deal'
        })
      },
      readyHttps () {
        this.isReady = !this.isReady
      },
      seledFuc (num) {
        if (num === 0) {
          this.seled = true
          this.payType = 'ALLINPAY'
          if (this.rechargeCallData.bankLimt[0]) {
            this.bankLimitTxt = this.rechargeCallData.bankLimt[0].remarks
          } else {
            this.bankLimitTxt = ''
          }
          return
        }
        if (num === 1) {
          this.seled = false
          this.payType = 'FUIOU'
          if (this.rechargeCallData.bankLimt[1]) {
            this.bankLimitTxt = this.rechargeCallData.bankLimt[1].remarks
          } else {
            this.bankLimitTxt = ''
          }
          return
        }
      },
      downLoadApp () {
        if (_UA.isWeixin()) {
          this.caveatText = '请使用浏览器打开！'
          this.caveat()
          return
        }
        if (_UA.isIOS()) {
          location.href = 'https://itunes.apple.com/cn/app/you-ren-dai/id923214967?mt=8'
          return
        }
        location.href = 'http://www.yourendai.com/app_download/YouRenDai.apk'
      },
      getPc () {
        return `/loan/order2.0.shtml?projectId=${this.projectId}&loanMoney=${this.loanMoney}`
      },
      submitFuc () {
        if (!this.realed) {
          const reg = /^[\u4e00-\u9fa5]+$/gi

          const reg2 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

          if (!this.realName || this.realName === '') {
            this.caveatText = '真实姓名不能为空！'
            this.caveat()
            return
          }

          if (!reg.test(this.realName)) {
            this.caveatText = '请输入中文名字！'
            this.caveat()
            return
          }

          if (this.realName.length < 2 || this.realName.length > 5) {
            this.caveatText = '请输入正确的姓名（长度2到5个汉字）！'
            this.caveat()
            return
          }

          if (this.idCard === '') {
            this.caveatText = '身份证号不能为空！'
            this.caveat()
            return
          }

          if (!reg2.test(this.idCard)) {
            this.caveatText = '身份证号格式错误, 请核对后重新输入！'
            this.caveat()
            return
          }
        }

        if (!this.bankCardNo.length || this.bankCardNo.length < 1) {
          this.caveatText = '您还未绑定银行卡，请先去绑卡！'
          this.caveat()
          return
        }

        if (!this.isReady) {
          this.caveatText = '请同意《有人贷网络借贷风险及禁止性行为》'
          this.caveat()
          return
        }

        this._subscription()
      },
      logined (res) {
        this.userTxt = res.isEvaluatedResult
        if (res.usernameCh && res.usernameCh !== '') {
          this.realed = true
        } else {
          this.realed = false
        }
        const userId = res.user_Id
        getRewardList(userId, this.projectId, this.loanMoney).then((res) => {
          this.rewardList = this._formatData(res.data_list)
        })
        rechargeCall(userId).then((res) => {
          this.rechargeCallData = res
          if (res.bankCardNo) {
            this.bankCardNo = res.bankCardNo
          }
          if (res.bankLimt && res.bankLimt.length && res.bankLimt.length > 0) {
            this.bankLimitTxt = res.bankLimt[0].remarks
          }
        })
      },
      selectReward(obj, sn) {
        let bool = this.rewardList[sn].selected
        bool = !bool
        this.$set(this.rewardList[sn], 'selected', bool)
        if (obj.useWithSameType === 0) {
          this.rewardList.forEach((item, index) => {
            if (item.selected && obj.rewardId !== item.rewardId) {
              if (item.rewardName === obj.rewardName) {
                this.$set(this.rewardList[index], 'selected', false)
              }
            }
          })
        } else {
          this.rewardList.forEach((item, index) => {
            if (item.selected && obj.rewardId !== item.rewardId) {
              if (item.rewardName === obj.rewardName && item.useWithSameType === 0) {
                this.$set(this.rewardList[index], 'selected', false)
              }
            }
          })
        }
        if (obj.useWithOthersType === 0) {
          this.rewardList.forEach((item, index) => {
            if (item.selected && obj.rewardId !== item.rewardId) {
              if (item.rewardName !== obj.rewardName) {
                this.$set(this.rewardList[index], 'selected', false)
              }
            }
          })
        } else {
          this.rewardList.forEach((item, index) => {
            if (item.selected && obj.rewardId !== item.rewardId) {
              if (item.rewardName !== obj.rewardName && item.useWithOthersType === 0) {
                this.$set(this.rewardList[index], 'selected', false)
              }
            }
          })
        }
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
          return `${reward.rewardLines}元现金`
        }
        if (reward.rewardName === '返现券') {
          if (reward.rewardVal.indexOf('%') !== -1) {
            return `${reward.rewardLines}%返现券`
          }
          return `${reward.rewardLines}元返现券`
        }
        if (reward.rewardName === '加息券') {
          return `${reward.rewardLines}%加息券`
        }
        return `${reward.rewardLines}%收益券`
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
          this.rewardType += `${rewardItem.rewardName},`
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
            this.threePagelink = res.ret_set.redirect_url
            setTimeout(() => {
              document.getElementById('threePagelink').click()
            }, 20)
          } else {
            this.caveatText = res.ret_msg
            this.caveat()
          }
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .add-comm-styl
    margin: 10px 20px
    padding: 10px
    border-radius: 10px
    background-color: #fff
    box-shadow: 0px 3px 10px -6px #ccc
  .subscription-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .caveatText
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
      white-space: nowrap
    .submit-https
      width: 200%
      transform: scale(0.5)
      transform-origin: 0 100%
      text-align: center
      .submit-https-desc
        display: inline-block
        position: relative
        line-height: 30px
        padding-left: 35px
        bg-image('nr')
        background-position: left center
        background-size: 26px
        font-size: 20px
        .submit-https-btn
          display: block
          position: absolute
          left: 0
          top: 50%
          transform: translateY(-50%)
          width: 60px
          height: 60px
          z-index: 1
        .clo
          color: #2686fe
        &.isReady
          bg-image('yr')
    .subscription-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 114px
      left: 0
      .subscription-group
        padding: 5px 0 15px
        .prompt-wrapper
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
          padding: 0 10px
          .reward-group
            padding-bottom: 17px
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
            padding: 30px 0;
            line-height: 30px
            text-align: center
            font-size: $font-size-small
            color: $color-q
            .styl
              display: inline-block
              padding: 0 5px
              color: #ff4e49
        .recharge-slot
          padding: 0 20px
          background-color: #FFF
          .recharge-slot-item
            padding: 20px 0
            text-align: center
            font-size: 0
            border-1px-b(#f0f0f0)
            .recharge-slot-item-tle
              line-height: 20px
              margin-top: -3px
              padding-bottom: 17px
              font-size: $font-size-medium
              color: $color-tle
              text-align: left
            .recharge-pay-type
              position: relative
              padding: 20px 0 20px
              &.border-1px-b
                padding-top: 0 
                border-1px-b(#f5f5f5)
                .recharge-pay-type-btn
                  top: 5px
              .recharge-pay-type-btn
                display: flex
                align-items: center
                justify-content: center
                position: absolute
                right: 0
                top: 25px
                width: 14px
                height: 14px
                border-radius: 50%
                border: 1px solid #f0f0f0
                .recharge-pay-type-sel
                  width: 8px
                  height: 8px
                  border-radius: 550%
                  &.seled
                    background-color: #ff4e49
            .recharge-pay-type-desc
              padding-top: 15px
              border-1px(#f5f5f5)
              color: #ff4d4a
              font-size: 12px
</style>
