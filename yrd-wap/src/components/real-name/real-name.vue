<template>
  <div class="real-name-wrapper" ref="realNameWrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <top-tip ref="topTip">
      <p class="caveatText">{{caveatText}}</p>
    </top-tip>
    <div class="desc-wrapper">
      <p class="title">实名认证 安全保障</p>
      <p class="desc-txt">落实监管新规 保障用户的每一分钱</p>
    </div>
    <div class="content-wrapper">
      <ul class="content-list">
        <li class="content-item border-1px-b">
          <input type="text" class="input-box" placeholder="输入姓名" v-model="nameVal">
        </li>
         <li class="content-item">
          <input type="text" class="input-box" placeholder="身份证号" v-model="codeVal">
        </li>
      </ul>
    </div>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import FootBtn from 'base/foot-btn/foot-btn'
  import TopTip from 'base/top-tip/top-tip'
  import storage from 'good-storage'
  import {setRealName} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        titleTxt: '实名认证',
        isShow: false,
        opcity: 1,
        submitBtnTxt: '确认提交',
        nameVal: '',
        codeVal: '',
        caveatText: '',
        btnShow: true
      }
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    mounted () {
      setTimeout(() => {
        this.$refs.realNameWrapper.style.height = document.documentElement.clientHeight + 'px'
      }, 20)
    },
    methods: {
      submitFuc() {
        const reg = /^[\u4e00-\u9fa5]+$/gi

        const reg2 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

        if (!this.nameVal || this.nameVal === '') {
          this.caveatText = '真实姓名不能为空！'
          this.caveat()
          return
        }

        if (!reg.test(this.nameVal)) {
          this.caveatText = '请输入中文名字！'
          this.caveat()
          return
        }

        if (this.nameVal.length < 2 || this.nameVal.length > 5) {
          this.caveatText = '请输入正确的姓名（长度2到5个汉字）！'
          this.caveat()
          return
        }

        if (this.codeVal === '') {
          this.caveatText = '身份证号不能为空！'
          this.caveat()
          return
        }

        if (!reg2.test(this.codeVal)) {
          this.caveatText = '身份证号格式错误, 请核对后重新输入！'
          this.caveat()
          return
        }

        this._setRealName()
      },
      caveat() {
        this.$refs.topTip.show()
      },
      _setRealName() {
        setRealName(this.nameVal, this.codeVal, this.changeLoginState).then((res) => {
          console.log(res)
          if (res.ret_code === '0') {
            this.caveatText = res.ret_msg
            this.caveat()
          } else {
            storage.set('SECHARGE', res.form)
            location.href = '/dist/real.html'
          }
        })
      }
    },
    components: {
      MHeader,
      FootBtn,
      TopTip
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
    .caveatText
      padding: 20px
      line-height: 16px
      background-color: $btn-clo
      font-size: 12px
      color: #fff
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
