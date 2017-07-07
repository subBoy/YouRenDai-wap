<template>
  <transition name="slide">
    <div class="product-grounp">
      <m-header :titleTxt="titleTxt" :isIndex="isIndex"></m-header>
      <div class="product-wrapper">
        <scroll class="product-body" :data="nowDataList" :probe-type="probeType" :pullup="pullup" :listen-scroll="listenScroll" @touchend="startLoad">
          <div class="product-body-wr">
            <div class="list-top"></div>
            <div class="list-box">
              <div class="pro-list" v-for="(item, index) in nowDataList">
                <div class="list-tit">
                  <a class="pro-name">{{item.project_name}}</a>
                  <div class="table">
                    <span class="txt">中秋专享</span>
                  </div>
                </div>
                <ul class="list-ul">
                  <li class="list-income">
                    <p class="list-p1">预期年化收益</p>
                    <p class="list-p2">{{item.year_rate}}<span class="muti">%</span></p>
                  </li>
                  <li>
                    <p class="list-p1">借款期限</p>
                    <p class="list-p3">{{(item.rongzilimit / 30).toFixed(0)}}个月</p>
                  </li>
                  <li>
                    <p class="list-p1 styl">剩余{{item.surplus}}元</p>
                    <div class="detail-btn" :class="{'not-click': !item.btnClass}">
                      <span class="btn-txt">{{item.btnTxt}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="loading-wrapper">
              <loading :title="loadTitle" v-show="loadingState"></loading>
            </div>
          </div>
          <loading v-show="!nowDataList.length"></loading>
        </scroll>
      </div>
      <tab></tab>
    </div>
  </transition>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import Tab from 'components/tab/tab'
  import {getProjectList} from 'api/product'

  const DATA_LEN = 10

  export default {
    data () {
      return {
        titleTxt: '列表页',
        loadTitle: '松手加载更多...',
        isIndex: false,
        productList: [],
        nowDataList: [],
        loadingState: false,
        proPage: 0,
        nowPage: 0
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
      this.pullup = true
      this._getProjectList(1, DATA_LEN)
    },
    methods: {
      _getProjectList (page, row) {
        getProjectList(page, row).then((res) => {
          this.productList = []
          this.productList = res.rows
          this.proPage = Math.ceil(res.cnt / DATA_LEN)

          /**
             * projects[i].caozuo
             * qidai  期待中
             * ok   终审完成，可投资
             * overdue  结束不可投资
             * checking  复核中
             * repayment  还款中
             * finishd   结束
             */

          let _this = this
          for (let i = 0; i < _this.productList.length; i++) {
            let obj = {}

            switch (_this.productList[i].caozuo) {
              case 'qidai':
                obj = {
                  btnTxt: '敬请期待',
                  btnClass: false,
                  surplus: 0
                }
                break
              case 'ok':
                obj = {
                  btnTxt: '去加入',
                  btnClass: true,
                  surplus: _this.productList[i].current_finance_money - _this.productList[i].investMoney
                }
                break
              case 'overdue':
                obj = {
                  btnTxt: '已结束',
                  btnClass: false,
                  surplus: 0
                }
                break
              case 'checking':
                obj = {
                  btnTxt: '复核中',
                  btnClass: false,
                  surplus: 0
                }
                break
              case 'repayment':
                obj = {
                  btnTxt: '还款中',
                  btnClass: false,
                  surplus: 0
                }
                break
              case 'finishd':
                obj = {
                  btnTxt: '已结束',
                  btnClass: false,
                  surplus: 0
                }
                break
              default:
                obj = {
                  btnTxt: '去加入',
                  btnClass: true,
                  surplus: _this.productList[i].current_finance_money - _this.productList[i].investMoney
                }
            }
            _this.productList[i] = Object.assign(_this.productList[i], obj)
            _this.nowDataList.push(_this.productList[i])
          }

          this.nowPage = this.nowPage - 0 + 1
        })
      },
      startLoad () {
        if (this.nowPage < this.proPage) {
          let _page = this.nowPage - 0 + 1
          this._getProjectList(_page, DATA_LEN)
        } else {
          return false
        }
      }
    },
    components: {
      MHeader,
      Loading,
      Scroll,
      Tab
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .product-grounp
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    .product-wrapper
      position: fixed
      left: 0
      right: 0
      top: 45px
      bottom: 50px
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .product-body
    height: 100%
    overflow: hidden
    .product-body-wr
      position: relative
      .list-top
        margin-top: 5px
        padding-top: 13%
        bg-image('bank')
        background-size: 100%
      .list-box
        padding-bottom: 5px
      .loading-wrapper
        position: absolute
        width: 100%
        left: 0
        bottom: -50px
      .pro-list
        background: #fff
        padding: 24px 20px
        overflow: hidden
        margin-bottom: 5px
      .list-tit
        position: relative
        overflow: hidden
        padding-bottom: 20px
        .pro-name
          display: block
          line-height: 14px
          font-size: $font-size-small
          color: $color-tle
        .table
          position: absolute
          right: 0
          top: 1px
          width: 50px
          height: 12px
          bg-image('table')
          background-size: 50px 12px
          .txt
            display: block
            position: absolute
            left: 0
            top: 0
            line-height: 24px
            transform: scale(0.5) translate3d(-50%, -50%, 0)
            width: 200%
            text-align: center
            font-size: $font-size-medium-x
            color: $color-text
          &.no-click
            bg-image('c-table')
      .list-ul
        overflow: hidden
        clear: both
        li
          float: left
          width: 30%
          .list-p1
            font-size: $font-size-small
            color: $color-q
            &.styl
              text-align: right
          .list-p2
            font-size: 36px
            color: $color-theme
            padding-top: 20px
            .muti
              font-size: $font-size-medium
          .list-p3
            font-size: $font-size-medium-x
            color: $color-tle
            padding-top: 35px
          .detail-btn
            float: right
            margin-top: 25px
            margin-right: -3px
            width: 84px
            height: 37px
            bg-image('y-btn-bg')
            background-size: 84px 37px
            .btn-txt
              display: block
              width: 100%
              line-height: 32px
              text-align: center
              color: $color-text
              font-size: $font-size-medium
            &.not-click
              bg-image('n-btn-bg')
          &.list-income
            width: 40%
</style>
