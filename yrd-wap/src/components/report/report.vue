<template>
  <div class="report-wrapper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-grounp-1">
          <div class="swiper-grounp-1-content">
            <div class="swiper-grounp-content">
              <p class="text-1 animated" :class="{bounce: activeIndex === 0}">2017年有人贷</p>
              <div class="title-1 animated" :class="{bounceInLeft: activeIndex === 0}">
                <h3 class="title-txt">7月份运营报告</h3>
                <p class="desc-1">OPERATION REPORT OF YOURENDAI</p>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="title-2 animated" :class="{bounceIn: activeIndex === 1}">
              <img src="./minImg.png" width="100%">
            </div>
            <img src="./upgrade.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="swiper-grounp-title">01 性别星座</div>
            <div class="boy-girl">
              <div class="boy-girl-wrapper" ref="boyGirl">
                <div class="boy" :style="boyStyl">
                  <span class="desc">{{initBoy}}%</span>
                </div>
                <div class="girl" :style="girlStyl">
                  <span class="desc">{{initGirl}}%</span>
                </div>
              </div>
            </div>
            <img src="./page-3-bg.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="swiper-grounp-title">02 地域排名</div>
            <div class="page4-ct animated" :class="{fadeIn: activeIndex === 3}">
              <img src="./map.png" width="100%">
            </div>
            <img src="./slide-bg.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="swiper-grounp-title">03 年龄分布</div>
            <ul class="swiper-grounp-5" ref="slideGrounp">
              <li class="swiper-item" v-for="(item, index) in age">
                <div class="progress-bar">
                  <span class="bar-state" :class="barBg(index)" :style="setWidth(item)"></span>
                  <span class="bar-init"></span>
                </div>
                <p class="age-desc">
                  <span class="age-percent">金额占比: {{item.initPt}}%</span>
                  <span class="age-era">{{item.era}}后</span>
                </p>
              </li>
            </ul>
            <img src="./slide-bg.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="swiper-grounp-title">04 操作系统</div>
            <ul class="swiper-grounp-6">
              <li class="progress-circle" v-for="(item, index) in system" :class="item.icon">
                <svg width="90" height="90" viewBox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle class="progress-background" r="45" cx="45" cy="45" fill="transparent"/>
                  <circle class="progress-bar" r="45" cx="45" cy="45" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="item.perimeter"/>
                </svg>
                <p class="system-percent">{{item.nowPt}}%</p>
                <p class="system-name">{{item.name}}</p>
              </li>
            </ul>
            <img src="./slide-bg.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="swiper-grounp-title">05 投资时点</div>
            <div class="swiper-grounp-8" ref="grounpTime">
              <div class="grounp-8-wrapper" :style="pageCtw"></div>
            </div>
            <img src="./page8-bg.png" width="88%">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-grounp-2-content">
            <div class="something-item something-1">
              <img src="./something-1.png" width="100%" class="animated" :class="{slideInLeft: activeIndex === 7}">
            </div>
            <div class="something-item something-2">
              <img src="./something-2.png" width="100%" class="animated" :class="{slideInRight: activeIndex === 7}">
            </div>
            <div class="something-item something-3">
              <img src="./something-3.png" width="100%" class="animated" :class="{slideInLeft: activeIndex === 7}">
            </div>
            <img src="./page9-bg.png" width="88%">
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

  export default {
    data() {
      return {
        swiper: '',
        activeIndex: 0,
        // 性别星座
        boy: 45.65,
        girl: 54.35,
        initBoy: 0,
        initGirl: 0,
        boyHeight: 0,
        girlHeight: 0,
        height: 0,
        // 年龄分布
        age: [
          {
            era: 50,
            percent: 15.82,
            initPt: 0,
            nowWidth: 0
          },
          {
            era: 60,
            percent: 12.45,
            initPt: 0,
            nowWidth: 0
          },
          {
            era: 70,
            percent: 18.89,
            initPt: 0,
            nowWidth: 0
          },
          {
            era: 80,
            percent: 45.52,
            initPt: 0,
            nowWidth: 0
          },
          {
            era: 90,
            percent: 7.32,
            initPt: 0,
            nowWidth: 0
          }
        ],
        width: 0,
        // 操作系统
        system: [
          {
            percent: 60.08,
            name: 'Android',
            icon: 'icon-and',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 29.05,
            name: 'IOS',
            icon: 'icon-ios',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 12.65,
            name: 'Mweb',
            icon: 'icon-pc',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 3.16,
            name: 'WECHAT',
            icon: 'icon-wechat',
            perimeter: Math.PI * 90,
            nowPt: 0
          }
        ],
        dashArray: Math.PI * 90,
        // 投资区间
        range: [
          {
            percent: 83.88,
            name: '3000元',
            icon: 'icon-3k',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 7.61,
            name: '3000元-2万元',
            icon: 'icon-20k',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 4.92,
            name: '2万元-10万元',
            icon: 'icon-100k',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 2.55,
            name: '10万元-50万元',
            icon: 'icon-500k',
            perimeter: Math.PI * 90,
            nowPt: 0
          },
          {
            percent: 1.04,
            name: '100万元及以上',
            icon: 'icon-1000k',
            perimeter: Math.PI * 90,
            nowPt: 0
          }
        ],
        // 投资时点
        ctWidth: 0
      }
    },
    created() {
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    computed: {
      boyStyl() {
        return 'height:' + this.boyHeight + 'px'
      },
      girlStyl() {
        return 'height:' + this.girlHeight + 'px'
      },
      pageCtw() {
        return 'width:' + this.ctWidth + 'px'
      }
    },
    methods: {
      page3An() {
        this.height = this.$refs.boyGirl.clientHeight
        this.boyInter = setInterval(this.creboy, 30)
        this.girlInter = setInterval(this.cregirl, 30)
      },
      creboy() {
        this.initBoy = this.initBoy + 1
        if (this.initBoy >= this.boy) {
          this.initBoy = this.boy
          clearInterval(this.boyInter)
        }
        this.boyHeight = this.height * this.initBoy / 100
      },
      cregirl() {
        this.initGirl = this.initGirl + 1
        if (this.initGirl >= this.girl) {
          this.initGirl = this.girl
          clearInterval(this.girlInter)
        }
        this.girlHeight = this.height * this.initGirl / 100
      },
      page5An() {
        this.width = this.$refs.slideGrounp.clientWidth
        this.sh0 = window.setInterval(this.cre40(0), 30)
        this.sh1 = window.setInterval(this.cre40(1), 30)
        this.sh2 = window.setInterval(this.cre40(2), 30)
        this.sh3 = window.setInterval(this.cre40(3), 30)
        this.sh4 = window.setInterval(this.cre40(4), 30)
      },
      cre40(i) {
        let _this = this
        return () => {
          _this.$set(_this.age[i], 'initPt', _this.age[i].initPt + 1)
          if (_this.age[i].initPt >= _this.age[i].percent) {
            _this.$set(_this.age[i], 'initPt', _this.age[i].percent)
            if (i === 0) {
              clearInterval(_this.sh0)
            } else if (i === 1) {
              clearInterval(_this.sh1)
            } else if (i === 2) {
              clearInterval(_this.sh2)
            } else if (i === 3) {
              clearInterval(_this.sh3)
            } else if (i === 4) {
              clearInterval(_this.sh4)
            }
          }
          let _width = _this.width * _this.age[i].initPt / 100
          _this.$set(_this.age[i], 'nowWidth', _width)
        }
      },
      barBg(index) {
        return 'bar-bg-' + index
      },
      setWidth(item) {
        return 'width:' + item.nowWidth + 'px'
      },
      page6An() {
        this.sy0 = window.setInterval(this._ani(0), 30)
        this.sy1 = window.setInterval(this._ani(1), 30)
        this.sy2 = window.setInterval(this._ani(2), 30)
        this.sy3 = window.setInterval(this._ani(3), 30)
      },
      _ani(i) {
        let _this = this
        return () => {
          _this.$set(_this.system[i], 'nowPt', _this.system[i].nowPt + 1)
          if (_this.system[i].nowPt >= _this.system[i].percent) {
            _this.$set(_this.system[i], 'nowPt', _this.system[i].percent)
            if (i === 0) {
              clearInterval(_this.sy0)
            } else if (i === 1) {
              clearInterval(_this.sy1)
            } else if (i === 2) {
              clearInterval(_this.sy2)
            } else if (i === 3) {
              clearInterval(_this.sy3)
            }
          }
          let _width = (100 - _this.system[i].nowPt) * _this.dashArray / 100
          _this.$set(_this.system[i], 'perimeter', _width)
        }
      },
      page8An() {
        this._w = this.$refs.grounpTime.clientWidth
        this.page8In = setInterval(this._ani3, 30)
      },
      _ani3() {
        this.ctWidth = this.ctWidth + 5
        if (this.ctWidth >= this._w) {
          this.ctWidth = this._w
          clearInterval(this.page8In)
        }
      },
      _swiper() {
        let _this = this
        this.swiper = new Swiper('.swiper-container', {
          nextButton: '.swiper-button-next',
          paginationClickable: true,
          direction: 'vertical',
          loop: true,
          onSlideChangeStart: function() {
            _this.activeIndex = _this.swiper.realIndex
            console.log(_this.activeIndex)
            if (_this.activeIndex === 2) {
              _this.page3An()
            } else {
              _this.boyHeight = 0
              _this.girlHeight = 0
              _this.initBoy = 0
              _this.initGirl = 0
            }
            if (_this.activeIndex === 4) {
              _this.page5An()
            } else {
              for (let i = 0; i < _this.age.length; i++) {
                _this.$set(_this.age[i], 'initPt', 0)
                _this.$set(_this.age[i], 'nowWidth', 0)
              }
            }

            if (_this.activeIndex === 5) {
              _this.page6An()
            } else {
              for (let i = 0; i < _this.system.length; i++) {
                _this.$set(_this.system[i], 'nowPt', 0)
                _this.$set(_this.system[i], 'perimeter', Math.PI * 90)
              }
            }

            if (_this.activeIndex === 6) {
              _this.page8An()
            } else {
              _this.ctWidth = 0
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @-wibkit-keyframes fade
    from
      opacity: 0.1
    to
      opacity: 1
  @keyframes fade
    from
      opacity: 0.1
    to
      opacity: 1
  .report-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    .swiper-container
      width: 100%
      height: 100%
      background: url(app-bg.png) no-repeat top center
      -webkit-background-size: 100% auto
      background-size: 100% auto
      .swiper-slide
        text-align: center
        font-size: 18px
        display: -webkit-box
        display: -ms-flexbox
        display: -webkit-flex
        display: flex
        -webkit-box-pack: center
        -ms-flex-pack: center
        -webkit-justify-content: center
        justify-content: center
        -webkit-box-align: center
        -ms-flex-align: center
        -webkit-align-items: center
        align-items: center
      .swiper-grounp-1
        background: url("rep-idx.png") no-repeat top center
        -webkit-background-size: 100% auto
        background-size: 100% auto
        width: 100%
        height: 100%
        color: #FFF
        font-size: 18px
      .swiper-button-next, .swiper-container-rtl .swiper-button-prev
        top: auto
        bottom: 20px
        margin-top: 0
        left: 50%
        margin-left: -15px
        width: 34px
        height: 30px
        background: url("btn-down.png")
        -webkit-background-size: 100% 100%
        background-size: 100% 100%
        -webkit-animation: fade 2s linear infinite alternate
        animation: fade 2s linear infinite alternate
      .swiper-grounp-1-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 0
        padding-top: 140%
      .swiper-grounp-content
        position: absolute
        width: 100%
        top: 50%
        left: 0
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .title-txt
        padding: 25px 0 5px 0
        font-size: 40px
      .swiper-grounp-2-content
        position: relative
      .title-2
        position: absolute
        width: 250px
        left: 50%
        top: 13%
        margin-left: -125px
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .boy-girl
        position: absolute
        top: 0
        width: 100%
        height: 0
        padding-top: 55.5%
      .boy
        position: absolute
        left: 35.5%
        bottom: 0
        width: 8%
        -webkit-transform: translateX(-50%)
        transform: translateX(-50%)
        background: rgb(134, 200, 255)
        color: rgb(134, 200, 255)
        font-size: 10px
        border-radius: 10px 10px 0 0
        background: -moz-linear-gradient(top, #7cc3ff, #a2d5ff)
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#7cc3ff), to(#a2d5ff))
      .girl
        position: absolute
        left: 69.5%
        bottom: 0
        width: 8%
        -webkit-transform: translateX(-50%)
        transform: translateX(-50%)
        background: rgb(207, 151, 247)
        color: rgb(207, 151, 247)
        font-size: 10px
        border-radius: 10px 10px 0 0
        background: -moz-linear-gradient(top, #c682f6, #d7a6f9)
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#c682f6), to(#d7a6f9))
      .boy .desc, .girl .desc
        display: block
        position: absolute
        left: 50%
        margin-left: -50px
        width: 100px
        text-align: center
        top: -15px
      .boy-girl-wrapper
        position: absolute
        width: 100%
        height: 52.5%
        bottom: 0
      .page4-ct
        position: absolute
        top: 50%
        left: 12%
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
        width: 76%
      .swiper-grounp-title
        position: absolute
        left: 11.5%
        top: 10%
        width: 100%
        font-size: 15px
        color: #1592a0
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
        text-align: left
      .swiper-grounp-5
        position: absolute
        top: 52%
        width: 78%
        left: 11%
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .progress-bar
        position: relative
        width: 100%
        height: 24px
        border-radius: 12px
      .bar-init
        display: block
        position: absolute
        width: 100%
        left: 0
        height: 14px
        background-color: #e8edf3
        border-radius: 7px
        top: 50%
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .bar-state
        display: block
        position: absolute
        left: 0
        height: 18px
        background-color: #e8edf3
        border-radius: 9px
        top: 50%
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
        z-index: 10
      .bar-bg-0
        width: 50px
        background-color: #57c1ff
        box-shadow: 0px 0px 6px -1px #57c1ff
      .bar-bg-1
        width: 50px
        background-color: #ffba4b
        box-shadow: 0px 0px 6px -1px #ffba4b
      .bar-bg-2
        width: 50px
        background-color: #ce7bff
        box-shadow: 0px 0px 6px -1px #ce7bff
      .bar-bg-3
        width: 50px
        background-color: #ff7777
        box-shadow: 0px 0px 6px -1px #ff7777
      .bar-bg-4
        width: 50px
        background-color: #87e68a
        box-shadow: 0px 0px 6px -1px #87e68a
      .age-desc
        padding: 3px 0
        overflow: hidden
      .age-percent
        float: left
        font-size: 10px
        color: #323232
      .age-era
        float: right
        font-size: 10px
        color: #323232
      .swiper-item
        padding-bottom: 10px
      .swiper-grounp-6
        position: absolute
        top: 54%
        width: 78%
        left: 11%
        overflow: hidden
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .progress-circle
        width: 50%
        float: left
        position: relative
      circle
        stroke-width: 3px
        transform-origin: center
      circle.progress-background
        -webkit-transform: scale(0.9)
        transform: scale(0.9)
        stroke: #d5effe
      circle.progress-bar
        stroke-width: 5px
        -webkit-transform: scale(0.9) rotate(-180deg)
        transform: scale(0.9) rotate(-180deg)
        stroke: #7bb0ff
      .system-percent
        position: absolute
        width: 100%
        top: 33%
        padding-top: 30px
        background-position: top center
        background-repeat: no-repeat
        font-size: 11px
        color: #919bb5
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .range-percent
        position: absolute
        width: 100%
        top: 34.5%
        background-position: top center
        background-repeat: no-repeat
        font-size: 11px
        color: #919bb5
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .system-name
        margin-bottom: 20px
        font-size: 11px
        color: #919bb5
      .icon-and .system-percent
        background-image: url(andr.png)
        -webkit-background-size: 22.5px 25px
        background-size: 22.5px 25px
      .icon-ios .system-percent
        background-image: url(ios.png)
        -webkit-background-size: 23px 25px
        background-size: 23px 25px
      .icon-pc .system-percent
        background-image: url(pc.png)
        -webkit-background-size: 22.5px 21.5px
        background-size: 22.5px 21.5px
      .icon-wechat .system-percent
        background-image: url(weixin.png)
        -webkit-background-size: 27px 22.5px
        background-size: 27px 22.5px
      .icon-ios circle.progress-background
        stroke: #ffe5d2
      .icon-ios circle.progress-bar
        stroke: #ff984d
      .icon-pc circle.progress-background
        stroke: #f3deff
      .icon-pc circle.progress-bar
        stroke: #ce7bff
      .icon-wechat circle.progress-background
        stroke: #ffe4e4
      .icon-wechat circle.progress-bar
        stroke: #fd7172
      .swiper-grounp-7
        position: absolute
        top: 54%
        width: 88%
        left: 6%
        overflow: hidden
        -webkit-transform: translateY(-50%)
        transform: translateY(-50%)
      .swiper-grounp-7  .progress-circle
        width: 33.333%
      .swiper-grounp-7 .progress-circle.icon-500k, .swiper-grounp-7 .progress-circle.icon-1000k
        width: 50%
      .swiper-grounp-7 .progress-circle.icon-500k
        transform: translateX(10%)
      .swiper-grounp-7 .progress-circle.icon-1000k
        transform: translateX(-10%)
      .icon-3k circle.progress-background
        stroke: #d5eefd
      .icon-3k circle.progress-bar
        stroke: #59c1fe
      .icon-20k circle.progress-background
        stroke: #fdeed1
      .icon-20k circle.progress-bar
        stroke: #ffba4b
      .icon-100k circle.progress-background
        stroke: #f0defd
      .icon-100k circle.progress-bar
        stroke: #ce7bff
      .icon-500k circle.progress-background
        stroke: #fddddb
      .icon-500k circle.progress-bar
        stroke: #fd7775
      .icon-1000k circle.progress-background
        stroke: #e2f9e4
      .icon-1000k circle.progress-bar
        stroke: #85e789
      .swiper-grounp-8
        position: absolute
        top: 48%
        width: 82%
        left: 9%
        height: 0
        padding-top: 34%
        overflow: hidden
        transform: translateY(-50%)
      .grounp-8-wrapper
        position: absolute
        left: 0
        top: 0
        height: 106%
        width: 100%
        background-image: url(page8-ct.png)
        background-repeat: no-repeat
        background-size: auto 100%
      .something-item
        position: absolute
        left: 10%
        width: 80%
        transform: translateY(-50%)
      .something-1
        top: 22%
      .something-2
        top: 48%
        .animated
          transition-delay: 0.8s
      .something-3
        top: 74%
        .animated
          transition-delay: 1.6s
</style>
