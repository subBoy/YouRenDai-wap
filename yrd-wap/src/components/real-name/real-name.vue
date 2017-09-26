<template>
  <div class="real-name-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <div class="desc-wrapper">
      <p class="title">实名认证 安全保障</p>
      <p class="desc-txt">落实监管新规 保障用户的每一分钱</p>
    </div>
    <div class="content-wrapper">
      <ul class="content-list">
        <li class="content-item border-1px-b">
          <input type="text" class="input-box" placeholder="输入姓名" @focus="clearNameErr" v-model="nameVal">
          <p class="err-desc">{{nameErr}}</p>
        </li>
         <li class="content-item">
          <input type="text" class="input-box" placeholder="身份证号" @focus="clearCodeErr" v-model="codeVal">
          <p class="err-desc">{{codeErr}}</p>
        </li>
      </ul>
    </div>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import FootBtn from 'base/foot-btn/foot-btn'
  import {setRealName} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '实名认证',
        isShow: false,
        opcity: 1,
        submitBtnTxt: '确认提交',
        nameErr: '',
        codeErr: '',
        nameVal: '',
        codeVal: ''
      }
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      submitFuc() {
        if (this.nameVal === '') {
          this.nameErr = '真实姓名不能为空！'
          return
        }
        if (this.codeVal === '') {
          this.codeErr = '身份证号不能为空！'
          return
        }

        this._setRealName()
      },
      clearNameErr() {
        this.nameErr = ''
      },
      clearCodeErr() {
        this.codeErr = ''
      },
      _setRealName() {
        setRealName(this.nameVal, this.codeVal, this.changeLoginState).then((res) => {
          console.log(res)
        })
      }
    },
    components: {
      MHeader,
      FootBtn
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .real-name-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .desc-wrapper
      padding: 15px 20px
      .title
        line-height: 30px
        font-size: $font-size-large-z
        color: $color-tle
      .desc-txt
        line-height: 22px
        font-size: $font-size-small
        color: $color-tle
    .content-wrapper
      padding: 0 20px
      background-color: $color-text
    .content-list
      .content-item
        position: relative
        padding: 13px 0 10px
        border-1px-b(#f8f8f8)
        .input-box
          position: relative
          line-height: 34px
          width: 100%
          height: 34px
          outline: none
          font-size: $font-size-medium
          background-color: transparent
          color: #ccc
          z-index: 1
        .err-desc
          position: absolute
          top: 50%
          right: 0
          width: 200%
          line-height: 68px
          height: 68px
          font-size: $font-size-large-z
          color: $btn-clo
          text-align: right
          z-index: 0
          transform: translate3d(25%, -50%, 0) scale(0.5)
        &:last-child
          &:after
            border: none
</style>
