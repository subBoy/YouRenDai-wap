<template>
  <div class="bill-list-wrapper" @touchmove.prevent>
    <news
      :billLength="billLength"
      :titleTxt="titleTxt"
      :hasMore="hasMore"
      :newsListArr="billListArr"
      @readAllNews="readAllNews"
      @selected="selected"
      @newsList="billList"
      @loadMore="loadMore"
    ></news>
    <div class="bill-air-wrapper" v-if="!billLength">
      <div class="air-bill-details">
        <div class="air-ic"></div>
        <p class="text">每月26日为账单日</p>
        <p class="text">发放上个月27日-当月26日账户账单</p>
      </div>
    </div>
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import News from 'base/news/news'
  import TopTip from 'base/top-tip/top-tip'
  import {getBillList, readAllBill} from 'api/user'
  import {setMessageId, setCreateDate} from 'common/js/cache'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '账单信息',
        page: 1,
        rows: 10,
        hasMore: true,
        billListArr: [],
        caveatText: ''
      }
    },
    computed: {
      billLength () {
        if (this.billListArr.length && this.billListArr.length > 0) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      readAllNews () {
        readAllBill(this.changeLoginState).then((res) => {
          if (res.ret_code !== '1') {
            this.caveatText = res.ret_msg
            this.$refs.topTip.show()
          }
        })
      },
      selected (item) {
        setMessageId(item.message_id)
        setCreateDate(item.create_date)
        this.$router.push({
          path: `/bill-details`
        })
      },
      billList () {
        this.page = 1
        this.hasMore = true
        getBillList(this.changeLoginState, this.page, this.rows).then((res) => {
          if (res.ret_code === '1') {
            this.billListArr = res.ret_set
            this._checkMore(res)
          }
        })
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }

        this.page++
        getBillList(this.changeLoginState, this.page, this.rows).then((res) => {
          if (res.ret_code === '1') {
            this.billListArr = this.billListArr.concat(res.ret_set)
            this._checkMore(res)
          }
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
      News,
      TopTip
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
  .bill-list-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .bill-air-wrapper
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      .air-bill-details
        position: absolute
        top: 49px
        right: 0
        bottom: 0
        left: 0
        background-color: $color-text
        .air-ic
          height: 115px
          bg-image('air')
          background-size: auto 55px
          background-repeat: no-repeat
          background-position: center
        .text
          line-height: 24px
          font-size: $font-size-medium
          color: $color-q
          text-align: center
</style>
