<template>
  <div class="invest-record-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined" :gobool="gobool"></m-header>
    <div class="banner" ref="banner"></div>
    <div class="record-wrapper" ref="recordWrapper">
      <div class="record-grounp" v-show="recordList.length > 0">
        <scroll
          class="record-scroll"
          :data="recordList"
          :pullup="pullup"
          @scrollToEnd="loadMore"
        >
          <div>
            <ul class="record-list">
              <li class="record-item border-1px" v-for="item in recordList">
                <p class="info">产品名称<span class="text">{{item.project_name}}</span></p>
                <p class="info">出借时间<span class="text">{{item.create_date}}</span></p>
                <p class="info">出借金额<span class="text">￥{{item.invest_money}}</span></p>
                <p class="info styl">历史参考回报<span class="text">￥{{item.earnings}}</span></p>
                <p class="info">状态<span class="text">{{item.code}}</span></p>
              </li>
            </ul>
            <loading :title="loadTitle" v-show="hasMore"></loading>
          </div>
        </scroll>
      </div>
      <div class="no-record-wrapper" v-show="!recordList.length || recordList.length === 0">
        <p class="desc">暂无记录</p>
        <p class="desc">先进行出借体验吧</p>
        <router-link tag="div" class="invest-btn" to="/product-list">立即出借</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getInvestRecord} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '出借记录',
        loadTitle: '正在载入更多...',
        isShow: false,
        opcity: 1,
        userId: '',
        pullup: true,
        hasMore: true,
        gobool: true,
        page: 1,
        rows: 10,
        recordList: []
      }
    },
    mounted () {
      const bottom = this.$refs.banner.clientHeight + 44
      this.$refs.recordWrapper.style.top = `${bottom}px`
    },
    methods: {
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        getInvestRecord(this.userId, this.page, this.rows).then((res) => {
          this.recordList = this.recordList.concat(res.ret_set)
          this._checkMore(res)
        })
      },
      logined (res) {
        this.userId = res.user_Id
        this._getInvestRecord()
      },
      _getInvestRecord () {
        this.page = 1
        this.hasMore = true
        getInvestRecord(this.userId, this.page, this.rows).then((res) => {
          this.recordList = res.ret_set
          this._checkMore(res)
        })
      },
      _checkMore (data) {
        const rows = data.ret_set
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      }
    },
    components: {
      MHeader,
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .invest-record-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .banner
      height: 0
      padding-top: 14%
      bg-image('banner')
      background-size: 100% 100%
      background-position: top center
    .record-wrapper
      position: absolute
      right: 0
      bottom: 0
      left: 0
      .no-record-wrapper
        padding: 18px 0 20px 0
        text-align: center
        background-color: $color-text
        .desc
          color: #c8c8c8
          line-height: 16px
          font-size: $font-size-small
        .invest-btn
          margin: 18px auto 0px
          line-height: 30px
          width: 100px
          height: 30px
          font-size: $font-size-medium-x
          color: $color-text
          background-color: $color-theme
          border-radius: 15px
      .record-grounp
        width: 100%
        height: 100%
        .record-scroll
          width: 100%
          height: 100%
          overflow: hidden
          .record-list
            padding: 0 20px
            background-color: $color-text
            .record-item
              padding: 10px 0
              border-1px(#f5f5f5)
              &:first-child
                &:after
                  border: none
              .info
                line-height: 34px
                font-size: $font-size-medium
                color: #c8c8c8
                &.styl
                  .text
                    color: #646464
              .text
                float: right
</style>
