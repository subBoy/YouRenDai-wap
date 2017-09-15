<template>
  <div class="news-details-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="news-details-group">
      <div class="news-details-content">
        <div class="details-content-wrapper">
          <h3 class="news-title border-1px-b">关于加入密码设置通知</h3>
          <div class="txt-box">
            <p class="txt indent">弹指一挥间，有人贷成立将近4周年，感谢您一直以来对有人贷的信任和支持。在过去的日子里，不知道您对我的服务是否满意，但我从内心深处希望您拥有快乐。让客户快乐，就是让客户对产品产生值得拥有的快感，和真正拥有产品后的快乐。</p>
            <p class="txt indent">在今后的岁月里，有人贷希望能够继续得到您的信任关心与支持。欢迎您向我们提出建议和批评，我们将以诚心、诚信、真诚和热情为每一位用户服务。</p>
            <div class="signature">
              <span class="signature-txt">有人贷团队<br/>2017年3月30日</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '消息详情'
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .news-details-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .news-details-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .news-details-content
        padding-top: 5px
        .details-content-wrapper
          padding: 0 20px
          background-color: $color-text
          .news-title
            line-height: 60px
            font-size: $font-size-medium-x
            color: $color-tle
            text-align: center
            border-1px-b(#f5f5f5)
          .txt-box
            padding-top: 12px
            .txt
              line-height: 22px
              font-size: $font-size-small
              color: #666
              &.indent
                text-indent: 2em
            .signature
                padding: 12px 0
                overflow: hidden
                .signature-txt
                  display: inline-block
                  float: right
                  line-height: 22px
                  font-size: 10px
                  color: #666
                  text-align: center
</style>
