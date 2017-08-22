<template>
  <div class="invest-record-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="banner" ref="banner"></div>
    <div class="record-wrapper" ref="recordWrapper">
      <div class="no-record-wrapper" v-if="!recordList.length">
        <p class="desc">暂无记录</p>
        <p class="desc">先进行投资体验吧</p>
        <div class="invest-btn">立即投标</div>
      </div>
      <div class="record-grounp" v-if="recordList.length">
        <scroll
          class="record-scroll"
          :data="recordList"
          :pullup="pullup"
          @scrollToEnd="loadMore"
        >
          <ul class="record-list">
            <li class="record-item border-1px">
              <p class="info">产品名称<span class="text">安心宝AXB1512270</span></p>
              <p class="info">投资时间<span class="text">2015-11-25 22:00:00</span></p>
              <p class="info">投资金额<span class="text">￥100.00</span></p>
              <p class="info styl">预期收益<span class="text">￥10.00</span></p>
              <p class="info">状态<span class="text">已回款</span></p>
            </li>
            <li class="record-item border-1px">
              <p class="info">产品名称<span class="text">安心宝AXB1512270</span></p>
              <p class="info">投资时间<span class="text">2015-11-25 22:00:00</span></p>
              <p class="info">投资金额<span class="text">￥100.00</span></p>
              <p class="info styl">预期收益<span class="text">￥10.00</span></p>
              <p class="info">状态<span class="text">已回款</span></p>
            </li>
            <li class="record-item border-1px">
              <p class="info">产品名称<span class="text">安心宝AXB1512270</span></p>
              <p class="info">投资时间<span class="text">2015-11-25 22:00:00</span></p>
              <p class="info">投资金额<span class="text">￥100.00</span></p>
              <p class="info styl">预期收益<span class="text">￥10.00</span></p>
              <p class="info">状态<span class="text">已回款</span></p>
            </li>
            <li class="record-item border-1px">
              <p class="info">产品名称<span class="text">安心宝AXB1512270</span></p>
              <p class="info">投资时间<span class="text">2015-11-25 22:00:00</span></p>
              <p class="info">投资金额<span class="text">￥100.00</span></p>
              <p class="info styl">预期收益<span class="text">￥10.00</span></p>
              <p class="info">状态<span class="text">已回款</span></p>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        titleTxt: '投资记录',
        isShow: false,
        opcity: 1,
        pullup: true,
        hasMore: true,
        page: 1,
        recordList: [{
          name: 0
        }]
      }
    },
    mounted () {
      const bottom = this.$refs.banner.clientHeight + 44
      this.$refs.recordWrapper.style.top = `${bottom}px`
    },
    methods: {
      loadMore () {

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
