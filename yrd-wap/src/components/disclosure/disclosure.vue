<template>
  <div class="disclosure-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <b-scroll class="disclosure-group">
      <div class="disclosure-scroll">
        <div class="disclosure-banner">
          <img src="./banner.jpg" width="100%">
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">基本信息</span>
            <span class="title-btn">收起全部</span>
          </div>
          <div class="second-title">工商信息</div>
          <div class="disclosure-ct-list">
            <ul class="list-wrapper">
              <li class="ct-item">
                <span class="ct-item-title">平台名称</span>
                <span class="ct-item-desc">安信卓越投资管理(北京)有限公司</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">平台简称</span>
                <span class="ct-item-desc">有人贷</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">从业机构编码</span>
                <span class="ct-item-desc">91110105069564306U</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">注册/实缴资本</span>
                <span class="ct-item-desc">120000000 元</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">注册地址</span>
                <span class="ct-item-desc">北京市朝阳区王四营甲 2 号观 107 号</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">办公地址</span>
                <span class="ct-item-desc">北京市东城区广渠门内大街 41 号雍贵中心 B 座 8 层</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">成立时间</span>
                <span class="ct-item-desc">2013 年 06 月 05 日</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">经营期限</span>
                <span class="ct-item-desc">2013 年 06 月 05 日-2033 年 06 月 04 日</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">经营状态</span>
                <span class="ct-item-desc">开业</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">法定代表人</span>
                <span class="ct-item-desc">王一鲁</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">经营范围</span>
                <span class="ct-item-desc">投资管理；投资咨询；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料  ) ;  企业管理咨询；企业策划；承办展览展示活动。（“1、未经有关部门批准，不得以公开方式募集资金；2、 不得公开开展证券类产品和金融衍生品交易活动 ；3、不得发放贷款； 4、不得对所投资企业以外的其他企业提供担保； 5、不得向投资者承诺投资本金不受损失或者承诺最低收益” ； 依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动。）</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">营业执照</span>
                <span class="ct-item-desc">
                  <router-link tag="a" class="item-desc-btn" to="/user-center/disclosure/qualification">查看详情</router-link>
                </span>
              </li>
            </ul>
          </div>
          <div class="second-title">平台信息</div>
          <div class="disclosure-ct-list">
            <ul class="list-wrapper">
              <li class="ct-item">
                <span class="ct-item-title">平台地址</span>
                <span class="ct-item-desc">
                  <a href="https://www.yourendai.com" class="call-me">https://www.yourendai.com</a>
                </span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">平台简称</span>
                <span class="ct-item-desc">有人贷</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">APP 应用</span>
                <span class="ct-item-desc">有人贷</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">微信</span>
                <span class="ct-item-desc">有人 E 助手（anxin-yourendai）<br/>有人微助手（yourendai2014）</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">联系方式</span>
                <span class="ct-item-desc">
                  <a href="tel:010-53320601" class="call-me">010-53320601</a>
                </span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">客服电话</span>
                <span class="ct-item-desc">
                  <a href="tel:400-663-9190" class="call-me">400-663-9190</a>
                </span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">服务邮箱</span>
                <span class="ct-item-desc">
                  <a href="mailto:help@yourendai.com" class="email-styl">help@yourendai.com</a>
                </span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">微信公众账号</span>
                <span class="ct-item-desc">有人 E 助手、 有人微助手</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">商务合作</span>
                <span class="ct-item-desc"><a href="tel:010-53358917" class="call-me">010-53358917</a></span>
              </li>
            </ul>
          </div>
          <div class="second-title">备案信息</div>
          <div class="disclosure-ct-list">
            <ul class="list-wrapper">
              <li class="ct-item">
                <span class="ct-item-title">电信业务经营许可信息</span>
                <span class="ct-item-desc">待地方通信主管部门办理</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">资金存管银行</span>
                <span class="ct-item-desc">新网银行</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">存管上线时间</span>
                <span class="ct-item-desc">2017 年 6 月 21 日</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">公安机关核发的网站备案图标及编号</span>
                <span class="ct-item-desc">
                  <span class="desc-has-icon">公安网备 31011502000216</span>
                </span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">在地方金融局的备案登记信息</span>
                <span class="ct-item-desc">待地方金融监管部门备案</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">网站 ICP 备案号</span>
                <span class="ct-item-desc">京 ICP 备 13035874 号-2</span>
              </li>
              <li class="ct-item">
                <span class="ct-item-title">信息安全测评认证信息</span>
                <span class="ct-item-desc">
                  <router-link tag="a" class="item-desc-btn" to="/user-center/disclosure/sadety">查看详情</router-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">治理信息</span>
            <span class="title-btn">收起全部</span>
          </div>
          <div class="second-title">组织架构</div>
          <div class="disclosure-ct-list">
            <div class="arch-head">
              <img class="head-img" src="./icon-1.png" width="65px">
            </div>
            <div class="arch-content">
              <img class="head-img" src="./body.jpg" width="100%">
            </div>
          </div>
          <div class="second-title">管理团队</div>
          <div class="disclosure-ct-list">
            <div class="ct-group">
              <div class="swiper-container" id="swiper-container02">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="./ct-3-1.png" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./ct-3-2.png" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./ct-3-3.png" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./ct-3-4.png" width="100%">
                  </div>
                  <div class="swiper-slide">
                    <img src="./ct-3-5.png" width="100%">
                  </div>
                </div>
              </div>
              <div class="swiper-button-next next-btn"></div>
              <div class="swiper-button-prev prev-btn"></div>
            </div>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">法律法规</span>
            <span class="title-btn">收起全部</span>
          </div>
          <div class="second-title">监管文件</div>
          <div class="disclosure-ct-list">
            <div class="ct-group">
              <div class="swiper-container" id="swiper-container03">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="./ct-5-1.png" width="100%">
                    <ul class="fileBox">
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/07.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/08.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/09.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/10.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/11.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/12.pdf"></a>
                      </li>
                    </ul>
                  </div>
                  <div class="swiper-slide">
                    <img src="./ct-5-2.png" width="100%">
                    <ul class="fileBox">
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/01.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/02.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/03.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/04.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/05.pdf"></a>
                      </li>
                      <li>
                        <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/06.pdf"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="swiper-button-next next-btn-1"></div>
              <div class="swiper-button-prev prev-btn-1"></div>
            </div>
          </div>
          <div class="second-title">风险控制</div>
          <div class="disclosure-ct-list">
            <div class="ct-group">
              <img src="./ct-6.png" width="100%">
              <ul class="fileBox">
                <li>
                  <router-link tag="a" to="/user-center/disclosure/sadety"></router-link>
                </li>
                <li>
                  <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/13.pdf"></a>
                </li>
                <li>
                  <router-link tag="a" to="/user-center/disclosure/qualification"></router-link>
                </li>
                <li>
                  <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/15.pdf"></a>
                </li>
                <li>
                  <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/16.pdf"></a>
                </li>
                <li>
                  <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/14.pdf"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">审计信息</span>
          </div>
          <div class="disclosure-ct-list">
            <ul class="ct-item-sj-group">
              <li class="ct-item-sj">
                <img class="ct-item-sj-img" src="./ct-7-1.png" width="80%">
              </li>
              <li class="ct-item-sj">
                <img class="ct-item-sj-img" src="./ct-7-2.png" width="80%">
              </li>
            </ul>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">运营数据</span>
          </div>
          <div class="disclosure-ct-list">
            <div class="run-data">
              <img class="run-data-img" src="./ct-8.png" width="88%">
            </div>
          </div>
        </div>
        <div class="hr-20"></div>
      </div>
    </b-scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import BScroll from 'base/scroll/scroll'
  import {getDisclosure} from 'api/user'

  import 'animate.css/animate.css'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data () {
      return {
        titleTxt: '信息披露',
        isShow: false,
        opcity: 1,
        mySwiper: '',
        mySwiper2: '',
        mySwiper3: '',
        nextOk: true,
        CN1: 'animated fadeIn',
        CN2: '',
        wpH: 0,
        reportTitle: ''
      }
    },
    created () {
      this._getDisclosure()
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    methods: {
      setHeight () {
        const _h = 1246 * (window.innerWidth / 750)
        this.wpH = `height: ${_h}px`
      },
      _swiper () {
        this.mySwiper2 = new Swiper('#swiper-container02', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn',
          prevButton: '.prev-btn'
        })
        this.mySwiper3 = new Swiper('#swiper-container03', {
          loop: true,
          paginationClickable: true,
          nextButton: '.next-btn-1',
          prevButton: '.prev-btn-1'
        })
      },
      _getDisclosure () {
        getDisclosure().then((res) => {
          this.reportTitle = res.ret_set.titel
        })
      }
    },
    components: {
      MHeader,
      BScroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .disclosure-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .hr-20
      height: 20px
    .disclosure-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .disclosure-content
        margin: 20px auto 0
        padding-bottom: 20px
        width: 90%
        border-radius: 10px
        background-color: #fff
        box-shadow: 0px 0px 10px -2px #ccc
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
                flex: 1
                padding: 10px 10px 10px 20px
                border-right: 1px solid #f0f0f0
                align-items: center
                background-color: #f0f5fc
              .ct-item-desc
                display: flex
                flex: 2
                padding: 10px 10px 10px 20px
                align-items: center
                .call-me
                  color: #323232
                .item-desc-btn
                  extend-click()
                  display: flex
                  width: 60px
                  height: 20px
                  background-color: #fd6e54
                  color: #fff
                  justify-content: center
                  align-items: center
                  border-radius: 5px
                .email-styl
                  color: #fd6e54
                  text-decoration: underline
                .desc-has-icon
                  display: block
                  padding-left: 15px
                  background-image: url(./label.jpg)
                  background-repeat: no-repeat
                  background-size: auto 15px
                  background-position: center left
          .ct-item-sj-group
            display: flex
            .ct-item-sj
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              .ct-item-sj-img
                padding-top: 20px
          .run-data
            display: flex
            justify-content: center
            align-items: center
            .run-data-img
              padding-top: 20px;
          .arch-head
            position: relative
            text-align: center
            z-index: 1
            .head-img
              margin: 0 auto
          .arch-content
            margin-top: -8px
    .swiper-container
      width: 100%
      height: 100%
    .swiper-slide
      position: relative
      text-align: center
      font-size: 18px
      overflow: hidden
    .ct-title-wrapper
      position: absolute
      top: 32.5%
      left: 0
      transform: translateY(-50%)
      line-height: 30px
      font-size: 15px
      color: #fe4c42
      width: 100%
      text-align: center
    .ct-wrapper
      position: relative
      margin-top: -10%
    .ct-group
      position: relative
      width: 100%
    .ct-group .next-btn, .ct-group .next-btn-1
      background: url("next-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      right: 0
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .ct-group .prev-btn, .ct-group .prev-btn-1
      background: url("prev-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .fileBox
      position: absolute
      top: -2%
      left: 0
      width: 100%
      height: 100%
      z-index: 1
    .fileBox li
      float: left
      width: 50%
      height: 33.333%;
    .fileBox li a
      display: block
      width: 100%
      height: 100%;
</style>
