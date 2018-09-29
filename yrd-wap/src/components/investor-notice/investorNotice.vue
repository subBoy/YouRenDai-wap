<template>
  <div class="investor-notice-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="investor-notice-scroll" :data="noticeList" ref="investorNoticeScroll">
      <div class="investor-notice-group">
        <div class="notice-list-wrapper">
          <ul class="notice-list" ref="noticeListWrapper">
            <li class="notice-item" v-for="(group, index) in noticeList">
              <h3 class="problem">
                <span class="ic">{{index + 1}}、</span>
                <span class="pr-txt">{{group.problem}}</span>
              </h3>
              <p class="answer" v-for="(item, k) in group.answer" :class="{'selected': item.selectCtrol}" @click="selectItem(group, item, index, k)">
                <span class="an-txt">{{item.txt}}</span>
              </p>
            </li>
          </ul>
          <div class="loading-container" v-show="!noticeList.length">
            <loading></loading>
          </div>
        </div>
        <div class="notice-btn">
          <div class="sumbit-btn" @click="sumbit" v-html="sumbitBtnTxt"></div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getInvestorNotice, submitInvestorNotice} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        opcity: 1,
        titleTxt: '风险测评',
        sumbitBtnTxt: '',
        readed: false,
        qaPaperId: '',
        qaAnsContent: '',
        noticeList: [],
        qaPaperIssue: 2017020001,
        qaCatCode: 'INVESTMENT',
        selectIDNot: false
      }
    },
    created() {
      if (!this.$route.params.loanMoney) {
        this.sumbitBtnTxt = '查看结果'
      } else {
        this.sumbitBtnTxt = '确认提交'
      }
      this._getInvestorNotice()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      selectItem(group, item, index, k) {
        let selectIdList = group.selectedId.split('_')[0]

        let selectId = selectIdList + '_' + item.qaOptId

        this.$set(this.noticeList[index], 'selectedId', selectId)

        for (let i = 0; i < this.noticeList[index].answer.length; i++) {
          this.$set(this.noticeList[index].answer[i], 'selectCtrol', false)
        }
        this.$set(this.noticeList[index].answer[k], 'selectCtrol', true)

        const _this = this
        for (let j = 0; j < _this.noticeList.length; j++) {
          let selectIdOption = _this.noticeList[j].selectedId.split('_')[1]
          if (!selectIdOption || selectIdOption === '') {
            _this.selectIDNot = false
            _this.$refs.investorNoticeScroll.scrollToElement(_this.$refs.noticeListWrapper.children[j], 500)
            break
          }
          _this.selectIDNot = true
        }
      },
      sumbit () {
        const _this = this
        for (let j = 0; j < _this.noticeList.length; j++) {
          (function(j) {
            let selectIdOption = _this.noticeList[j].selectedId.split('_')[1]
            if (!selectIdOption || selectIdOption === '') {
              _this.selectIDNot = false
              _this.$refs.investorNoticeScroll.scrollToElement(_this.$refs.noticeListWrapper.children[j], 500)
              return
            }
            _this.selectIDNot = true
          })(j)
        }

        if (!this.selectIDNot) {
          return
        }

        this._submitInvestorNotice()
      },
      _formatData(arr) {
        let ret = []
        let qaQuId = ''

        arr.forEach((item, index) => {
          if (qaQuId !== item.qa_qu_id) {
            ret.push({
              problem: item.qa_qu_content + ':',
              qaQuId: item.qa_qu_id,
              selectedId: item.qa_qu_id + '_',
              answer: []
            })
            qaQuId = item.qa_qu_id
          }

          ret.forEach((one, Findex) => {
            if (ret[Findex].qaQuId === item.qa_qu_id) {
              ret[Findex].answer.push({
                txt: item.qa_opt_content,
                qaOptId: item.qa_opt_id,
                selectCtrol: false
              })
            }
            ret[Findex].answer.forEach((option, Oindex) => {
              if (!this._substring(ret[Findex].answer[Oindex].txt)) {
                ret[Findex].answer[Oindex].txt = `${String.fromCharCode(64 + (Oindex + 1))}.${ret[Findex].answer[Oindex].txt}`
              }
            })
          })
        })
        return ret
      },
      _substring(string) {
        let reg = new RegExp('^[A-Z]+$')
        const _str = string.substring(0, 1)
        return reg.test(_str)
      },
      _getInvestorNotice() {
        getInvestorNotice(this.qaCatCode, this.qaPaperIssue).then((res) => {
          this.qaPaperId = res.qa[0].qa_paper_id
          this.noticeList = this._formatData(res.qa)
        })
      },
      _submitInvestorNotice() {
        let selectIdCom = ''
        this.noticeList.forEach((item, index) => {
          selectIdCom += item.selectedId + ','
        })
        this.qaAnsContent = selectIdCom.substring(0, selectIdCom.length - 1)
        submitInvestorNotice(this.changeLoginState, this.qaPaperId, this.qaAnsContent).then((res) => {
          if (!this.$route.params.loanMoney) {
            this.$router.replace({
              path: `/review-result/${res.code}/${res.total}/${res.balance}`
            })
            return
          }

          this.project_id = this.$route.params.id
          this.$router.replace({
            path: `/subscription/${this.project_id}/${this.$route.params.loanMoney}/${this.$route.params.surplus}/${this.$route.params.mh}`
          })
        })
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

  .investor-notice-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .investor-notice-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .investor-notice-group
        padding-top: 5px
        .notice-list-wrapper
          margin: 0 auto
          position: relative
          width: 90%
          min-height: 300px
          background-color: $color-text
          border-radius: 15px
          box-shadow: 0px 5px 5px -6px #ccc
          overflow: hidden
          .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
          .notice-list
            padding: 0 10px 12px
            margin-bottom: 3px
            background-color: $color-text
            .notice-item
              padding: 8px 0 11px 0
              .problem
                display: flex
                padding: 8px 0
                .ic
                  flex: 0 0 18px
                  width: 18px
                  line-height: 20px
                  font-size: $font-size-small
                  color: $color-tle
                  font-weight: bold
                .pr-txt
                  flex: 1
                  line-height: 20px
                  font-size: $font-size-small
                  color: $color-tle
              .answer
                display: flex
                align-items: center
                justify-content: center
                margin-top: 10px
                padding: 8px
                border: 1px solid #c8c8c8
                border-radius: 5px
                .an-txt
                  line-height: 20px
                  font-size: $font-size-small
                  color: $color-dialog-background
                &.selected
                  background-color: #ff4e49
                  border: 1px solid #ff4e49
                  .an-txt
                    color: #fff
        .notice-btn
          padding: 20px
          text-align: center
          .sumbit-btn
            margin-top: 18px
            line-height: 44px
            border-radius: 22px
            font-size: $font-size-large
            color: $color-text
            background-color: $btn-clo
</style>
