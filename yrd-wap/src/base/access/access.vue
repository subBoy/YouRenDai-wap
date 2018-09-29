<template>
  <div class="access-wrapper">
    <top-tip ref="topTip">
      <p class="caveatText" v-html="caveatText"></p>
    </top-tip>
    <scroll class="access-scroll" ref="accessScroll"
      :data="accessList"
      :pullup="pullup"
      @scrollToEnd="startLoad"
    >
      <div class="access-group">
        <div class="access-group-ctr">
          <slot name="recharge-tle"></slot>
          <div class="access-input">
            <div class="access-input-box border-1px-b" :class="{'is-with': isWith}">
              <span class="title">{{accessTitle}}</span>
              <div class="input-box">
                <div class="input-box-wrapper">
                  <input class="access-input-sum" type="tel" v-model="sum" maxLength="19" @keyup="check" :placeholder="descTxt">
                </div>
                <span class="withdraw-rule-btn" v-if="isWith" @click="lookRule">提现规则</span>
              </div>
            </div>
          </div>
          <slot name="recharge-code"></slot>
        </div>
        <div class="access-group-ctr">
          <slot name="recharge"></slot>
          <slot name="recharge-pay-type"></slot>
        </div>
        <div class="access-group-ctr">
          <div class="access-record-wrapper">
            <div class="access-record-group">
              <div class="access-record-title border-1px-b">{{recordTitle}}</div>
              <!-- 无记录状态 -->
              <div class="access-record-air" v-show="!accessList.length || accessList.length === 0">
                <p class="desc">暂无记录</p>
                <p class="desc">{{airTxt}}</p>
                <div class="btn" @click="airRecord">{{airBtnTxt}}</div>
              </div>
              <slot name="record-list"></slot>
            </div>
          </div>
        </div>
        <loading :title="loadTitle" v-show="hasMore"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import TopTip from 'base/top-tip/top-tip'
  import Loading from 'base/loading/loading'

  export default {
    props: {
      accessTitle: {
        type: String,
        default: ''
      },
      caveatText: {
        type: String,
        default: ''
      },
      recordTitle: {
        type: String,
        default: ''
      },
      airTxt: {
        type: String,
        default: ''
      },
      btnTxt: {
        type: String,
        default: ''
      },
      airBtnTxt: {
        type: String,
        default: ''
      },
      descTxt: {
        type: String,
        default: ''
      },
      accessList: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      isWith: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        sum: null,
        pullup: true,
        loadTitle: '正在加载更多...'
      }
    },
    created () {
      this.$emit('getSum', this.sum)
    },
    methods: {
      caveat () {
        this.$refs.topTip.show()
      },
      refresh () {
        this.$refs.accessScroll.refresh()
      },
      startLoad () {
        this.$emit('loadMore')
      },
      lookRule () {
        this.$emit('lookWithRule')
      },
      check () {
        this.sum = this.sum.replace(/[^\d.]/g, '')
        this.sum = this.sum.replace(/^\./g, '')
        this.sum = this.sum.replace(/\.{2,}/g, '.')
        this.sum = this.sum.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      },
      airRecord () {
        this.$emit('airBtnMethod')
      }
    },
    watch: {
      sum (newVal) {
        this.$emit('getSum', newVal)
      }
    },
    components: {
      Scroll,
      TopTip,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .access-wrapper
    position: absolute
    top: 44px
    right: 0
    bottom: 84px
    left: 0
    .caveatText
      padding: 10px 15px
      line-height: 16px
      font-size: 12px
      color: #fff
    .access-scroll
      width: 100%;
      height: 100%;
      overflow: hidden
      .access-group
        padding: 5px 0
        .access-group-ctr
          margin: 5px auto
          width: 90%
          background-color: #FFF
          border-radius: 15px
          box-shadow: 0px 5px 5px -6px #ccc
          overflow: hidden
        .access-input
          padding: 20px
          background-color: $color-text
          .access-input-box
            display: flex
            &.is-with
              position: relative
              padding-bottom: 26px
              .withdraw-rule-btn
                display: inline-block
                position: absolute
                bottom: 0
                right: 0
                bg-image('ts')
                padding-left: 15px
                background-position: left center
                background-size: 10px 10px
                background-repeat: no-repeat
                line-height: 26px
                color: #ff4e49
                font-size: 12px
            .title
              flex: 0 0 76px
              width: 76px
              line-height: 30px
              font-size: $font-size-medium
            .recharge-input-code-btn
              flex: 0 0 80px
              width: 80px
              line-height: 30px
              font-size: 12px
              text-align: right
              color: #288cf0
              &.not-click
                color: #999
            .input-box
              flex: 1
              background-color: $color-background
              padding: 0 10px
              overflow: hidden
              border-radius: 5px
              .input-box-wrapper
                position: relative
                .access-input-sum
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  height: 30px
                  z-index: 10
                  outline: none
                  background-color: transparent
                  font-size: $font-size-small
                  color: $color-tle
                .desc
                  line-height: 30px
                  width: 100%
                  font-size: $font-size-small
                  color: $color-tle
                  &.styl-clo
                    color: #c8c8c8;
                  .desc-sum
                    opacity: 0
        .access-record-wrapper
          padding: 5px 0 20px
          .access-record-group
            padding: 0 20px
            background-color: $color-text
            .access-record-title
              line-height: 54px
              font-size: $font-size-medium
              color: $color-tle
              border-1px-b(#f5f5f5)
            .access-record-air
              padding: 16px 0 20px 0
              text-align: center
              .desc
                line-height: 20px
                font-size: $font-size-small
                color: $color-q
              .btn
                margin: 16px auto 0
                padding-left: 2px
                line-height: 30px
                width: 35%
                background-color: $btn-clo
                color: $color-text
                font-size: 14px
                letter-spacing: 2px
                border-radius: 15px
            .access-record-list
              .record-list
                border-1px-b(#f5f5f5)
                padding: 10px 0
                &:last-child
                  &:after
                    border: none
                .record-item
                  display: flex
                  &.border-1px
                    margin-top: 10px
                    border-1px(#f5f5f5)
                  .name
                    flex: 0 0 100px
                    line-height: 34px
                    font-size: $font-size-medium
                    color: #323232
                  .text
                    flex: 1
                    line-height: 34px
                    font-size: $font-size-medium
                    color: $color-q
                    text-align: right
                    &.styl
                      color: #323232
                  .btn
                    flex: 1
                    padding: 10px 0 0
                    line-height: 34px
                    text-align: center
                    color: $btn-clo
                    font-size: $font-size-medium
                    &.styl
                      position: relative
                      color: $color-tle
                      &:after
                        display: block
                        position: absolute
                        right: -0.5px
                        top: 19.5px
                        width: 1px
                        height: 15px
                        background-color: #f5f5f5
                        content: ''
</style>
