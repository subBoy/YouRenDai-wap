<template>
  <div class="guide-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" :guideBool="guideBool" @logined="logined"></m-header>
    <scroll class="guide-scroll" :class="{'realed': realed}" ref="guideScroll">
      <div class="guide-content">
        <div class="g-banner">
          <img src="./app-banner.jpg" width="100%">
        </div>
        <div class="g-desc-img">
          <img src="./bank-01.png" width="100%">
        </div>
        <div class="g-operating">
          <h3 class="g-title">操作攻略</h3>
          <ul class="g-operating-list box-sd">
            <li class="g-operating-item" :class="{'g-now': oldUser}" @click="isOld">老用户</li>
            <li class="g-operating-item" :class="{'g-now': !oldUser}" @click="isNew">新用户</li>
          </ul>
        </div>
        <div class="swiper-container swiper-container-1" v-show="oldUser">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-07.png" width="100%">
                <p class="g-operating-desc">您已有账号，当登录有人贷，首次进入用户中心或当您进行充值、出借或提现时，会收到开户提示，其中已实名用户数据已同步至新网银行，已实名用户会收到激活提示，点击【立即开通/激活】。</p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-08.png" width="100%">
                <p class="g-operating-desc">已实名用户通过提示中点击 【立即激活】，进入新网银行资金存管系统激活页面，填写银行卡号并设置交易密码，点击【同意协议确定激活】进行激活。<br/>温馨提示：<span class="styl-c">存管系统交易密码设置成功后，原交易密码将停用。</span></p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-09.png" width="100%">
                <p class="g-operating-desc styl">成功激活存管账户。</p>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-container swiper-container-2" v-show="!oldUser">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-02.png" width="100%">
                <p class="g-operating-desc">还未注册有人贷账号，则您可通过点击“我的”-“1888元现金红包”进入到注册界面，输入手机号、密码、选填写客服顾问工号或手机号，填写正确的短信验证码即可验证成为有人贷出借用户。</p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-03.png" width="100%">
                <p class="g-operating-desc">注册成功后，跳转至个人中心，弹窗提示点击【实名认证】。</p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-04.png" width="100%">
                <p class="g-operating-desc">填写真实姓名、身份证号，信息无误后点击【确认提交】。</p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-05.png" width="100%">
                <p class="g-operating-desc">在新网银行资金存管系统页面再次确认认证信息后，输入银行卡号、发送验证码，授权开通业务并设置交易密码，点击【同意协议确定注册】进行开通。</p>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-slide-box">
                <img src="./bank-06.png" width="100%">
                <p class="g-operating-desc styl">成功开通存管账户，进入快捷充值。</p>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="g-bank-wrapper">
          <h3 class="g-title">银行存管优势</h3>
          <div class="g-bank-item">
            <div class="g-bank-item-icon ic-1">监管合规</div>
            <div class="g-bank-item-desc">接入银行存管，有人贷交易平台与资金账户系统分离，为平台每一位出借人、借款人分配独立的银行存管账户，最大程度上的规避资金挪用风险。</div>
          </div>
          <div class="g-bank-item">
            <div class="g-bank-item-icon ic-2">资金安全</div>
            <div class="g-bank-item-desc">用户资金由银行专门管理，只有用户本人才能操作账户上的资金。所有资金交易均通过银行进行。</div>
          </div>
          <div class="g-bank-item">
            <div class="g-bank-item-icon ic-3">法律保障</div>
            <div class="g-bank-item-desc">用户资金由银行专门管理，只有用户本人才能操作账户上的资金。所有资金交易均通过银行进行。</div>
          </div>
        </div>
        <div class="g-bank-QA">
          <h3 class="g-title">银行存管Q&A</h3>
          <div class="g-bank-QA-item box-sd">
            <div class="g-bank-QA-item-icon">
              <span class="icon-img"></span>
              <span class="icon-num">1</span>
              <p class="icon-desc">银行存管上线后，提现会有什么影响？</p>
            </div>
            <div class="g-bank-QA-item-desc">银行会在收到申请的当日受理，下一个工作日到账；遇双休日、国家法定节假日，到账日期顺延。</div>
          </div>
          <div class="g-bank-QA-item box-sd">
            <div class="g-bank-QA-item-icon">
              <span class="icon-img"></span>
              <span class="icon-num">2</span>
              <p class="icon-desc">银行存管上线后，移动端有哪些银行卡支持绑定？</p>
            </div>
            <div class="g-bank-QA-item-desc">支持13家银行进行绑卡：中国农业银行、中国银行、中国建设银行、交通银行、中国邮政储蓄银行、中信银行、中国光大银行、华夏银行、中国民生银行、平安银行、兴业银行、广发银行、北京银行。</div>
          </div>
        </div>

      </div>
    </scroll>
    <div class="g-bank-activation" id="tishi1" v-if="!realed">
      <h3 class="g-title">开通银行存管账户，资金安全保障系数更高</h3>
      <p class="g-activation-desc">（届时开通存管账户后才能正常充值、出借、提现哦）</p>
      <a class="g-bank-btn box-sd" id="login" @click="activation">马上开通/激活</a>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions} from 'vuex'

  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '新网银行资金存管',
        guideSilde: '',
        oldUser: true,
        realed: false,
        guideBool: true
      }
    },
    created () {
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      activation() {
        if (this.changeLoginState !== '') {
          this.$router.push('/user-center/real-name')
        } else {
          this.changeReturnPath(this.$route.path)
          this.$router.push('/signIn')
        }
      },
      isOld() {
        this.oldUser = true
        this.refresh()
      },
      isNew() {
        this.oldUser = false
        if (!this.slide2) {
          const _this = this
          setTimeout(() => {
            this.guideSilde2 = new Swiper('.swiper-container-2', {
              loop: true,
              pagination: '.swiper-pagination',
              prevButton: '.swiper-button-prev',
              nextButton: '.swiper-button-next',
              autoHeight: true,
              onSlideChangeEnd: function() {
                _this.refresh()
              }
            })
          }, 20)
          this.slide2 = true
        }
        this.refresh()
      },
      refresh() {
        setTimeout(() => {
          this.$refs.guideScroll.refresh()
        }, 20)
      },
      logined(res) {
        if (res.usernameCh === '') {
          this.realed = false
        } else {
          this.realed = true
        }
        this.refresh()
      },
      _swiper () {
        const _this = this
        this.guideSilde = new Swiper('.swiper-container-1', {
          loop: true,
          pagination: '.swiper-pagination',
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          autoHeight: true,
          onSlideChangeEnd: function() {
            _this.refresh()
          }
        })
      },
      ...mapActions([
        'changeReturnPath'
      ])
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

  .guide-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .guide-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 123px
      left: 0
      &.realed
        bottom: 0
      .swiper-container
        width: 100%
      .swiper-slide
        position: relative
        text-align: center
        font-size: 18px
        display: flex
        justify-content: center
        align-items: center
      .box-sd
        box-shadow: 0 5px 20px -1px #ccc
      .g-desc-img
        background-color: #fff
        padding: 50px 0
      .g-operating
        margin: 0 auto
        padding-top: 40px
        padding-bottom: 35px
        width: 74%
      .g-title
        padding-bottom: 35px
        line-height: 16px
        font-size: 15px
        text-align: center
        color: #030303
        font-weight: normal
      .g-operating-list
        overflow: hidden
        background-color: #fff
      .g-operating-item
        float: left
        width: 50%
        line-height: 30px
        height: 30px
        font-size: 12px
        color: #030303
        text-align: center
      .g-operating-item.g-now
        background-color: #ff5a5e
        color: #fff
      .g-operating-desc
        margin: 0 auto
        padding: 20px 0 35px 0
        line-height: 20px
        font-size: 9px
        width: 74%
        color: #323232
        text-align: left
      .g-operating-desc .styl-c
        color: #fc4f4f
      .g-operating-desc.styl
        text-align: center
      .swiper-button-prev
        background-image: url(prev-pic.png)
        background-size: 9px auto
      .swiper-button-next
        background-image: url(next-pic.png)
        background-size: 9px auto
      .swiper-pagination-bullet
        border: 1px solid #fc4f4f
        background-color: transparent
        opacity: 1
      .swiper-pagination-bullet-active
        background-color: #fc4f4f
      .g-bank-wrapper
        background-color: #fff
        margin-top: 20px
        padding-top: 50px
      .g-bank-item
        display: flex
        width: 74%
        margin: 0 auto
        padding-bottom: 40px
      .g-bank-item-desc
        flex: 1
        color: #999999
        line-height: 20px
        font-size: 9px
      .g-bank-item-icon
        flex: 0 0 80px
        width: 80px
        text-align: center
        padding-top: 70px
        background-repeat: no-repeat
        background-position: center 0px
        background-size: 60px auto
        color: #030303
        font-size: 10px
        line-height: 12px
        margin-top: -5px
      .g-bank-item-icon.ic-1
        background-image: url(bank-10.png)
      .g-bank-item-icon.ic-2
        background-image: url(bank-11.png)
      .g-bank-item-icon.ic-3
        background-image: url(bank-12.png)
      .g-bank-QA
        padding-top: 50px
        padding-bottom: 15px
      .g-bank-QA.esp
        padding-bottom: 15px
      .g-bank-QA-item
        display: flex
        width: 74%
        margin: 0 auto
        margin-bottom: 15px
      .g-bank-QA-item-icon
        position: relative
        flex: 0 0 75px
        width: 75px
        background-color: #49b3af
      .g-bank-QA-item-desc
        flex: 1
        color: #999999
        line-height: 20px
        font-size: 9px
        padding: 15px
        display: flex
        justify-content: center
        align-items: center
      .icon-num
        display: block
        height: 18px
        width: 18px
        border-radius: 100%
        background-color: #fff
        color: #49b3af
        text-align: center
        margin: 15px auto
        line-height: 18px
        font-size: 12px
      .icon-desc
        padding: 0 10px 15px 10px
        color: #fff
        font-size: 7px
        line-height: 18px
      .icon-img
        display: block
        width: 4px
        height: 8px
        background-repeat: no-repeat
        background-size: 4px auto
        background-position: center
        position: absolute
        right: -4px
        top: 50%
        margin-top: -4px
        background-image: url(arrow.png)
    .g-bank-activation
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        padding-bottom: 15px
        z-index: 999
        background-color: #fff
      .g-bank-activation .g-title
        line-height: 16px
        font-size: 15px
        text-align: center
        color: #030303
        font-weight: normal
        padding-top: 15px
        padding-bottom: 10px
      .g-activation-desc
        text-align: center
        font-size: 9px
        color: #999999
        padding-bottom: 10px
      .g-bank-btn
        display: block
        width: 90%
        margin: 0 auto
        height: 45px
        line-height: 45px
        text-align: center
        font-size: 16px
        color: #fff
        background-color: #ff5a5e
</style>
