<template>
  <div class="customer-service-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="customer-service-content border-1px-b">
      <div class="avatar"></div>
      <div class="service-info-grounp">
        <div class="service-info-unbind" v-if="unbind">您还未绑定客服顾问~~</div>
        <div class="service-info-bind" v-if="!unbind">
          <p class="info-item"><span class="name">小哥001</span></p>
          <p class="info-item"><a class="tel" href="tel:137-1107-3101">137-1107-3101</a></p>
        </div>
      </div>
    </div>
    <div class="bind-operate-wrapper" v-if="unbind">
      <div class="bind-operate-input">
        <input class="operate-input" type="tel" v-model="customerNumber">
        <p class="input-desc" :class="errClass" v-show="!customerNumber || customerNumber === ''">填写客服顾问工号或手机号</p>
      </div>
      <div class="bind-operate-btn" @click.stop="bindCustomer">立即绑定</div>
    </div>
    <confirm ref="customerConfirm" @confirm="confirm" :text="text" :confirmBtnText="confirmBtnText" :btnTxt="btnTxt" :operateState="operateState"></confirm>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Confirm from 'base/confirm/confirm'

  export default {
    data() {
      return {
        titleTxt: '客服工号',
        isShow: false,
        opcity: 1,
        unbind: true,
        customerNumber: '',
        errClass: '',
        text: '',
        btnTxt: '',
        confirmBtnText: '',
        operateState: false
      }
    },
    methods: {
      bindCustomer() {
        if (!this.customerNumber || this.customerNumber === '') {
          this._errClass()
          return
        }

        this._bindErr()
        // this._bindOk()
      },
      confirm() {
        if (this.operateState) { // 绑定成功回调
          return
        } else { // 绑定失败回调
          this.bindCustomer()
        }
      },
      _bindOk() {
        this.text = '恭喜您绑定成功！'
        this.confirmBtnText = '关闭'
        this.$refs.customerConfirm.show()
      },
      _bindErr() {
        this.text = '很遗憾本次操作失败！'
        this.confirmBtnText = '继续完成绑定'
        this.btnTxt = '返回上一步'
        this.$refs.customerConfirm.show()
      },
      _errClass() {
        this.errClass = 'err-next'
      }
    },
    components: {
      MHeader,
      Confirm
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .customer-service-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-text
    .customer-service-content
      display: flex
      box-sizing: border-box
      align-items: center
      background-color: $color-text
      border-top: 5px solid $color-background
      border-1px-b($color-background)
      .avatar
        flex: 0 0 103px
        width: 103px
        height: 105px
        bg-image('customer')
        background-size: 51px 49px
        background-position: center right
      .service-info-grounp
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        overflow: hidden
        .service-info-unbind
          text-align: center
          color: #333
          font-size: $font-size-medium
        .service-info-bind
          font-size: $font-size-medium
          .info-item
            margin: 0 auto
            width: 120px
            line-height: 32px
            .name
              display: inline-block
              padding-left: 22px
              color: #333
              bg-image('avatar')
              background-size: 20px 20px
              background-position: center left
            .tel
              display: inline-block
              padding-left: 22px
              color: $color-theme
              bg-image('tel')
              background-size: 20px 20px
              background-position: center left
    .bind-operate-wrapper
      margin: 0 20px
      .bind-operate-input
        position: relative
        margin: 30px 0
        line-height: 40px
        height: 40px
        padding: 0 20px
        background-color: $color-background
        overflow: hidden
        .operate-input
          position: absolute
          left: 20px
          top: 0
          line-height: 40px
          width: 100%
          height: 40px
          outline: none
          font-size: $font-size-medium
          color: $color-tle
          background-color: transparent
          z-index: 10
        .input-desc
          font-size: $font-size-medium
          color: $color-tle
          &.err-next
            color: $color-theme
      .bind-operate-btn
        line-height: 40px
        font-size: $font-size-medium
        text-align: center
        border-radius: 20px
        color: $color-text
        background-color: $btn-clo
</style>
