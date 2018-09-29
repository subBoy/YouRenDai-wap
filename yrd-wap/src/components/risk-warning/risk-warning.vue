<template>
  <div class="risk-warning-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="risk-warning-scroll">
      <div>
        <div class="risk-top"></div>
        <div class="risk-cont">
          <ul>
            <li><span>1.</span>
            <p>本项目已通过平台审核，已真实完整披露借款人基本信息、经营信息、融资项目信息和还款相关信息。</p>
            <p>但您出借时仍可能面临本金及收益损失的风险，包括但不限于：</p>
            <p class="risk-p1"><em></em>政策风险：因财政政策、货币政策、产业政策等国家宏观政策发生变化，导致市场波动的风险。</p>
            <p class="risk-p1"><em></em>不可抗力风险：由于自然灾害、战争等不可抗力因素的出现，可能影响市场和企业的正常运行，给您的出借行为带来不确定风险。</p>
            <p class="risk-p1"><em></em>违约风险：因竞争环境变化和交易对手本身原因，可能带来还款的不确定风险。</p>
            </li>
            <li>
              <span>2.</span>
              <p>有人贷作为网络借贷信息中介平台进行信息发布，不对任何出借人及/或任何交易提供担保。出借人应依其独立判断做出出借决策，自行承担出借风险。</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '风险提示'
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

  .risk-warning-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .risk-warning-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .risk-top
        height: 5px
      .risk-cont
        margin: 0 20px 20px 20px
        position: relative
        background-color: #fff
        border-radius: 10px
        -webkit-box-shadow:0 1px 8px -3px #ccc
        -moz-box-shadow:0 1px 8px -3px #ccc
        box-shadow:0 1px 8px -3px #ccc
      .risk-cont ul
        padding: 14px 10px 11px 10px
      .risk-cont ul li
        font-size: 12px
        color: #666666
        padding-left: 10px
        line-height: 24px
        padding-bottom: 3px
      .risk-cont ul li span
        position: absolute
        left: 10px
      .risk-cont ul li .risk-p1
        padding-left: 20px
      .risk-cont ul li .risk-p1 em
        position: absolute
        left: 40px
</style>
