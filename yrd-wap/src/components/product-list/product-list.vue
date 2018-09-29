<template>
  <div class="product-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :opcity="opcity" :goBack="goBack"></m-header>
    <div class="product">
      <scroll class="product-scroll"
        :data="productList"
        :pullup="pullup"
        @scrollToEnd="loadMore"
      >
        <div class="product-grounp">
          <div class="banner"></div>
          <ul class="product-list">
            <li class="product-item" v-for="(item, index) in productList">
              <h3 class="name">{{item.project_name}} <!-- <span v-if="item.is_open === 'yes'" class="label" :class="{'activity-over': !item.btnClass}">{{item.content}}</span> --></h3>
              <div class="item-info">
                <div class="rate-info">
                  <p class="txt">历史参考年化回报率</p>
                  <p class="rate-desc">{{item.year_rate}}<span class="muti">%</span></p>
                </div>
                <div class="loan-info">
                  <p class="txt">借款期限</p>
                  <p class="loan-desc"><span class="month">{{item.loanTerm}}</span>个月</p>
                </div>
                <div class="surplus-info">
                  <p class="txt">剩余{{item.surplus}}元</p>
                  <div class="detail-btn" @click="selectItem(item)" :class="{'not-click': !item.btnClass}">{{item.btnTxt}}</div>
                </div>
              </div>
            </li>
          </ul>
          <loading :title="loadTitle" v-show="hasMore"></loading>
        </div>
      </scroll>
    </div>
    <tab :activeIndex="activeIndex"></tab>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Tab from 'components/tab/tab'
  import Loading from 'base/loading/loading'
  import {getProjectList} from 'api/product'

  const DATA_LEN = 5

  export default {
    data () {
      return {
        titleTxt: '列表页',
        loadTitle: '正在载入更多...',
        pullup: true,
        hasMore: true,
        page: 1,
        opcity: 1,
        activeIndex: 1,
        productList: [],
        goBack: true
      }
    },
    created () {
      this._getProjectList()
    },
    methods: {
      selectItem (item) {
        this.$router.push({
          path: `/subscribe/${item.project_id}`
        })
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }

        this.page++
        getProjectList(this.page, DATA_LEN).then((res) => {
          this.productList = this.productList.concat(this._genResult(res.rows))
          this._checkMore(res)
        })
      },
      _getProjectList () {
        this.page = 1
        this.hasMore = true

        getProjectList(this.page, DATA_LEN).then((res) => {
          this.productList = this._genResult(res.rows)
          this._checkMore(res)
        })
      },
      _genResult (data) {
        let ret = []
        /**
          * projects[i].caozuo
          * qidai  历史参考中
          * ok   终审完成，可投资
          * overdue  结束不可投资
          * checking  复核中
          * repayment  还款中
          * finishd   结束
          **/
        for (let i = 0; i < data.length; i++) {
          let obj = {}
          switch (data[i].caozuo) {
            case 'qidai':
              obj = {
                btnTxt: '敬请历史参考',
                btnClass: false,
                surplus: 0,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            case 'ok':
              obj = {
                btnTxt: '去加入',
                btnClass: true,
                surplus: data[i].current_finance_money - data[i].investMoney,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            case 'overdue':
              obj = {
                btnTxt: '已结束',
                btnClass: false,
                surplus: 0,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            case 'checking':
              obj = {
                btnTxt: '复核中',
                btnClass: false,
                surplus: 0,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            case 'repayment':
              obj = {
                btnTxt: '还款中',
                btnClass: false,
                surplus: 0,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            case 'finishd':
              obj = {
                btnTxt: '已结束',
                btnClass: false,
                surplus: 0,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
              break
            default:
              obj = {
                btnTxt: '去加入',
                btnClass: true,
                surplus: data[i].current_finance_money - data[i].investMoney,
                loanTerm: (data[i].rongzilimit / 30).toFixed(0)
              }
          }
          ret.push(Object.assign(data[i], obj))
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
    components: {
      MHeader,
      Scroll,
      Tab,
      Loading
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
  .product-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    .product
      position: absolute
      top: 44px
      right: 0
      bottom: 50px
      left: 0
      .product-scroll
        width: 100%
        height: 100%
        overflow: hidden
        .product-grounp
          padding-top: 5px
          .banner
            padding-top: 13%
            bg-image('bank')
            background-size: 100%
          .product-list
            padding-bottom: 1px
            .product-item
              margin-bottom: 5px
              padding: 20px 20px 15px 20px
              background-color: $color-text
              &:last-child
                margin-bottom: 4px
              .name
                position: relative
                padding-right: 60px
                line-height: 22px
                height: 22px
                color: $color-tle
                font-size: 12px
                .label
                  display: block
                  position: absolute
                  right: 0
                  top: 5px
                  line-height: 24px
                  width: 100px
                  font-size: $font-size-medium-x
                  text-align: center
                  bg-image('table')
                  background-size: 100% 100%
                  color: $color-text
                  transform: scale(0.5)
                  transform-origin: 100% 0
                  &.activity-over
                    bg-image('c-table')
              .item-info
                display: flex
                .txt
                  line-height: 42px
                  color: $color-q
                  font-size: $font-size-small
                .rate-info
                  flex: 1
                  .rate-desc
                    padding-top: 5px
                    color: $color-theme
                    font-size: 36px
                    .muti
                      font-size: $font-size-medium
                .loan-info
                  width: 60px
                  flex: 0 0 60px
                  font-size: 0
                  .loan-desc
                    padding-top: 20px
                    line-height: 16px
                    color: $color-tle
                    font-size: $font-size-medium
                    .month
                      display: inline-block
                      font-size: $font-size-medium-x
                .surplus-info
                  flex: 1
                  text-align: right
                  .detail-btn
                    display: inline-block
                    margin-top: 13px
                    margin-right: -5px
                    width: 75px
                    height: 30px
                    background-color: $btn-clo
                    line-height: 30px
                    text-align: center
                    color: $color-text
                    font-size: $font-size-medium
                    border-radius: 15px
                    &.not-click
                      background-color: $not-c
</style>
