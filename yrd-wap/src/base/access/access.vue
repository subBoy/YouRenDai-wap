<template>
  <div class="access-wrapper">
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <scroll class="access-scroll" ref="accessScroll">
      <div class="access-group">
        <div class="access-input">
          <div class="access-input-box">
            <span class="title">{{accessTitle}}</span>
            <div class="input-box">
              <div class="input-box-wrapper">
                <input class="access-input-sum" type="tel" v-model="sum" maxLength="19">
                <p class="desc">￥<span class="desc-sum">{{sum}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <slot name="recharge"></slot>
        <div class="access-record-wrapper">
          <div class="access-record-group">
            <div class="access-record-title border-1px-b">{{recordTitle}}</div>
            <!-- 无记录状态 -->
            <div class="access-record-air">
              <p class="desc">暂无记录</p>
              <p class="desc">{{airTxt}}</p>
              <div class="btn">{{airBtnTxt}}</div>
            </div>
            <slot name="record-list"></slot>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import TopTip from 'base/top-tip/top-tip'

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
      }
    },
    data() {
      return {
        sum: 5000
      }
    },
    created() {
      this.$emit('getSum', this.sum)
    },
    methods: {
      caveat() {
        this.$refs.topTip.show()
      },
      refresh() {
        this.$refs.accessScroll.refresh()
      }
    },
    watch: {
      sum(newVal) {
        this.$emit('getSum', newVal)
      }
    },
    components: {
      Scroll,
      TopTip
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
    .access-scroll
      width: 100%;
      height: 100%;
      overflow: hidden
      .access-group
        margin-top: 5px
        .access-input
          padding: 20px
          background-color: $color-text
          .access-input-box
            display: flex
            .title
              flex: 0 0 76px
              width: 76px
              line-height: 30px
              font-size: $font-size-medium
            .input-box
              flex: 1
              background-color: $color-background
              padding: 0 10px
              overflow: hidden
              .input-box-wrapper
                position: relative
                .access-input-sum
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  // line-height: 30px
                  height: 30px
                  text-align: right
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
                  text-align: right
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
                line-height: 16px
                font-size: $font-size-small
                color: $color-q
              .btn
                margin: 16px auto 0
                line-height: 30px
                width: 100px
                background-color: $btn-clo
                color: $color-text
                font-size: $font-size-medium-x
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
                    color: $color-q
                  .text
                    flex: 1
                    line-height: 34px
                    font-size: $font-size-medium
                    color: $color-q
                    text-align: right
                    &.styl
                      color: $color-tle
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
