<template>
  <div class="change-ip-wrapper">
    <m-header class="change-ip-mh" :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="setUserInfo"></m-header>
    <div class="set-work-list">
      <div class="work-item border-1px-b">
        <span class="service-name">手机号码</span>
        <span class="service-info">
          <span class="seio-txt" v-html="userIp"></span>
        </span>
      </div>
      <div class="work-item border-1px-b bbn nmgr" @click="getCode">
        <span class="service-name">更改绑定手机号码</span>
        <span class="service-info">
          <span class="seio-txt hasIcon"></span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'

  export default {
    data() {
      return {
        titleTxt: '绑定手机号码',
        isShow: false,
        opcity: 1,
        userIp: '',
        codeInp: ''
      }
    },
    methods: {
      getCode () {
        this.$router.push({
          path: '/change-ip/step2'
        })
      },
      setUserInfo (res) {
        this.userIp = `${res.mobile.substr(0, 3)}****${res.mobile.substr(res.mobile.length - 4, 4)}`
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .change-ip-wrapper
    position: relative
    padding-top: 44px
    .change-ip-mh 
      position: absolute!important
      left: 0
      top: 0
      width: 100%
    .change-ip-btn
      display: flex
      align-items: center
      justify-content: center
      margin: 30px auto
      line-height: 44px
      width: 90%
      background-color: #ff4e49
      text-align: center
      border-radius: 22px
      box-shadow: 0px 5px 5px -6px #ccc
      .change-ip-btn-txt
        display: block
        padding-left: 2px
        letter-spacing: 2px
        color: #fff
        font-size: 18px
    .set-work-list
      margin: 10px auto
      width: 90%
      border-radius: 10px
      box-shadow: 0px 5px 5px -6px #ccc
      background-color: #FFF
      .work-item
        margin: 0 10px
        line-height: 44px
        height: 44px
        background-color: $color-text
        font-size: $font-size-medium
        border-1px-b(#f5f5f5)
        &.bbn
          border-1px-b(#fff)
        &.nmgr
          .service-info
            margin-right: -5px
        .service-name
          font-size: 12px
          color: #646464;
        .service-info
          float: right
          .seio-txt
            font-size: 12px
            color: #646464;
            &.hasIcon
              padding-right: 15px
              background-position: right center
              background-size: 15px 15px
              bg-image('mr')
</style>
