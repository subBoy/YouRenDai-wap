<template>
  <div class="packs-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="packs-number">
      <span class="name">累计优惠券</span>
      <span class="number">{{allLen}}</span>
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
        <div>
          <ul class="packs-list">
            <li class="packs-item" v-for="item in packsList" :class="{back: item.rewardTypeName === '返现券'}" @click="selectedItem(item)">
              <div class="icon">
                <span class="name">{{item.rewardTypeName}}</span>
                <span class="use-btn"><a class="use-btn-txt">{{btnTxt(item)}}</a></span>
              </div>
              <div class="info-desc">
                <div class="text">
                  <p class="name ellipsis">{{item.rewardName}}</p>
                  <p class="term ellipsis">({{item.note}})</p>
                  <p class="time ellipsis">过期时间: {{item.recordEnableDate}}</p>
                  <p class="state ellipsis">是否已使用: <span :class="{desc: item.isEnable === '未使用'}">{{item.isEnable}}</span></p>
                </div>
              </div>
            </li>
          </ul>
          <loading :title="loadTitle" v-show="hasMore"></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getPacks} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '我的礼包',
        loadTitle: '正在载入更多...',
        isShow: false,
        opcity: 1,
        pullup: true,
        hasMore: true,
        allLen: 0,
        page: 1,
        rows: 6,
        packsSort: true,
        isUseed: false,
        projectId: '',
        packsList: []
      }
    },
    created () {
      this._getPacks()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        getPacks(this.changeLoginState, this.page, this.rows).then((res) => {
          this.packsList = this.packsList.concat(res.ret_set.jsonArray)
          this._checkMore(res)
        })
      },
      btnTxt(item) {
        if (item.isEnable === '未使用') {
          return '立即使用'
        }
        return item.isEnable
      },
      selectedItem(item) {
        console.log(this.projectId)
        if (this.projectId && this.projectId !== '') {
          this.$router.push({
            path: `/product-list/subscribe/${this.projectId}`
          })
        } else {
          this.$router.push('/signIn')
        }
      },
      _getPacks () {
        this.page = 1
        this.hasMore = true

        getPacks(this.changeLoginState, this.page, this.rows).then((res) => {
          this.allLen = res.ret_set.totle
          this.packsList = res.ret_set.jsonArray
          this.projectId = res.ret_set.projectId
          this._checkMore(res)
          console.log('packs:', res)
        })
      },
      _checkMore (data) {
        const rows = data.ret_set
        if (!rows.jsonArray.length || (rows.jsonArray.length < this.rows)) {
          this.hasMore = false
        }
      }
    },
    components: {
      MHeader,
      Scroll,
      Loading
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
          .packs-item
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
