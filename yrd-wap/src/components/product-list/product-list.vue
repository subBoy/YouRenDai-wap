<template>
  <transition name="slide">
    <div class="product-grounp">
      <m-header :titleTxt="titleTxt" :isIndex="isIndex"></m-header>
      <div class="product-wrapper">
        <scroll ref="productBody"
                class="product-body"
                :data="productList"
                :pullup="pullup"
                @scrollToEnd="startLoad"
        >
          <div class="product-body-wr">
            <div class="list-top"></div>
            <div class="list-box">
              <div class="pro-list" v-for="item in productList">
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
              <loading :title="loadTitle" v-show="hasMore"></loading>
            </div>
          </div>
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

  const DATA_LEN = 5

  export default {
    data () {
      return {
        page: 1,
        pullup: true,
        hasMore: true,
        titleTxt: '列表页',
        loadTitle: '正在加载更多...',
        isIndex: false,
        productList: []
      }
    },
    created () {
      this._getProjectList()
    },
    methods: {
      _getProjectList () {
        this.page = 1
        this.hasMore = true

        getProjectList(this.page, DATA_LEN).then((res) => {
          this.productList = this._genResult(res.rows)
          this._checkMore(res)
        })
      },
      startLoad () {
        if (!this.hasMore) {
          return
        }
        this.page++
        getProjectList(this.page, DATA_LEN).then((res) => {
          this.productList = this.productList.concat(this._genResult(res.rows))
          this._checkMore(res)
        })
      },
      _genResult (data) {
        let ret = []
        /**
           * projects[i].caozuo
           * qidai  期待中
           * ok   终审完成，可投资
           * overdue  结束不可投资
           * checking  复核中
           * repayment  还款中
           * finishd   结束
           */
        for (let i = 0; i < data.length; i++) {
          let obj = {}

          switch (data[i].caozuo) {
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
                surplus: data[i].current_finance_money - data[i].investMoney
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
                surplus: data[i].current_finance_money - data[i].investMoney
              }
          }
          data[i] = Object.assign(data[i], obj)
          ret.push(data[i])
        }

        return ret
      },
      _checkMore (data) {
        const rows = data.rows
        if (!rows.length || (this.productList.length >= data.cnt)) {
          this.hasMore = false
        }
      }
    },
    watch: {
      productList () {
        this.$forceUpdate()
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
