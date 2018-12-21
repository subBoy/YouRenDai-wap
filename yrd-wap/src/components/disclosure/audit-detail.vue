<template>
  <div class="audit-detail-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll
      class="audit-detail-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
      :style="positionTop1"
    >
      <div class="audit-detail-ct">
        <div class="scroll-group">
          <div class="audit-detail-list">
            <div class="audit-detail-item" v-for="item in auditData.imgArr">
              <img :src="item" class="audit-detail-ct-img" @load="refresh" width="90%">
            </div>
          </div>
          <div class="disclosure-hr"></div>
          <div class="disclosure-boos-qm">法定代表人签名：</div>
          <div class="disclosure-pm"></div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {getAuditItem} from 'common/js/cache'

  export default {
    props: {
      isWap: {
        type: Boolean,
        default: false
      },
      auditItem: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        titleTxt: '',
        isShow: false,
        opcity: 1,
        disclist: [],
        listenScroll: true,
        probeType: 3,
        positionTop1: 'top: 44px',
        auditData: {}
      }
    },
    created () {
      if (!this.isWap) {
        this.positionTop1 = 'top: 0px'
      } else {
        this.positionTop1 = 'top: 44px'
      }
      if (!this.auditItem || !this.auditItem.ItemName) {
        const _auauditData = getAuditItem()
        this.auditData = JSON.parse(_auauditData)
        this.titleTxt = this.auditData.ItemName
        return
      }
      this.auditData = this.auditItem
      this.titleTxt = this.auditItem.ItemName
    },
    activated () {
      this.refresh()
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.$refs.setScroll.refresh()
        }, 20)
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

  .audit-detail-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .disclosure-pm
      width: 100%
      height: 20px
    .disclosure-hr
      width: 100%
      height: 1px
      background-color: #f0f0f0
    .disclosure-boos-qm
      display: flex
      align-items: center
      justify-content: flex-end
      margin: 20px 20px 0
      padding-right: 90px
      height: 36px
      background-position: right center 
      background-repeat: no-repeat
      background-size: 65px auto 
      background-image: url(./qm.png)
      font-size: 12px
    .audit-detail-group
      position: absolute
      top: 60px
      right: 0
      bottom: 0
      left: 0
      .audit-detail-ct
        padding: 20px 0
        .audit-detail-banner
          margin-bottom: 20px
        .scroll-group
          margin: 0 auto
          width: 90%
          background-color: #fff
          border-radius: 15px
          box-shadow: 0px 0px 10px -2px #ccc
          .audit-detail-list
            padding: 15px 0
            .audit-detail-ct-img
              margin: 0 auto
              padding: 15px 0
</style>
