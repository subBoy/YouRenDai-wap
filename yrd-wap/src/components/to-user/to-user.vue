<template>
  <div class="to-user-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="to-user-scroll">
      <div class="to-user-bg">
        <div class="to-user-group">
          <div class="to-user-content">
            <p class="txt">Dear,</p>
            <p class="txt indent">春风拂面，绿草依依，柳絮纷飞，四月，正是大地回春，鲜花初绽的美好季节。人间四月天，一树树的花开，随风摇曳，轻舞旋律，纷纷扬扬飘落的花瓣，绽放着美丽，流光溢彩，馨香满怀，明媚了岁月，芬芳了生命，带来了美好。</p>
            <p class="txt indent">弹指一挥间，有人贷成立将近4周年，感谢您一直以来对有人贷的信任和支持。在过去的日子里，不知道您对我的服务是否满意，但我从内心深处希望您拥有快乐。让客户快乐，就是让客户对产品产生值得拥有的快感，和真正拥有产品后的快乐。</p>
            <p class="txt indent">感恩支持、信任我的您，是您的信任与关爱引领着我走向一个又一个的辉煌！是您对我的支持、热情、信赖，给了我前进的信心和勇气，成就了如今的有人贷！</p>
            <p class="txt indent styl">目前，新鲜出炉的有人贷APP最新版本（Android v3.0.8、IOS v2.2.8），已在APP Store以及安卓应用平台上线了！</p>
            <p class="txt indent">在产品功能上，您可设置项目上线提醒，不错过任何一次赚钱的机会；随时随地查询余额变化，及时掌握资金实时动态；出借收益直观统计，更好地了解收益变化趋势，合理安排资金。</p>
            <p class="txt indent styl">更推出双重好礼，等您来拿！</p>
            <p class="txt indent">一重礼：注册即赠送1888元现金红包（仅适用于新用户）</p>
            <p class="txt indent">二重礼：邀请好友，即可瓜分万元现金</p>
            <p class="txt indent styl">活动详情，请在有人贷官网（www.yourendai.com）查看。</p>
            <p class="txt indent">在今后的岁月里，有人贷希望能够继续得到您的信任关心与支持。欢迎您向我们提出建议和批评，我们将以诚心、诚信、真诚和热情为每一位用户服务。</p>
            <div class="signature">
              <span class="signature-txt">有人贷团队<br/>2017年4月14日</span>
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
        titleTxt: '致用户的一封信'
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

  .to-user-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .to-user-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .to-user-bg
        padding-top: 5px
        .to-user-group
          padding: 20px 0
          background-image: url(nl-bg.jpg)
          background-repeat: no-repeat
          background-size: 100% 100%
          .to-user-content
            padding: 20px 20px 30px
            margin: 0 20px
            background-image: url(yp-ic.png)
            background-repeat: no-repeat
            background-size: 107px 80px
            background-position: top right
            .txt
              line-height: 22px
              font-size: $font-size-small
              color: #666
              &.indent
                text-indent: 2em
              &.styl
                color: $btn-clo
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
