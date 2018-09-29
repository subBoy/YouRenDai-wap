<template>
  <div class="report-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <div class="report-swiper-container" :style="positionTop">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="report-slide">
            <img class="slide-item-1 animated" :class="{bounce: slide1}" src="./item-1.png" width="100%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">产品服务</div>
              <div class="report-slide-main">
                <div class="report-slide-item animated" :class="{slideInLeft: slide2}">
                  <p class="report-slide-desc">网站安全监测保护升级</p>
                  <img src="./item-2-1.jpg" width="36%">
                </div>
                <div class="report-slide-item animated" :class="{slideInRight: slide2}">
                  <p class="report-slide-desc">移动端操作流程优化，提高用户体验</p>
                  <img src="./item-2-2.jpg" width="36%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">运营数据—地域排名</div>
              <div class="report-slide-main">
                <div class="report-slide-item report-slide-box-shadow">
                  <p class="report-slide-sub-title">金额占比</p>
                  <img class="animated" :class="{fadeIn: slide3}" src="./item-3-1.jpg" width="90%">
                </div>
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">人数前五名</p>
                  <img class="item2-img animated" :class="{rotateIn: slide3}" src="./item-3-2.jpg" width="36%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">运营数据—性别星座</div>
              <div class="report-slide-main">
                <div class="report-slide-item report-slide-box-shadow">
                  <p class="report-slide-sub-title">性别占比</p>
                  <img class="animated" :class="{bounceIn: slide4}" src="./item-4-1.png" width="80%">
                </div>
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">人数占比</p>
                  <p class="report-slide-sub-title report-slide-desc-sub">金额占比</p>
                  <img class="animated item-4-img" :class="{pulse: slide4}" src="./item-4-2.png" width="86%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">运营数据—年龄分布</div>
              <div class="report-slide-main">
                <div class="report-slide-item report-slide-box-shadow">
                  <p class="report-slide-sub-title">人数占比</p>
                  <div class="silde-distribute">
                    <div class="silde-distribute-item" ref="distributeItem" v-for="item in plData">
                      <p class="silde-distribute-pn">{{item.viewVal}}%</p>
                      <div class="silde-distribute-svg" :style="{height: item.pnH + 'px'}"></div>
                      <p class="silde-distribute-name">{{item.tle}}</p>
                    </div>
                  </div>
                </div>
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">金额占比</p>
                  <div class="silde-distribute">
                    <div class="silde-distribute-item silde-distribute-2" v-for="item in smData">
                      <p class="silde-distribute-pn">{{item.viewVal}}%</p>
                      <div class="silde-distribute-svg" :style="{height: item.pnH + 'px'}"></div>
                      <p class="silde-distribute-name">{{item.tle}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">运营数据—期限分布</div>
              <div class="report-slide-main">
                <div class="report-slide-item report-slide-box-shadow">
                  <p class="report-slide-sub-title">人数</p>
                  <div class="silde-distribute">
                    <div class="silde-distribute-item" v-for="(item, index) in pNumData" :class="'item-styl-' + index">
                      <p class="silde-distribute-pn">{{item.viewVal}}%</p>
                      <div class="silde-distribute-svg" :style="{height: item.pnH + 'px'}"></div>
                      <p class="silde-distribute-name">{{item.tle}}</p>
                    </div>
                  </div>
                </div>
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">金额</p>
                  <div class="silde-distribute">
                    <div class="silde-distribute-item" v-for="(item, index) in feData" :class="'item-styl-' + index">
                      <p class="silde-distribute-pn">{{item.viewVal}}%</p>
                      <div class="silde-distribute-svg" :style="{height: item.pnH + 'px'}"></div>
                      <p class="silde-distribute-name">{{item.tle}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">运营数据—操作系统</div>
              <div class="report-slide-main">
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">人数占比</p>
                  <img class="animated mt-10" :class="{rotateInUpLeft: slide7}" src="./item-7-1.png" width="80%">
                </div>
                <div class="report-slide-item">
                  <p class="report-slide-sub-title">金额占比</p>
                  <img class="animated mt-10" :class="{rotateInUpLeft: slide7}" src="./item-7-2.png" width="80%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">风险控制</div>
              <div class="report-slide-main">
                <div class="report-slide-item">
                  <div class="report-slide-risk animated" :class="{bounceInLeft: slide8}">
                    <div class="report-slide-risk-txt">
                      <p class="report-slide-risk-desc">逾期金额：0 元</p>
                      <p class="report-slide-risk-desc">逾期笔数：0 笔</p>
                    </div>
                    <div class="report-slide-risk-img">
                      <img src="./item-8-1.png" width="70%">
                    </div>
                  </div>
                </div>
                <div class="report-slide-item">
                  <div class="report-slide-risk animated" :class="{bounceInRight: slide8}">
                    <div class="report-slide-risk-txt">
                      <p class="report-slide-risk-desc">代偿金额：0 元</p>
                      <p class="report-slide-risk-desc">代偿笔数：0 笔</p>
                    </div>
                    <div class="report-slide-risk-img">
                      <img src="./item-8-2.png" width="70%">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="report-slide-group">
            <div class="report-slide-config">
              <div class="report-slide-title">大事件</div>
              <div class="report-slide-main">
                <div class="report-slide-item">
                  <img class="animated" :class="{flip: slide9}" src="./item-9-1.jpg" width="80%">
                </div>
                <div class="report-slide-item">
                  <img class="animated" :class="{flip: slide9}" src="./item-9-2.jpg" width="80%">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
  import 'animate.css/animate.css'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'
  import MHeader from 'components/m-header/m-header'

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
    data() {
      return {
        titleTxt: '运营报告',
        isShow: false,
        opcity: 1,
        swiper: '',
        slide1: false,
        slide2: false,
        slide3: false,
        slide4: false,
        slide5: false,
        slide6: false,
        slide7: false,
        slide8: false,
        slide9: false,
        plData: [
          {
            tle: '20-29岁',
            endVal: 27.27,
            endValStr: '27.27',
            startVal: 3.4,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '30-39岁',
            endVal: 24.24,
            endValStr: '24.24',
            startVal: 2.0,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '40-49岁',
            endVal: 24.24,
            endValStr: '24.24',
            startVal: 2.5,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '50岁以上',
            endVal: 24.24,
            endValStr: '24.24',
            startVal: 2.3,
            viewVal: '0.00',
            pnH: 0
          }
        ],
        smData: [
          {
            tle: '20-29岁',
            endVal: 20.64,
            endValStr: '20.64',
            startVal: 1.7,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '30-39岁',
            endVal: 15.76,
            endValStr: '15.76',
            startVal: 0.9,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '40-49岁',
            endVal: 32.37,
            endValStr: '32.37',
            startVal: 4.9,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '50岁以上',
            endVal: 31.23,
            endValStr: '31.23',
            startVal: 2.7,
            viewVal: '0.00',
            pnH: 0
          }
        ],
        feData: [
          {
            tle: '3个月',
            endVal: 32.50,
            endValStr: '32.50',
            startVal: 3.7,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '6个月',
            endVal: 31.65,
            endValStr: '31.65',
            startVal: 2.0,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '12个月',
            endVal: 35.85,
            endValStr: '35.85',
            startVal: 4.4,
            viewVal: '0.00',
            pnH: 0
          }
        ],
        pNumData: [
          {
            tle: '3个月',
            endVal: 44.90,
            endValStr: '44.90',
            startVal: 3.7,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '6个月',
            endVal: 24.49,
            endValStr: '24.49',
            startVal: 2.0,
            viewVal: '0.00',
            pnH: 0
          },
          {
            tle: '12个月',
            endVal: 30.61,
            endValStr: '30.61',
            startVal: 4.4,
            viewVal: '0.00',
            pnH: 0
          }
        ]
      }
    },
    created() {
      setTimeout(() => {
        this.slide1 = true
        this.reportSwiper()
      }, 20)
    },
    methods: {
      tweenLiteTo1(rate) {
        const _this = this
        const cardinalH = this.$refs.distributeItem[0].clientHeight
        for (let i = 0; i < this.plData.length; i++) {
          (function (i) {
            const _to = function () {
              let startVal = _this.plData[i].startVal + 0.99
              const _startVal = startVal.toFixed(2) - 0
              let viewVal = _startVal + ''
              let dIdx = viewVal.indexOf('.')
              let _viewVal = ''
              if (dIdx < 0) {
                _viewVal = viewVal + '.00'
                _this.$set(_this.plData[i], 'viewVal', _viewVal)
              } else {
                _viewVal = viewVal + '00'
                let _viewVal1 = _viewVal.substring(0, dIdx + 2)
                _this.$set(_this.plData[i], 'viewVal', _viewVal1)
              }
              _this.$set(_this.plData[i], 'startVal', _startVal)
              _this.$set(_this.plData[i], 'pnH', _startVal * cardinalH / 80)
              if (startVal >= _this.plData[i].endVal - 0.1) {
                _this.$set(_this.plData[i], 'startVal', _this.plData[i].endVal)
                _this.$set(_this.plData[i], 'viewVal', _this.plData[i].endValStr)
                _this.$set(_this.plData[i], 'pnH', _this.plData[i].endVal * cardinalH / 80)
                return
              }
              window.requestAnimationFrame(_to)
            }
            _to()
          })(i)
        }
      },
      tweenLiteTo2(rate) {
        const _this = this
        const cardinalH = this.$refs.distributeItem[0].clientHeight
        for (let i = 0; i < this.smData.length; i++) {
          (function (i) {
            const _to = function () {
              let startVal = _this.smData[i].startVal + 0.99
              const _startVal = startVal.toFixed(2) - 0
              let viewVal = _startVal + ''
              let dIdx = viewVal.indexOf('.')
              let _viewVal = ''
              if (dIdx < 0) {
                _viewVal = viewVal + '.00'
                _this.$set(_this.smData[i], 'viewVal', _viewVal)
              } else {
                _viewVal = viewVal + '00'
                let _viewVal1 = _viewVal.substring(0, dIdx + 2)
                _this.$set(_this.smData[i], 'viewVal', _viewVal1)
              }
              _this.$set(_this.smData[i], 'startVal', _startVal)
              _this.$set(_this.smData[i], 'pnH', _startVal * cardinalH / 80)
              if (startVal >= _this.smData[i].endVal - 0.1) {
                _this.$set(_this.smData[i], 'startVal', _this.smData[i].endVal)
                _this.$set(_this.smData[i], 'viewVal', _this.smData[i].endValStr)
                _this.$set(_this.smData[i], 'pnH', _this.smData[i].endVal * cardinalH / 80)
                return
              }
              window.requestAnimationFrame(_to)
            }
            _to()
          })(i)
        }
      },
      tweenLiteTo3(rate) {
        const _this = this
        const cardinalH = this.$refs.distributeItem[0].clientHeight
        for (let i = 0; i < this.feData.length; i++) {
          (function (i) {
            const _to = function () {
              let startVal = _this.feData[i].startVal + 0.99
              const _startVal = startVal.toFixed(2) - 0
              let viewVal = _startVal + ''
              let dIdx = viewVal.indexOf('.')
              let _viewVal = ''
              if (dIdx < 0) {
                _viewVal = viewVal + '.00'
                _this.$set(_this.feData[i], 'viewVal', _viewVal)
              } else {
                _viewVal = viewVal + '00'
                let _viewVal1 = _viewVal.substring(0, dIdx + 2)
                _this.$set(_this.feData[i], 'viewVal', _viewVal1)
              }
              _this.$set(_this.feData[i], 'startVal', _startVal)
              _this.$set(_this.feData[i], 'pnH', _startVal * cardinalH / 80)
              if (startVal >= _this.feData[i].endVal - 0.1) {
                _this.$set(_this.feData[i], 'startVal', _this.feData[i].endVal)
                _this.$set(_this.feData[i], 'viewVal', _this.feData[i].endValStr)
                _this.$set(_this.feData[i], 'pnH', _this.feData[i].endVal * cardinalH / 80)
                return
              }
              window.requestAnimationFrame(_to)
            }
            _to()
          })(i)
        }
      },
      tweenLiteTo4(rate) {
        const _this = this
        const cardinalH = this.$refs.distributeItem[0].clientHeight
        for (let i = 0; i < this.pNumData.length; i++) {
          (function (i) {
            const _to = function () {
              let startVal = _this.pNumData[i].startVal + 0.99
              const _startVal = startVal.toFixed(2) - 0
              let viewVal = _startVal + ''
              let dIdx = viewVal.indexOf('.')
              let _viewVal = ''
              if (dIdx < 0) {
                _viewVal = viewVal + '.00'
                _this.$set(_this.pNumData[i], 'viewVal', _viewVal)
              } else {
                _viewVal = viewVal + '00'
                let _viewVal1 = _viewVal.substring(0, dIdx + 2)
                _this.$set(_this.pNumData[i], 'viewVal', _viewVal1)
              }
              _this.$set(_this.pNumData[i], 'startVal', _startVal)
              _this.$set(_this.pNumData[i], 'pnH', _startVal * cardinalH / 80)
              if (startVal >= _this.pNumData[i].endVal - 0.1) {
                _this.$set(_this.pNumData[i], 'startVal', _this.pNumData[i].endVal)
                _this.$set(_this.pNumData[i], 'viewVal', _this.pNumData[i].endValStr)
                _this.$set(_this.pNumData[i], 'pnH', _this.pNumData[i].endVal * cardinalH / 80)
                return
              }
              window.requestAnimationFrame(_to)
            }
            _to()
          })(i)
        }
      },
      init() {
        for (let i = 0; i < this.plData.length; i++) {
          this.$set(this.plData[i], 'startVal', 0)
        }
        for (let j = 0; j < this.smData.length; j++) {
          this.$set(this.smData[j], 'startVal', 0)
        }
        for (let k = 0; k < this.feData.length; k++) {
          this.$set(this.feData[k], 'startVal', 0)
        }
        for (let l = 0; l < this.pNumData.length; l++) {
          this.$set(this.pNumData[l], 'startVal', 0)
        }
      },
      reportSwiper() {
        const _this = this
        this.swiper = new Swiper('.report-swiper-container', {
          nextButton: '.swiper-button-next',
          paginationClickable: true,
          direction: 'vertical',
          loop: true,
          onSlideChangeStart: function(swiper) {
            const realIndex = swiper.realIndex
            _this.slide1 = false
            _this.slide2 = false
            _this.slide3 = false
            _this.slide4 = false
            _this.slide5 = false
            _this.slide6 = false
            _this.slide7 = false
            _this.slide8 = false
            _this.slide9 = false
            _this.init()
            if (realIndex === 0) {
              _this.slide1 = true
              return
            }
            if (realIndex === 1) {
              _this.slide2 = true
              return
            }
            if (realIndex === 2) {
              _this.slide3 = true
              return
            }
            if (realIndex === 3) {
              _this.slide4 = true
              return
            }
            if (realIndex === 4) {
              _this.tweenLiteTo1(5)
              _this.tweenLiteTo2(5)
              _this.slide5 = true
              return
            }
            if (realIndex === 5) {
              _this.slide6 = true
              _this.tweenLiteTo3(5)
              _this.tweenLiteTo4(5)
              return
            }
            if (realIndex === 6) {
              _this.slide7 = true
              return
            }
            if (realIndex === 7) {
              _this.slide8 = true
              return
            }
            if (realIndex === 8) {
              _this.slide9 = true
              return
            }
          }
        })
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .report-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .report-swiper-container
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      background-image: url(./bg.jpg)
      background-position: top center
      background-size: 100% auto
      background-repeat: no-repeat
      .swiper-button-next
        position: absolute
        top: auto
        bottom: 0
        left: 50%
        transform: translate3d(-50%, -50%, 0)
        width: 40px
        height: 40px
        z-index: 10
        background-image: url(./next-icon.png)
        background-size: 20px 20px
      .swiper-slide
        display: flex
        justify-content: center
        align-items: center
        .report-slide
          width: 80%
          .slide-item-1
            padding-bottom: 50%
        .report-slide-group
          width: 86%
          .report-slide-config
            position: relative
            width: 100%
            padding-top: 140%
            height: 0
            background-image: url(./item-bg.png)
            background-position: center
            background-size: 100% auto
            background-repeat: no-repeat
            .report-slide-title
              display: flex
              position: absolute
              top: 1.6%
              left: 0
              width: 100%
              height: 9.5%
              justify-content: center
              align-items: center
              font-size: 15px
              color: #fff
              z-index: 1
            .report-slide-main
              position: absolute
              top: 15%
              right: 0
              bottom: 2%
              left: 0
              overflow: hidden
              z-index:1
              .report-slide-item
                position: relative
                display: flex
                flex-flow: column
                justify-content: center
                align-items: center
                height: 45%
                &.report-slide-box-shadow
                  border-radius: 0 0 15px 15px
                  box-shadow: 0 1px 20px -5px #9acb38
                  .report-slide-sub-title
                    top: 0
                .report-slide-desc 
                  font-size: 12px
                  padding-bottom: 4%
                  color: #666;
                .report-slide-sub-title
                  position: absolute
                  top: 10%
                  left: 10%
                  color: #9acb38
                  font-size: 14px
                  z-index: 10
                  &.report-slide-desc-sub
                    left: 60%
                .item2-img
                  padding-top: 5%
                .item-4-img
                  padding-top: 10%
                .mt-10
                  margin-top: 20px
                .silde-distribute 
                  display: flex
                  position: absolute
                  top: 24%
                  right: 5%
                  bottom: 0
                  left: 5%
                  z-index: 1
                  .silde-distribute-item
                    position: relative
                    display: flex
                    flex-flow: column
                    align-items: center
                    justify-content: flex-end
                    flex: 1
                    &.silde-distribute-2
                      .silde-distribute-pn 
                        color: #fc872a
                      .silde-distribute-svg
                        background-color: #fc872a
                    &.item-styl-0
                      .silde-distribute-pn 
                        color: #ffeb96
                      .silde-distribute-svg
                        background-color: #ffeb96
                    &.item-styl-1
                      .silde-distribute-pn 
                        color: #ffcf01
                      .silde-distribute-svg
                        background-color: #ffcf01
                    &.item-styl-2
                      .silde-distribute-pn 
                        color: #fc872a
                      .silde-distribute-svg
                        background-color: #fc872a
                    .silde-distribute-pn 
                      line-height: 14px
                      font-size: 10px
                      color: #ffcf00
                    .silde-distribute-svg
                      margin-bottom: 2px
                      width: 20px
                      background-color: #ffcf00
                      border-radius: 10px 10px 0 0
                    .silde-distribute-name
                      line-height: 30px
                      width: 100%
                      border-top: 2px solid #e8edf3
                      text-align: center
                      font-size: 12px
                      color: #999
                .report-slide-risk
                  display: flex
                  align-items: center
                  justify-content: center
                  width: 80%
                  .report-slide-risk-txt
                    flex: 1
                    display: flex
                    align-items: center
                    justify-content: center
                    flex-flow: column
                    .report-slide-risk-desc
                      padding: 10% 0
                      font-size: 14px
                      color: #9acb38
                  .report-slide-risk-img
                    flex: 1
                    display: flex
                    align-items: center
                    justify-content: center
</style>
