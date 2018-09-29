<template>
  <div class="invest-record-wrapper" @touchmove.prevent>
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
          <div class="record-scroll-ct">
            <ul class="record-list">
              <li class="record-item border-1px" v-for="item in recordList">
                <p class="info"><span class="name">产品名称</span><span class="text">{{item.project_name}}</span></p>
                <p class="info"><span class="name">出借时间</span><span class="text">{{item.create_date}}</span></p>
                <p class="info"><span class="name">出借金额</span><span class="text">{{item.invest_money}}元</span></p>
                <p class="info"><span class="name">历史参考年化回报</span><span class="text">{{item.earnings}}</span></p>
                <p class="info"><span class="name">回款方式</span><span class="text">{{item.repayment_types}}</span></p>
                <p class="info"><span class="name">状态</span><span class="text">{{item.code}}</span></p>
                <div class="record-list-btn" @click="goToDetails(item.project_id)">查看详情</div>
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
      goToDetails (id) {
        this.$router.push({
          path: `/subscribe/${id}`
        })
      },
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
      padding-top: 20%
      bg-image('br')
      background-size: 90% auto
      background-position: center
    .record-wrapper
      position: absolute
      right: 0
      bottom: 0
      left: 0
      .no-record-wrapper
        margin: 0 auto
        width: 90%
        border-radius: 10px
        box-shadow: 0px 5px 5px -6px #ccc
        background-color: $color-text
        padding: 20px 0
        text-align: center
        .desc
          color: #c8c8c8
          line-height: 20px
          font-size: 14px
        .invest-btn
          margin: 11px auto
          padding-left: 2px
          line-height: 32px
          width: 50%
          height: 32px
          background-color: #ff4e49
          letter-spacing: 2px
          color: #fff
          border-radius: 16px
          text-align: center
          font-size: 14px
          box-shadow: 0px 5px 5px -6px #ccc
      .record-grounp
        width: 100%
        height: 100%
        .record-scroll
          width: 100%
          height: 100%
          overflow: hidden
          .record-scroll-ct {
            padding-bottom: 20px
          }
          .record-list
            margin: 0 auto
            width: 90%
            border-radius: 10px
            box-shadow: 0px 5px 5px -6px #ccc
            background-color: $color-text
            .record-item
              padding: 10px 20px
              border-1px(#f5f5f5)
              &:first-child
                &:after
                  border: none
              .info
                display: flex
                line-height: 34px
                font-size: 12px
                color: #323232
                .text
                  flex: 1
                  display: flex
                  align-items: center
                  justify-content: flex-end
                  color: #c8c8c8
                  font-size: 10px
              .record-list-btn
                margin: 11px auto
                padding-left: 2px
                line-height: 32px
                width: 50%
                height: 32px
                background-color: #ff4e49
                letter-spacing: 2px
                color: #fff
                border-radius: 16px
                text-align: center
                font-size: 14px
                box-shadow: 0px 5px 5px -6px #ccc
</style>
