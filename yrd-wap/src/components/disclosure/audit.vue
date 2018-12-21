<template>
  <div class="audit-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <Scroll
      class="audit-group"
      ref="setScroll"
      :data="disclist"
      :listenScroll="listenScroll"
      :probeType="probeType"
      :style="positionTop1"
    >
      <div class="audit-ct">
        <div class="scroll-group">
          <div class="autit-item-wrapper" v-for="item in disclist" @click="gotoAuditDetail(item)" v-html="item.ItemName"></div>
        </div>
      </div>
    </Scroll>
    <transition name="slide">
      <router-view :isWap="isWap" :auditItem="auditItem"></router-view>
    </transition>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import {setAuditItem} from 'common/js/cache'

  export default {
    props: {
      isWap: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        titleTxt: '财务审计',
        isShow: false,
        opcity: 1,
        disclist: [
          {
            ItemName: '2017年度财务审计报告',
            imgArr: ['/static/img/audit-2017-1.jpg', '/static/img/audit-2017-2.jpg', '/static/img/audit-2017-3.jpg']
          },
          {
            ItemName: '2016年度财务审计报告',
            imgArr: ['/static/img/audit-2016-1.jpg', '/static/img/audit-2016-2.jpg', '/static/img/audit-2016-3.jpg']
          }
        ],
        listenScroll: true,
        probeType: 3,
        positionTop1: 'top: 44px',
        auditItem: {}
      }
    },
    created () {
      if (!this.isWap) {
        this.positionTop1 = 'top: 0px'
      } else {
        this.positionTop1 = 'top: 44px'
      }
    },
    activated () {
      this.refresh()
    },
    methods: {
      gotoAuditDetail (item) {
        this.auditItem = item
        const _item = JSON.stringify(item)
        setAuditItem(_item)
        setTimeout(() => {
          this.$router.push('audit/audit-detail')
        }, 20)
      },
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

  .audit-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .audit-group
      position: absolute
      top: 60px
      right: 0
      bottom: 0
      left: 0
      .audit-ct
        padding: 20px 0
        .scroll-group
          margin: 0 auto
          width: 90%
          .autit-item-wrapper
            padding: 13% 15px 19% 15px
            font-size: 14px
            background-image: url(./audit-bg.png)
            background-size: 100% auto
            background-repeat: no-repeat
            color: #fff
</style>
