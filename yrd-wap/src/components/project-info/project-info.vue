<template>
  <div class="project-info-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="project-info-scroll" ref="infoScroll">
      <div class="project">
        <div class="project-intro">
          <div class="project-intro-list-bg">
            <h3><span class="icon-2017-2"></span>项目介绍</h3>
            <p v-html="info.projectDesc"></p>
          </div>
          <div class="project-intro-list-bg styl">
            <h3><span class="icon-2017-1"></span>借款企业信息</h3>
            <div class="product-details-list pt-none">
              <ul>
                <li>
                  <span>企业名称：</span>
                  <p>{{info.vendorName}}</p>
                </li>
                <li>
                  <span>法人代表：</span>
                  <p>{{info.financingName}}</p>
                </li>
                <li>
                  <span>成立时间：</span>
                  <p>{{info.registDate}}</p>
                </li>
                <li id="endDayTd">
                  <span>投资剩余时间：</span>
                  <p>{{cruntTxt}}</p>
                </li>
                <li>
                  <span>还款日期：</span>
                  <p>{{info.actualPaymentDate}}</p>
                </li>
                <li>
                <span>还款方式：</span>
                  <p>{{info.repayment_types}}</p>
                </li>
                <li>
                  <span>计息方式：</span>
                  <p>放款次日计息</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="project-intro-list-bg styl4">
            <h3><span class="icon-2017-4"></span>相关资料</h3>
            <div class="project-data">
              <ul class="related-data" id="files">
                <li>
                  <img class="icon-i" width="12" src="./sur.png">
                  <span class="intro-p1">营业执照</span>
                </li>
                <li>
                  <img class="icon-i" width="12" src="./sur.png">
                  <span class="intro-p1">身份证信息</span>
                </li>
                <li>
                  <img class="icon-i" width="12" src="./sur.png">
                  <span class="intro-p1">银行卡信息</span>
                </li>
                <li>
                  <img class="icon-i" width="12" src="./sur.png">
                  <span class="intro-p1">联系人信息</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getProjectInfo} from 'api/product'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '项目信息',
        info: {},
        cruntTxt: ''
      }
    },
    created() {
      this._getProjectInfo()
    },
    beforeDestroy () {
      clearInterval(this.sh)
    },
    methods: {
      cruntTime () {
        const _this = this
        this.sh = setInterval(_this._crunt, 1000)
      },
      _getProjectInfo() {
        getProjectInfo(this.$route.params.projectId).then((res) => {
          this.info = res
          if (this.info.canrongzi === 'touzi') {
            this.endT = new Date(this.info.end_dateTime).getTime()
            this.cruntTime()
          } else {
            this.cruntTxt = '投资已结束'
          }
          setTimeout(() => {
            this.$refs.infoScroll.refresh()
          }, 20)
        })
      },
      _crunt () {
        let nowT = new Date().getTime()
        let intervalT = parseInt((this.endT - nowT) / 1000)
        this._d_h_s(intervalT)
        if (intervalT > 0) {
          this.cruntTxt = this._d_h_s(intervalT)
        } else {
          this.cruntTxt = '投资已结束'
          clearInterval(this.sh)
        }
      },
      _d_h_s (intervalT) {
        let totalT = intervalT
        let _day = parseInt(totalT / (24 * 3600))
        let _hour = parseInt((totalT - _day * 24 * 3600) / 3600)
        let _minute = parseInt((totalT - _day * 24 * 3600 - _hour * 3600) / 60)
        let _second = parseInt((totalT - _day * 24 * 3600 - _hour * 3600) % 60)
        let _string = _day + ' 天 ' + _hour + ' 时 ' + _minute + ' 分 ' + _second + ' 秒 '
        return _string
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

  .project-info-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .project-info-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .product-Info
        padding: 10px
        height: 100px
        background: linear-gradient(to bottom right, #3abeff , #136bfc)
      .product-Info-box
        position: relative
      .product-Info-summary
        position: absolute
        left: 0px
        top: 10px
        width: 100%
        height: 120px
        border-radius: 4px
        background: #fff
        box-shadow:0 0 3px #ccc
      .product-Info-summary ul
        overflow: hidden
      .product-Info-summary ul li
        width: 50%
        float: left
        position: relative
      .product-Info-summary ul li em.bor
        width: 1px
        height: 80px
        display: block
        background: #e6e6e6
        position: absolute
        right: -0.5px
        top: 0px
      .product-Info-summary ul li p
        font-size: 13px
        color: #969696
        text-align: center
      .product-Info-summary ul li p.font-z-20
        font-size: 36px
      .clo-gradient
        background-image: -webkit-gradient(linear, left top, right bottom, from(#53cefb), to(#0b5afb))
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
      .product-Info-summary h3
        padding: 10px
        font-size: 16px
        color: #464646
      .product-Info-summary ul li p.font-z-20 span
        font-size: 20px
      .product-details-list
        padding: 60px 10px 0 10px
      .product-details-list ul li
        position: relative
        overflow: hidden
      .product-details-list ul li span
        position: absolute
        left: 0
        top: 0px
        display: block
        font-size: 12px
        line-height: 27px
        color: #333
      .product-details-list ul li p
        padding: 0 0 0 65px
        font-size: 12px
        height: 27px
        line-height: 27px
        color: #333
        text-align: right
        -webkit-box-sizing: initial
        -moz-box-sizing: initial
        box-sizing: initial
      .product-details-situation ul
        border-top: 1px solid #e6e6e6
        padding-bottom: 15px
      .product-details-situation ul li a
        display: block
        line-height: 36px
        padding: 0 10px
        font-size: 16px
        color: #464646
        background: url(./more.png) no-repeat 97.5% center
        background-size: 7px
        border-bottom: 1px solid #e6e6e6
      .product-details-list.pt-none
        padding-top: 0
      .product-details-list.pt-none ul
        padding: 8px 0 7px 0
      .icon-i
        float:left
      .intro-p1
        display: inline-block
        float:left
        margin-left:15px
        font-size: 12px
        line-height: 12px
        color: #333
      .repayment-plan-wrapper
        margin: 0 20px 20px 20px
      .project-intro h3
        position: relative
        color: #333
        font-size: 14px
        line-height: 42px
        padding: 0 10px 0 37px
        border-bottom: 1px solid #f0f0f0
      .project-intro h3 span
        display: block
        width: 22px
        height: 22px
        position: absolute
        left: 7px
        top: 10px
        background-repeat: no-repeat
        background-position: center
        background-size: 22px
      .icon-2017-1
        background-image: url(./20170101-2.png)
      .icon-2017-2
        background-image: url(./20170101-3.png)
      .icon-2017-3
        background-image: url(./20170101-1.png)
      .icon-2017-4
        background-image: url(./20170101-4.png)
      .project-intro p
        color: #333
        line-height: 19px
        font-size: 11px
        text-indent: 2em
        padding: 0 10px
        padding-top: 11px
      .project-data
        background: #fff
      .project-data ul
        overflow: hidden
        margin: 0 10px 10px 10px
        padding-bottom:15px
      .project-data ul li
        overflow: hidden
        color:#c8c8c8
        width: 50%
        padding: 15px 0 0 0
      .project-data ul li a.data-img
        display: block
        overflow: hidden
      .project-data ul li a.data-img img
        width: 100%
        height: 100%
      .project
        margin: 0 15px
      .project-intro
        padding-top: 10px
      .project-intro-list-bg
        background: #fff
        margin-bottom: 10px
        padding-bottom: 11px
        border-radius: 10px
        box-shadow:0 1px 8px -3px #ccc
      .project-intro-list-bg.styl
        padding-bottom: 0px
      .project-intro-list-bg.styl4
        margin-bottom: 0
        padding-bottom: 0
</style>
