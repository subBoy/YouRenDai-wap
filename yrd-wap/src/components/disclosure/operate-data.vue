<template>
  <div class="operate-data-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll class="operate-data-group" ref="dataScroll" :style="positionTop">
      <div class="operate-data-scroll">
        <div class="disclosure-banner">
          <img src="./banner2.jpg" width="100%">
        </div>
        <div class="disclosure-content">
          <div class="disclosure-content-group" :class="{'show-all': status}">
            <div class="stair-title border-1px-b">
              <span class="title-txt">累计运营数据<i class="title-txt-styl">(截至 {{opData.d1}})</i></span>
              <span class="title-btn" v-show="status" @click="changstatus">收起全部</span>
            </div>
            <div class="disclosure-ct-list">
              <ul class="op-data-list-wrapper">
                <li class="op-data-item">
                  <span class="op-data-icon op-ic1"></span>
                  <p class="op-data-num" v-html="opData.d2"></p>
                  <p class="op-data-desc">累计借贷总金额 (元)</p>
                </li>
                <li class="op-data-item">
                  <span class="op-data-icon op-ic2"></span>
                  <p class="op-data-num" v-html="opData.d3"></p>
                  <p class="op-data-desc">累计借贷总笔数 (笔)</p>
                </li>
                <li class="op-data-item">
                  <span class="op-data-icon op-ic3"></span>
                  <p class="op-data-num" v-html="opData.d4"></p>
                  <p class="op-data-desc">累计出借人数 (人)</p>
                </li>
                <li class="op-data-item">
                  <span class="op-data-icon op-ic4"></span>
                  <p class="op-data-num" v-html="opData.d5"></p>
                  <p class="op-data-desc">累计借款人数 (人)</p>
                </li>
                <li class="op-data-item">
                  <span class="op-data-icon op-ic5"></span>
                  <p class="op-data-num" v-html="opData.d6"></p>
                  <p class="op-data-desc">借贷余额 (元)</p>
                </li>
                <li class="op-data-item">
                  <span class="op-data-icon op-ic6"></span>
                  <p class="op-data-num" v-html="opData.d7"></p>
                  <p class="op-data-desc">借贷余额笔数 (笔)</p>
                </li>
              </ul>
              <ul class="op-data-list-wrapper-1">
                <li class="op-data-item-1">
                  <div class="data-item-wrapper">
                    <div class="op-data-num op-data-num-styl-1">{{opData.d8}}%</div>
                    <svg class="svg-wrapper" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                      <defs>
                        <linearGradient y2="1" x2="1" y1="0" x1="0" id="svg_2">
                          <stop stop-color="#ee8673" offset="0"/>
                          <stop stop-color="#f72904" offset="1"/>
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="60" fill="#fdedee"/>
                      <path id="path1" :d="run(opData.d8, 0, 1)" stroke="url(#svg_2)" fill="url(#svg_2)" fill-opacity="1" :style="style1" />
                      <circle cx="60" cy="60" r="5" fill="url(#svg_2)"/>
                    </svg>
                    <p class="op-data-txt">最大单户出借余额占比</p>
                  </div>
                </li>
                <li class="op-data-item-1">
                  <div class="data-item-wrapper">
                    <div class="op-data-num op-data-num-styl-2">{{opData.d9}}%</div>
                    <svg class="svg-wrapper" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                      <defs>
                        <linearGradient y2="1" x2="1" y1="0" x1="0" id="svg_3">
                          <stop stop-color="#76bafe" offset="0"/>
                          <stop stop-color="#2a8df0" offset="1"/>
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="60" fill="#e1f0ff"/>
                      <path id="path2" :d="run(opData.d9, 0, 2)" stroke="url(#svg_3)" fill="url(#svg_3)" fill-opacity="1" :style="style2" />
                      <circle cx="60" cy="60" r="5" fill="url(#svg_3)"/>
                    </svg>
                    <p class="op-data-txt">最大十户出借余额占比</p>
                  </div>
                </li>
              </ul>
              <ul class="op-data-list-wrapper-2">
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d1">
                    <p class="op-data-num" v-html="opData.d10"></p>
                    <p class="op-data-desc">关联关系借款余额/万元</p>
                  </div>
                </li>
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d2">
                    <p class="op-data-num" v-html="opData.d11"></p>
                    <p class="op-data-desc">关联关系借款笔数/笔</p>
                  </div>
                </li>
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d2">
                    <p class="op-data-num" v-html="opData.d12"></p>
                    <p class="op-data-desc">逾期金额/万元</p>
                  </div>
                </li>
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d1">
                    <p class="op-data-num" v-html="opData.d13"></p>
                    <p class="op-data-desc">逾期笔数/笔</p>
                  </div>
                </li>
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d1">
                    <p class="op-data-num" v-html="opData.d14"></p>
                    <p class="op-data-desc">代偿金额/万元</p>
                  </div>
                </li>
                <li class="op-data-item-2">
                  <div class="data-item-wrapper d2">
                    <p class="op-data-num" v-html="opData.d15"></p>
                    <p class="op-data-desc">代偿笔数/笔</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="show-all-btn-wrapper">
            <span class="show-all-btn" v-show="!status" @click="changstatus">展开全部</span>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">月度运营报告</span>
          </div>
          <div class="disclosure-ct-list">
            <div class="run-data">
              <router-link class="run-data-link" tag="a" :to="listPath">
                <img class="run-data-img" @load="refresh" src="./banner3.jpg" width="100%">
                <span class="run-data-info-wrapper">
                  <span class="run-data-title" v-html="reportTitle"></span>
                  <span class="run-data-btn">查看</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="hr-20"></div>
      </div>
    </Scroll>
    <transition name="slide">
      <router-view :isWap="isWap" :positionTop="positionTop"></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getDisclosure, getOperateData} from 'api/user'

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
        titleTxt: '运营数据',
        isShow: false,
        opcity: 1,
        reportTitle: '',
        status: false,
        opData: {},
        style1: '',
        style2: '',
        listPath: ''
      }
    },
    created () {
      const pathVal = this.$route.path
      if (pathVal.indexOf('app') >= 0) {
        this.isWap = false
        this.positionTop = 'top: 0px'
        this.listPath = '/app-disclosure/operate-data/report'
      } else {
        this.positionTop = 'top: 44px'
        this.isWap = true
        this.listPath = '/disclosure/operate-data/report'
      }
      this._getDisclosure()
      this._getOperateData()
    },
    methods: {
      run (deg, clockwise, index) {
        if (deg) {
          let _deg = (deg / 100) * 360
          let rodeg = -(180 - _deg) / 2
          if (index === 1) {
            this.style1 = `transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);-webkit-transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);-moz-transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);`
          } else {
            this.style2 = `transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);-webkit-transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);-moz-transform: translate3d(60px, 60px, 0) rotate(${rodeg}deg) scale(0.1);`
          }
          let x = 600
          let y = 0
          const r = 600
          return this._drawArcByRadiusDeg(x, y, r, _deg, clockwise)
        }
      },
      refresh () {
        setTimeout(() => {
          this.$refs.dataScroll.refresh()
        }, 20)
      },
      changstatus () {
        this.status = !this.status
      },
      _drawArcByRadiusDeg (startX, startY, r, deg, clockwise) {
        let cw = typeof clockwise !== 'undefined' ? clockwise : 1
        let x = r * Math.cos(deg * Math.PI / 180)
        let y = (cw === 1 ? 1 : -1) * r * Math.sin(deg * Math.PI / 180)
        let bigOrSmall = deg > 180 ? 1 : 0
        let line = ` L 0 0 L ${startX} ${startY} Z`
        return `M ${startX} ${startY} A ${r} ${r} 0 ${bigOrSmall} ${cw} ${x} ${y} ${line}`
      },
      _getDisclosure () {
        getDisclosure().then((res) => {
          this.reportTitle = res.ret_set.titel
        })
      },
      _getOperateData () {
        getOperateData().then((res) => {
          this.opData = res.data
        })
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
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  #path1
    transform: translate3d(60px, 60px, 0) rotate(-45deg) scale(0.1)
  #path2
    transform: translate3d(60px, 60px, 0) rotate(-45deg) scale(0.1)
  .operate-data-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .operate-data-group
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
          overflow: hidden
          height: 131px
          &.show-all
            height: auto
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
            .title-txt-styl
              padding-left: 5px
              font-style: normal
              font-size: 9px
          .title-btn
            extend-click()
            float: right
            display: block
            padding-right: 15px
            background-image: url(./hide-up.png)
            background-repeat: no-repeat
            background-size: auto 8px
            background-position: center right
        .run-data
          display: flex
          justify-content: center
          align-items: center
          .run-data-link 
            position: relative
            display: block
            margin-top: 20px
            width: 88%
            .run-data-info-wrapper
              display: block
              position: absolute
              width: 100%
              top: 50%
              left: 0
              transform: translate3d(0, -50%, 0)
              .run-data-title
                display: block
                text-align: center
                font-size: 18px
                padding-bottom: 20px
                color: #fff
              .run-data-btn
                display: flex
                justify-content: center
                align-items: center
                margin: 0 auto
                width: 60px
                height: 20px
                border-radius: 3px
                border: 1px solid #fff
                color: #fff
                font-size: 8px
        .op-data-list-wrapper
          overflow: hidden
          width: 90%
          margin: 0 auto
          padding-bottom: 20px
          background-image: url(./border-img.png)
          background-repeat: no-repeat
          background-size: 100% auto
          background-position: bottom center
          .op-data-item
            width: 50%
            float: left
            text-align: center
            padding-top: 10px
            .op-data-icon 
              display: block
              width: 100%
              height: 60px
              background-position: center
              background-size: 40px 40px
              &.op-ic1
                bg-image('x-1')
              &.op-ic2
                bg-image('x-2')
              &.op-ic3
                bg-image('x-3')
              &.op-ic4
                bg-image('x-4')
              &.op-ic5
                bg-image('x-5')
              &.op-ic6
                bg-image('x-6')
            .op-data-desc
              line-height: 14px
              font-size: 7px
              color: #969696
            .op-data-num
              line-height: 14px
              font-size: 10px
              color: #323232 
        .op-data-list-wrapper-1
          overflow: hidden
          width: 100%
          margin: 0 auto
          padding: 15px 0 20px
          background-image: url(./border-img.png)
          background-repeat: no-repeat
          background-size: 90% auto
          background-position: bottom center
          .op-data-item-1
            width: 50%
            float: left
            text-align: center
            padding-top: 10px
            .data-item-wrapper
              display: flex
              flex-flow:row wrap
              justify-content: space-around
              width: 130px
              margin: 0 auto
              .op-data-txt
                line-height: 14px
                padding-top: 10px
                font-size: 9px
                color: #323232
              .op-data-num
                line-height: 14px
                font-size: 9px
                padding-bottom: 14px
                background-repeat: no-repeat
                background-size: auto 18px
                &.op-data-num-styl-1
                  margin-left: 50%
                  padding-left: 35px
                  color: #fe5f4f
                  background-image: url(./icon-t-1.png)
                  background-position: left center
                &.op-data-num-styl-2
                  margin-right: 50%
                  padding-right: 35px
                  color: #2e8ff1
                  background-image: url(./icon-t-2.png)
                  background-position: right center
        .op-data-list-wrapper-2
          overflow: hidden
          width: 90%
          margin: 0 auto
          padding-top: 10px
          .op-data-item-2
            width: 50%
            float: left
            margin-top: 10px
            text-align: center
            .data-item-wrapper
              margin: 0 auto
              padding: 10px 0
              width: 90%
              border-radius: 3px
              .op-data-num
                line-height: 24px
                font-size: 18px
              .op-data-desc
                line-height: 18px
                font-size: 9px
              &.d1
                background-color: #ffdede
                color: #ff4141
              &.d2
                background-color: #e3f2ff
                color: #3493f2
</style>
