<template>
  <div class="packs-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="packs-number">
      <span class="name">累计优惠券</span>
      <span class="number">50</span>
    </div>
    <div class="null-packs" v-if="!packsList.length">
      <p class="desc">暂无记录</p>
      <p class="desc">先进行投资体验吧</p>
      <div class="invest-btn">立即投标</div>
    </div>
    <div class="packs-group" v-else>
      <scroll
        class="packs-scroll"
        :data="packsList"
        :pullup="pullup"
        @scrollToEnd="loadMore"
      >
        <ul class="packs-list">
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
          <li class="paxks-item" :class="{back: packsSort}">
            <div class="icon">
              <span class="name">返现券</span>
              <span class="use-btn"><a class="use-btn-txt">立即使用</a></span>
            </div>
            <div class="info-desc">
              <div class="text">
                <p class="name ellipsis">100元现金券</p>
                <p class="term ellipsis">(投资含10,000元及以上使用)</p>
                <p class="time ellipsis">过期时间: 2017-3-11 18:19:05</p>
                <p class="state ellipsis">是否已使用: <span :class="{desc: !isUseed}">否</span></p>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        titleTxt: '我的礼包',
        isShow: false,
        opcity: 1,
        pullup: true,
        packsSort: true,
        isUseed: false,
        packsList: [{
          name: '测试'
        }]
      }
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

  .packs-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .packs-number
      margin: 5px 0
      padding: 0 20px
      line-height: 42px
      background-color: $color-text
      font-size: $font-size-small
      color: $color-tle
      overflow: hidden
      .name
        display: block
        float: left
      .number
        display: block
        float: right
    .null-packs
      padding: 16px 0 20px
      background-color: $color-text
      .desc
        line-height: 20px
        font-size: $font-size-small
        text-align: center
        color: #c8c8c8
      .invest-btn
        margin: 16px auto 0
        line-height: 30px
        width: 100px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
        border-radius: 15px
        background-color: $btn-clo
    .packs-group
      position: absolute
      top: 96px
      right: 0
      bottom: 0
      left: 0
      .packs-scroll
        height: 100%
        overflow: hidden
        .packs-list
          margin: 0 20px
          padding-bottom: 5px
          .paxks-item
            position: relative
            margin-bottom: 5px
            padding-left: 116px
            bg-image('cash')
            background-size: auto 100%
            height: 110px
            &.back
              bg-image('cash-back')
            .icon
              position: absolute
              left: 0
              top: 0
              width: 96px
              height: 100%
              text-align: center
              .name
                display: block
                line-height: 20px
                padding: 26px 0
                font-size: $font-size-medium-x
                color: $color-text
                font-weight: bold
              .use-btn
                position: relative
                display: block
                margin: 0 auto
                line-height: 20px
                width: 70%
                height: 20px
                border: 1px solid $color-text
                .use-btn-txt
                  display: block
                  position: absolute
                  width: 100%
                  top: 50%
                  transform: translateY(-50%)
                  color: $color-text
                  font-size: $font-size-small-s
            .info-desc
              background-color: $color-text
              .text
                padding: 12px 10px 12px 0
                line-height: 22px
                font-size: $font-size-small
                .name
                  font-size: $font-size-medium
                  color: $color-tle
                  font-weight: bold
                .term
                  color: $color-tle
                .time
                  color: $color-q
                .state
                  color: $color-q
                  .desc
                    color: $color-tle

</style>
