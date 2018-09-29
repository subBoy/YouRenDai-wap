<template>
  <div class="platform-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap"></m-header>
    <scroll class="platform-group" ref="platformScroll" :style="positionTop">
      <div class="platform-content">
        <div class="platform-banner">
          <img src="./app-platform.jpg" @load="refresh" width="100%">
        </div>
        <div class="plat-cont">
          <div class="plat-first bg-fff">
            <img src="./title-2.png" width="35%" />
            <img src="./pic-2.png" class="plat-tit" @load="refresh" width="100%" />
            <p class="plat-p1 padd-top">有人贷首创“PCC模式”，与商会（Commerce）开展战略合作，由工商联推荐优质借款企业，从而在源头把控资产质量和信用风险，上线至今，如约兑付。</p>
          </div>
          <div class="plat-sec-box">
            <div class="plat-first">
              <img src="./title-3.png" width="35%" />
              <h3 class="plat-h3">银行级风控层层守卫</h3>
              <p class="plat-p1">有人贷引入银行级风控，严密的风控体系层层把关，有效保障借款项目的真实性和优质性。</p>
              <img src="./pic-3.png" class="plat-tit" @load="refresh" width="100%" />
            </div>
            <img src="./pic-4.png" @load="refresh" width="100%" />
          </div>
          <div class="plat-first bg-fff">
            <img src="./pic-5.png" class="plat-tit" @load="refresh" width="80%" />
            <h3 class="plat-h3 plats-h3">提高大数据应用能力 摸索智能量化风控体系</h3>
            <p class="plat-p1">有人贷一直关注和提升自身数据应用能力，持续探索大数据风控，通过与大数据机构和专业风控机构的合作，不断建设智能量化风控模型和体系，为出借人提供更为安全的出借环境。</p>
          </div>
          <div class="plat-sec-box">
            <div class="plat-first">
              <img src="./title-4.png" width="35%" />
              <img src="./pic-6.png" class="plat-tit" @load="refresh" width="100%" />
              <p class="plat-p1 padd-top">有人贷已与新网银行签订《资金存管服务协议》，已全面完成上线对接，实现了用户资金和平台自有资金的物理分离和分账管理。</p>
            </div>
          </div>
          <div class="plat-five bg-fff">
            <img src="./title-5.png" width="60%" />
            <div class="plat-five-cont">
              <ul class="palt-ul">
                <li>
                  <img src="./icon-1.png" width="30%">
                  <p class="plat-ul-p1">CFCA安全认证为平台用户</p>
                  <p class="plat-ul-p1 plat-ul-p2">提供高安全级别的电子签章作为保障</p>
                </li>
                <li>
                  <img src="./icon-2.png" width="30%">
                  <p class="plat-ul-p1">银行级安全防护架构</p>
                  <p class="plat-ul-p1 plat-ul-p2">冗余灾备设计保证系统稳定可靠</p>
                </li>
              </ul>
              <ul class="palt-ul">
                <li>
                  <img src="./icon-3.png" width="30%">
                  <p class="plat-ul-p1">采用先进的SSL EV服务器证书</p>
                  <p class="plat-ul-p1 plat-ul-p2">加密传输数据，确保网络传输安全</p>
                </li>
                <li>
                  <img src="./icon-4.png" width="30%">
                  <p class="plat-ul-p1">采取多重多维度的隐私</p>
                  <p class="plat-ul-p1 plat-ul-p2">保护机制严格保护用户的隐私信息</p>
                </li>
              </ul>
              <ul class="palt-ul">
                <li>
                  <img src="./icon-5.png" width="30%">
                  <p class="plat-ul-p1">多重技术手段实现数据</p>
                  <p class="plat-ul-p1 plat-ul-p2">存储和访问隔离采用先进的通信、</p>
                  <p class="plat-ul-p1 plat-ul-p2">数据加密技术确保信息安全</p>
                </li>
                <li>
                  <img src="./icon-6.png" width="30%">
                  <p class="plat-ul-p1">业界最先进的软件体系</p>
                  <p class="plat-ul-p1 plat-ul-p2">架构设计，确保业务平台的高性能、</p>
                  <p class="plat-ul-p1 plat-ul-p2">高可用性、高扩展性</p>
                </li>
              </ul>
              <div class="palt-add-wrapper">
                <img class="palt-add-icon" src="./icon-7.png" width="15%">
                <p class="palt-add-txt">可信时间戳是由联合信任时间戳服务中心（TSA：Time Stamp Authority）颁发的具有法律效力的电子凭证, 时间戳与电子数据唯一对应。</p>
                <p class="palt-add-txt">有人贷平台通过可信时间戳与电子签名技术相结合，对电子合同内容、时间及签署人等信息进行固化，使电子凭证具有法律效力，不可被篡改和伪造，让出借者在平台交易的同时，通过网络签订具有法律效力的电子合同，更有效保障平台出借者的合法权益。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="platform-banner">
          <img src="./app-platform-bot.jpg" @load="refresh" width="100%">
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
        titleTxt: '了解平台',
        isWap: false,
        positionTop: 'top: 0px'
      }
    },
    created () {
      const pathVal = this.$route.path
      if (pathVal.indexOf('app') >= 0) {
        this.isWap = false
        this.positionTop = 'top: 0px'
      } else {
        this.positionTop = 'top: 44px'
        this.isWap = true
      }
    },
    methods: {
      refresh() {
        this.$refs.platformScroll.refresh()
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" stylesheet="type/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .platform-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .bg-fff
      background-color: $color-text
    .platform-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .plat-cont
        position: relative
      .plat-first
        padding: 25px 30px
      .plat-first img
        margin: 0 auto
      .plat-tit
        padding-top: 20px
      .plat-p1
        font-size: 10px
        color: #666666
        line-height: 18px
        &.padd-top
          padding-top: 20px
      .plat-p2
        font-size: 11px
        color: #333
        text-align: center
        padding-top: 15px
      .plat-p3
        font-size: 15px
        padding: 10px 0 22px
        color: #333
        font-weight: 600
        text-align: center
      .plat-p4
        font-size: 10px
        color: #666
        position: relative
        padding-left: 10px
        line-height: 18px
      .plat-p4 em
        width: 5px
        height: 5px
        background: #ff7049
        border-radius: 100px
        position: absolute
        left: 0
        top: 5px
      .plat-h3
        font-size: 12px
        color: #333333
        padding: 25px 0 8px
      .plat-sec
        padding-bottom: 0
      .plats-h3
        font-size: 12px
      .plat-five
        overflow: hidden
      .plat-five img
        padding: 25px 0
        margin:  0 auto
      .palt-ul
        display: flex
      .palt-ul li
        flex: 1
      .plat-ul-p1
        padding: 0 5px
        line-height: 18px
        font-size: 10px
        color: #666
        text-align: center
      .plat-five-cont
        padding-bottom: 25px
      .palt-add-wrapper
        .palt-add-icon
          margin: 0 auto
        .palt-add-txt
          padding: 0 20px
          line-height: 18px
          font-size: 10px
          color: #666
</style>
