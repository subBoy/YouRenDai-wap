<template>
  <div class="subscription-wrapper" @touchmove.prevent>
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
              <input type="text" class="operate-input zIdx" placeholder="输入姓名" v-model="realName">
              <p class="prompt-txt styl">{{nameErr}}</p>
            </li>
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input zIdx" placeholder="身份证号" v-model="idCard">
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
              <p class="prompt-txt" v-show="isChangep"><span class="prompt-num ft-12" @click="cgInpState">{{loanMoney}}</span>元</p>
              <p class="prompt-txt" v-show="!isChangep">
                <span class="prompt-num-inp">
                  <span class="prompt-num-inp-box">
                    <span class="prompt-num-inp-ctr">
                      <input class="prompt-num-inp-ctr-cg" v-model="loanMoney">
                    </span>
                    <span class="prompt-num-inp-btn" @click="cgInpVal">确认</span>
                  </span>
                </span>
                <span class="prompt-num-unitl">元</span>
              </p>
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
          <div class="air-reward" v-show="!rewardList.length || rewardList.length === 0">暂无奖励可用~</div>
        </div>
      </div>
    </scroll>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc">
      <div class="submit-https" slot="fb"><p class="submit-https-desc" :class="{'isReady': isReady}"><span class="submit-https-btn" @click="readyHttps"></span>我已阅读<span class="clo" @click="gotoSignDeal">《有人贷网络借贷风险及禁止性行为》</span></p></div>
    </foot-btn>
    <transition name="drop">
      <div class="flag-win" v-show="sFg2">
        <div class="flag-win-ct">
          <div class="flag-win-box">
            <div class="flag-win-desc pb-15">
              <p class="flag-win-dtxt fz-12">根据监管相关规定，网络借贷信息中介机构应当根据风险评估结果对出借人实行分级管理，设置可动态调整的出借限额和出借标的限制。</p>
              <p class="flag-win-dtxt fz-12">您当前的风险测评等级为<span class="clo">“{{usertypeName}}”</span>，本标的出借限额为<span class="clo">{{gtnObj.p2}}万元</span>， 当前出借项目可能超出了您可承受的风险范围。</p>
              <p class="flag-win-dtxt fz-12">建议您：继续出借可根据您的实际情况再次进行风险评估，或选择其他期限项目出借。</p>
              <p class="flag-win-dtxt fz-12">请充分知晓出借风险提示，谨慎判断决策。</p>
            </div>
            <div class="flag-win-btn" @click="gtList">
              <span class="flag-win-btn-ctr fz-15">出借其他期限标的</span>
            </div>
            <div class="flag-win-btn mt-mt" :class="{'bgcr-c8': !gtnObj.balance || gtnObj.balance < 1}" @click="gtNotice">
              <span class="flag-win-btn-ctr fz-15">风险评估</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="drop">
      <div class="flag-win" v-show="sFg3">
        <div class="flag-win-ct">
          <div class="flag-win-box">
            <div class="flag-win-desc pb-15">
              <p class="flag-win-dtxt fz-12">  您当前的风险测评等级为<span class="clo">“{{usertypeName}}”</span>，根据监管相关规定，网络借贷信息中介机构应当根据风险评估结果对出借人实行分级管理，依据您的风险评估结果，在平台可出借金额限定为<span class="clo">{{gtnObj.p2}}万元</span>，当前出借金额可能高于您可承受风险范围，继续出借可根据您的实际情况再次进行风险评估，</p>
              <p class="flag-win-dtxt fz-12">  市场有风险，出借需谨慎，请充分知晓出借风险提示谨慎判断做出决策。</p>
            </div>
            <div class="flag-win-btn" @click="hide3">
              <span class="flag-win-btn-ctr fz-15">知道了</span>
            </div>
            <div class="flag-win-btn mt-mt" :class="{'bgcr-c8': !gtnObj.balance || gtnObj.balance < 1}" @click="gtNotice">
              <span class="flag-win-btn-ctr fz-15">风险评估</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import FootBtn from 'base/foot-btn/foot-btn'
  import TopTip from 'base/top-tip/top-tip'
  import {subscription, getRewardList, rechargeCall} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isChangep: true,
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
        userId: '',
        rechargeCallData: {},
        isReady: false,
        sFg2: false,
        sFg3: false,
        gtnObj: {
          code: '',
          p1: '',
          p2: 0
        }
      }
    },
    created () {
      if (this.$route.params.isReady && this.$route.params.isReady === 'isRy') {
        this.isReady = true
      }
      if (this.$route.params.realName) {
        this.realName = this.$route.params.realName.split('=')[1] || ''
      }
      if (this.$route.params.idCard) {
        this.idCard = this.$route.params.idCard.split('=')[1] || ''
      }
    },
    computed: {
      usertypeName () {
        if (this.gtnObj.p1 === 'A') {
          return '保守型'
        }
        if (this.gtnObj.p1 === 'B') {
          return '稳健型'
        }
        return '进取型'
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      cgInpState () {
        this.isChangep = false
      },
      cgInpVal () {
        if (!this.loanMoney) {
          this.caveatText = '出借最低金额为100元'
          this.caveat()
          return
        }
        if (this.loanMoney % 100 !== 0) {
          this.caveatText = '出借金额为100元的整数倍'
          this.caveat()
          return
        }
        if (this.loanMoney > this.surplus - 0) {
          this.caveatText = '出借金额超出剩余可出借金额'
          this.caveat()
          return
        }
        this.isChangep = true
        getRewardList(this.userId, this.projectId, this.loanMoney).then((res) => {
          this.rewardList = this._formatData(res.data_list)
        })
      },
      hide2 () {
        this.sFg2 = false
      },
      hide3 () {
        this.sFg3 = false
      },
      show2 () {
        this.sFg2 = true
      },
      show3 () {
        this.sFg3 = true
      },
      gtList () {
        this.hide2()
        this.$router.push({
          path: '/product-list'
        })
      },
      gtNotice () {
        if (!this.gtnObj.balance || this.gtnObj.balance < 1) {
          this.caveatText = '您今年的风险测评次数已用完'
          this.caveat()
          return
        }
        this.hide2()
        this.$router.push({
          path: `/investor-notice/${this.projectId}/${this.loanMoney}/${this.surplus}/${this.$route.params.mh}`
        })
      },
      gotoSignDeal () {
        this.$router.push({
          path: `/sign-deal/${this.projectId}/${this.loanMoney}/${this.surplus}/${this.$route.params.mh}/realName=${this.realName}/idCard=${this.idCard}`
        })
      },
      readyHttps () {
        this.isReady = !this.isReady
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
        this.userId = res.user_Id
        getRewardList(this.userId, this.projectId, this.loanMoney).then((res) => {
          this.rewardList = this._formatData(res.data_list)
        })
        rechargeCall(this.userId).then((res) => {
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
        if (!this.isChangep) {
          this.caveatText = '请确认出借金额'
          this.caveat()
          return
        }
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
            if (res.ret_set.code && res.ret_set.code !== 'S00') {
              this.gtnObj = res.ret_set
              if (res.ret_set.code === 'E02') {
                if (this.$route.params.mh - 0 !== 12) {
                  this.show3()
                } else {
                  this.show2()
                }
              }
              return
            }
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
    .flag-win
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      background: rgba(0, 0, 0, 0.8)
      z-index: 1000
      opacity: 1
      text-align: center
      border-radius: 10px
      .flag-win-ct
        position: absolute
        top: 50%
        left: 50%
        width: 75%
        min-width: 280px
        transform: translate3d(-50%, -50%, 0) scale(1)
        background-color: #FFF
        border-radius: 15px
        .flag-win-box
          padding: 20px
          .flag-win-desc
            padding-bottom: 40px
            &.pb-15
              padding-bottom: 15px
            .flag-win-dtxt
              line-height: 30px
              font-size: 15px
              color: #333
              .clo
                color: #ff4e49
              &.fz-12
                text-align: left
                text-indent: 2em
                line-height: 24px
                font-size: 12px
          .flag-win-btn
            display: flex
            align-items: center
            justify-content: center
            margin: 0 auto
            width: 160px
            height: 44px
            border-radius: 22px
            background-color: #ff4e49
            font-size: 0
            &.mt-mt
              margin-top: 10px
            &.bgcr-c8
              background-color: #c8c8c8
            .flag-win-btn-ctr
              display: inline-block
              padding-left: 1px
              letter-spacing: 1px
              font-size: 18px
              color: #fff
              &.fz-15
                font-size: 15px
      &.drop-enter-active, &.drop-leave-active
        transition: all 0.3s
        .flag-win-ct
          transition: all 0.3s
      &.drop-enter, &.drop-leave-to
        opacity: 0
        .flag-win-ct
          transform: translate3d(-50%, -50%, 0) scale(0)
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
            // padding: 0 20px
            background-color: $color-text
            .real-operate-item
              position: relative
              padding: 10px 0
              height: 34px
              border-1px-b(#f5f5f5)
              &:last-child:after
                border: none
              .operate-input
                position: absolute
                left: 0
                top: 10px
                width: 100%
                line-height: 34px
                height: 34px
                font-size: $font-size-medium
                color: $color-q
                outline: none
                background-color: transparent
                &.zIdx
                  z-index: 100
              .prompt-txt
                position: absolute
                left: 0
                top: 10px
                line-height: 34px
                width: 100%
                height: 34px
                font-size: $font-size-medium
                color: $color-tle
                text-align: right
                z-index: 10
                .prompt-num
                  display: inline-block
                  line-height: 26px
                  margin-right: 5px
                  padding: 0 10px 0 20px
                  bg-image('pen')
                  background-position: 4px center
                  background-size: 15px 15px
                  color: #ff4e49
                  border: 1px solid #ff4e49
                  border-radius: 15px
                  font-size: 0
                  &.ft-12
                    font-size: 12px
                .prompt-num-unitl
                  display: inline-block
                  vertical-align: middle
                  font-size: 12px
                .prompt-num-inp
                  display: inline-block
                  vertical-align: middle
                  line-height: 26px
                  margin: 0 5px 0 0
                  color: #ff4e49
                  border: 1px solid #ff4e49
                  border-radius: 15px
                  overflow: hidden
                  .prompt-num-inp-box
                    display: flex
                    width: 170px
                    .prompt-num-inp-ctr
                      flex: 1
                      .prompt-num-inp-ctr-cg
                        width: 100%
                        height: 100%
                        text-align: center
                        font-size: 12px
                        color: #ff4e49
                    .prompt-num-inp-btn
                      flex: 0 0 40px
                      width: 40px
                      background-color: #ff4e49
                      color: #fff
                      text-align: center
                      font-size: 12px
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
