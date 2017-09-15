<template>
  <div class="subscription-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="subscription-scroll">
      <div class="subscription-group">
        <div class="prompt-wrapper">
          <div class="realed-name-desc" v-if="realed">
            <p class="txt">您是保守型投资者，建议您小额投资，投资额不超过您年收入的20%</p>
          </div>
          <div class="real-name-desc" v-else>
            <h3 class="title">实名认证 安全保障</h3>
            <p class="desc">落实监管新规 保障用户的每一分钱</p>
          </div>
        </div>
        <div class="real-name-operate" v-show="!realed">
          <ul class="real-operate-wrapper">
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" placeholder="输入姓名">
              <p class="prompt-txt styl">{{nameErr}}</p>
            </li>
            <li class="real-operate-item border-1px-b">
              <input type="text" class="operate-input" placeholder="身份证号">
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
              <p class="prompt-txt">{{5000}}元</p>
            </li>
          </ul>
        </div>
        <div class="reward-wrapper">
          <h3 class="title border-1px-b">使用平台奖励</h3>
          <ul class="reward-group" v-show="rewardList.length > 0">
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
                </div>
              </div>
            </li>
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
                </div>
              </div>
            </li>
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
                </div>
              </div>
            </li>
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
                </div>
              </div>
            </li>
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
                </div>
              </div>
            </li>
            <li class="reward-item">
              <div class="reward-view-wrapper">
                <div class="reward-bg"><span class="reward-val">100元现金</span><span class="reward-name">抵用券</span></div>
                <div class="reward-num">共计：<span class="styl">5</span></div>
              </div>
              <div class="reward-desc-wrapper">
                <p class="desc-txt">本次投资可用：<span class="num">5</span></p>
                <div class="reward-input">
                  <div class="btn-remove" :class="{remove: !removeBool}" @click="removeInvest"></div>
                  <div class="input-wrapper">
                    <input class="input-self" ref="inputWrapper" disabled="disabled" @keyup.prevent="investKeyup" type="tel" v-model="investAmount">
                  </div>
                  <div class="btn-add" :class="{add: !addBool}" @click="addInvest"></div>
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

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '确认认购',
        realed: true,
        nameErr: 'xx',
        idCardErr: 'xx',
        surplus: 52000,
        thisTime: 5000,
        submitBtnTxt: '确认提交',
        rewardList: [
          {}
        ]
      }
    },
    methods: {
      submitFuc () {
        console.log('确认认购')
      }
    },
    components: {
      MHeader,
      Scroll,
      FootBtn
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
                  hieght: 20px
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
                    background-color: $color-background
                    color: $color-tle
          .air-reward
            line-height: 54px
            text-align: center
            font-size: $font-size-small
            color: $color-q
</style>
