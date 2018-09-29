<template>
  <div class="public-notice-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll class="public-notice-group" ref="dataScroll" :style="positionTop">
      <div class="public-notice-scroll">
        <div class="disclosure-banner">
          <img src="./banner4.jpg" width="100%">
        </div>
        <div class="disclosure-content">
          <div class="disclosure-content-group">
            <div class="stair-title border-1px-b">
              <span class="title-txt">对外公告</span>
              <span class="title-btn" v-show="status" @click="changstatus">收起全部</span>
            </div>
            <div class="second-title">重大事项</div>
            <div class="disclosure-ct-list">
              <ul class="list-wrapper">
                <li class="ct-item">
                  <span class="ct-item-title">公司减资、合并、分立、解散或申请破产</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">公司依法进入破产程序</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">公司被责令停业、整顿、关闭</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">公司主要或者全部业务陷入停顿</span>
                  <span class="ct-item-desc">无</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项</span>
                  <span class="ct-item-desc">无</span>
                </li>
              </ul>
            </div>
            <div v-show="status">
              <div class="second-title">平台收费标准</div>
              <div class="disclosure-ct-list">
                <ul class="list-wrapper">
                  <li class="ct-item ct-item-hasm bg-clo">
                    <span class="ct-item-title">序号</span>
                    <span class="ct-item-m">业务类型</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">收费标准</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">1</span>
                    <span class="ct-item-m">用户注册</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">免费</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">2</span>
                    <span class="ct-item-m">开通存管账户</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">免费</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">3</span>
                    <span class="ct-item-m">充值</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">免费</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">4</span>
                    <span class="ct-item-m">借款</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">免费</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">5</span>
                    <span class="ct-item-m">回款到账</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">免费</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">6</span>
                    <span class="ct-item-m">提现</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">单笔2万元以下提现手续费是2元/笔2万元（含）以上不收费由平台垫付</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">7</span>
                    <span class="ct-item-m">借款服务费</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">有人贷对借款人收费不超过3.5%</i></span>
                  </li>
                </ul>
              </div>
              <div class="second-title">贷款条件</div>
              <div class="disclosure-ct-list">
                <ul class="list-wrapper">
                  <li class="ct-item ct-item-hasm bg-clo">
                    <span class="ct-item-title">贷款用户</span>
                    <span class="ct-item-m">申请条件</span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">当前状态</i></span>
                  </li>
                  <li class="ct-item ct-item-hasm">
                    <span class="ct-item-title">企业借款</span>
                    <span class="ct-item-m">
                      <span class="ct-item-m-i">
                        <i class="ct-item-m-i-ic">1.</i>
                        <span class="ct-item-m-i-txt">符合国家产业政策规定，不属于高危行业;</span>
                      </span>
                      <span class="ct-item-m-i">
                        <i class="ct-item-m-i-ic">2.</i>
                        <span class="ct-item-m-i-txt">企业法人及实际控制人信誉状良好，无不良信用记录，无在诉讼案件;</span>
                      </span>
                      <span class="ct-item-m-i">
                        <i class="ct-item-m-i-ic">3.</i>
                        <span class="ct-item-m-i-txt">具有工商行政管理部门核准登记，且年检合格的营业执照;</span>
                      </span>
                      <span class="ct-item-m-i">
                        <i class="ct-item-m-i-ic">4.</i>
                        <span class="ct-item-m-i-txt">企业合法经营，有必要的组织机构，主营业务收入正常，无明显经营变动；</span>
                      </span>
                      <span class="ct-item-m-i">
                        <i class="ct-item-m-i-ic">5.</i>
                        <span class="ct-item-m-i-txt">企业借款用于正常的资金流转或企业经营所需，资金用途合法；</span>
                      </span>
                    </span>
                    <span class="ct-item-desc"><i class="ct-item-desc-txt">开放申请</i></span>
                  </li>
                </ul>
              </div>
              <div class="second-title">安全保障</div>
              <div class="disclosure-ct-list">
                <img src="./txt-pig.jpg" width="100%" @load="refresh">
              </div>
            </div>
          </div>
          <div class="show-all-btn-wrapper">
            <span class="show-all-btn" v-show="!status" @click="changstatus">展开全部</span>
          </div>
        </div>
        <div class="hr-20"></div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      isWap: {
        type: Boolean,
        default: false
      },
      positionTop: {
        type: String,
        default: 'top: 0px'
      }
    },
    data () {
      return {
        titleTxt: '对外公告',
        isShow: false,
        opcity: 1,
        status: false
      }
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.$refs.dataScroll.refresh()
        }, 20)
      },
      changstatus () {
        this.status = !this.status
      }
    },
    watch: {
      status: function (newVal, oldVal) {
        this.refresh()
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
  
  .public-notice-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .public-notice-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .hr-20
        height: 20px
      .disclosure-content
        margin: 20px auto 0
        padding-bottom: 20px
        width: 90%
        border-radius: 10px
        background-color: #fff
        box-shadow: 0px 0px 10px -2px #ccc
        .disclosure-content-group
          .stair-title
            padding: 0 10px
            line-height: 30px
            border-1px-b(#f0f0f0)
            font-size: 12px
            color: #323232
            overflow: hidden
            .title-txt
              float: left
              display: block
              padding-left: 7px
              background-image: url(./title-icon.png)
              background-repeat: no-repeat
              background-size: auto 10px
              background-position: center left
            .title-btn
              extend-click()
              float: right
              display: block
              padding-right: 15px
              background-image: url(./hide-up.png)
              background-repeat: no-repeat
              background-size: auto 8px
              background-position: center right
          .second-title
            padding: 0 10px
            line-height: 30px
            font-size: 12px
            color: #323232
          .disclosure-ct-list
            padding: 0 10px
            .list-wrapper
              border: 1px solid #f0f0f0
              border-bottom: none
              .ct-item
                display: flex
                line-height: 14px
                border-bottom: 1px solid #f0f0f0
                font-size: 8px
                color: #323232
                .ct-item-title
                  display: flex
                  flex: 1.5
                  padding: 10px 10px 10px 20px
                  border-right: 1px solid #f0f0f0
                  align-items: center
                  background-color: #f0f5fc
                .ct-item-m
                  display: flex
                  flex: 1
                  padding: 10px 10px 10px 20px
                  border-right: 1px solid #f0f0f0
                  align-items: center
                  flex-direction: column;
                  .ct-item-m-i
                    position: relative
                    flex: 1
                    padding-left: 12px
                    .ct-item-m-i-ic
                      display: inline-block
                      position: absolute
                      width: 15px
                      left: 0
                      top: 0
                      font-style: normal
                    .ct-item-m-i-txt
                      display: block
                .ct-item-desc
                  display: flex
                  flex: 1
                  padding: 10px 10px 10px 20px
                  align-items: center
                  justify-content: center
                  .ct-item-desc-txt
                    display: inline-block
                    font-style: normal
                &.ct-item-hasm
                  .ct-item-title
                    flex: 1
                    padding: 10px
                    background-color: #fff
                    justify-content: center
                  .ct-item-desc
                    flex: 1
                    padding: 10px
                    justify-content: center
                  .ct-item-m
                    flex: 1
                    padding: 10px
                    justify-content: center
                &.bg-clo
                  background-color: #f0f5fc
                  .ct-item-title
                    background-color: #f0f5fc
        .show-all-btn-wrapper
          padding-top: 15px
          .show-all-btn
            extend-click()
            display: block
            margin: 0 auto
            width: 48px
            font-size: 12px
            color: #323232
            padding-right: 15px
            background-image: url(./show-down.png)
            background-repeat: no-repeat
            background-size: auto 8px
            background-position: center right
</style>
