<template>
  <div class="investor-notice-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="investor-notice-scroll" :data="noticeList" ref="investorNoticeScroll">
      <div class="investor-notice-group">
        <div class="ct-desc">
          <h3 class="desc-title">{{qaPaperTitle}}</h3>
          <p class="desc-txt border-1px-b">{{qaPaperSubTitle}}</p>
        </div>
        <div class="notice-list-wrapper">
          <ul class="notice-list" ref="noticeListWrapper">
            <li class="notice-item" v-for="(group, index) in noticeList">
              <h3 class="problem">
                <span class="ic">{{index + 1}}.</span>
                <span class="pr-txt">{{group.problem}}</span>
              </h3>
              <p class="answer" v-for="(item, k) in group.answer">
                <span class="select" @click="selectItem(group, item, index, k)"><span class="select-btn" :class="{'selected': item.selectCtrol}"><em class="bg"></em></span></span>
                <span class="an-txt">{{item.txt}}</span>
              </p>
            </li>
          </ul>
          <div class="loading-container" v-show="!noticeList.length">
            <loading></loading>
          </div>
        </div>
        <div class="notice-btn">
          <p class="desc-notice">
            <span class="icon" @click="readCtrol" :class="{'selected': readed}"></span>
            <span class="desc">我已阅读<a class="notice-details" @click="detailsCtrol">《投资者须知》</a>并同意</span>
          </p>
          <p class="desc-notice-tx">请阅读并勾选投资者须知</p>
          <div class="sumbit-btn" @click="sumbit" :class="{'ok': clickOk}">确认提交</div>
        </div>
      </div>
    </scroll>
    <div class="investor-notice-details" v-show="isWin">
      <div class="content-details-wrapper">
        <h3 class="title">投资者须知</h3>
        <scroll class="content-details-scroll" ref="detailsScroll">
          <div class="content-details-group">
            <p class="txt special">尊敬的投资者</p>
            <p class="txt">当您准备在本平台投资的时候，请您务必了解以下事项：</p>
            <p class="txt">1.本平台为依法成立的、专门从事网络借贷信息中介业务活动的金融信息中介机构。</p>
            <p class="txt">2.本平台依据法律法规及合同约定为出借人与借款人提供直接借贷信息的采集整理、甄别筛选、网上发布，以及资信评估、借贷撮合、融资咨询、在线争议解决等相关服务；不提供增信服务，不设立资金池，不进行非法集资，不损害国家利益和社会公共利益。</p>
            <p class="txt">3.出借人与借款人遵循“借贷自愿、诚实守信、责任自负、风险自担”的原则承担借贷风险。</p>
            <p class="txt">4.出借人应具备投资风险意识、风险识别能力、拥有非保本类金融产品投资的经历并熟悉互联网。</p>
            <p class="txt">5.出借人的出借资金应为来源合法的自有资金。</p>
            <p class="txt">6.出借人应了解融资项目信贷风险，理性谨慎、量力而行，具有相应的风险认知和承受能力，自行承担借贷产生的本息损失。</p>
            <p class="txt">7.出借人在本平台上进行的出借决策均应由出借人本人亲自确认。</p>
            <p class="txt">8.在注册和使用本平台服务期间，出借人应根据本平台的要求提供真实资料和信息，并保证其所提交的所有资料和信息（包括但不限于真实姓名/名称、电子邮件地址、联系电话、身份信息等）真实、准确、完整、有效和合法，复印件与原件一致。出借人资料和信息如有变更，应及时更新，如因未及时更新导致本平台无法提供服务的，由此产生的法律责任和后果由出借人自担；出借人如使用他人信息和文件注册使用本平台服务或向本平台提供的信息和资料不符合上述要求，由此引起的一切责任和后果均由出借人自担，本平台不因此承担任何法律责任，如因此给本平台造成损失的，出借人应当承担赔偿责任。</p>
            <p class="txt">9.出借人应遵守所有与本平台网络服务有关的网络协议、规定和程序。</p>
            <p class="txt">10.出借人不得利用本平台进行任何可能对互联网造成不利影响的行为以及不利于本平台的行为。</p>
          </div>
        </scroll>
        <div class="read-btn-wrapper"><span class="read-btn" @click="closeWin">已阅读</span></div>
      </div>
    </div>
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
        titleTxt: '投资者须知',
        readed: false,
        qaPaperTitle: '',
        qaPaperSubTitle: '',
        qaPaperId: '',
        qaAnsContent: '',
        noticeList: [],
        isWin: false,
        qaPaperIssue: 2017020001,
        qaCatCode: 'INVESTMENT',
        selectIDNot: false
      }
    },
    created() {
      this._getInvestorNotice()
    },
    computed: {
      clickOk() {
        if (this.readed && this.selectIDNot) {
          return true
        }
        return false
      },
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
      sumbit() {
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

        if (!this.readed || !this.selectIDNot) {
          return
        }

        this._submitInvestorNotice()

        this.project_id = this.$route.params.id
        const arr = this.$route.path.split(this.project_id)
        this.$router.push({
          path: `${arr[0]}${this.project_id}/subscription/${this.$route.params.loanMoney}/${this.$route.params.surplus}`
        })
      },
      readCtrol() {
        this.readed = !this.readed
      },
      detailsCtrol() {
        this.isWin = true
        setTimeout(() => {
          this.$refs.detailsScroll.refresh()
        }, 20)
      },
      closeWin() {
        this.isWin = false
        this.readed = true
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
          this.qaPaperTitle = res.qa[0].qa_paper_title
          this.qaPaperSubTitle = res.qa[0].qa_paper_sub_title
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
        submitInvestorNotice(this.changeLoginState, this.qaPaperId, this.qaAnsContent).then((res) => {})
      }
    },
    components: {
      MHeader,
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
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
        .ct-desc
          padding: 9px 20px 0
          background-color: $color-text
          .desc-title
            line-height: 26px
            font-size: $font-size-large-z
            color: $color-tle
          .desc-txt
            padding-bottom: 16px
            line-height: 16px
            font-size: $font-size-small
            color: $color-q
            border-1px-b(#f5f5f5)
        .notice-list-wrapper
          position: relative
          min-height: 300px
          background-color: $color-text
          .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
          .notice-list
            padding: 0 20px 12px
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
                  font-weight: bold
              .answer
                display: flex
                padding: 8px 0
                .select
                  flex: 0 0 18px
                  width: 18px
                  extend-click()
                  .select-btn
                    display: flex
                    justify-content: center
                    align-items: center
                    transform: translateY(4px)
                    width: 10px
                    height: 10px
                    border: 1px solid #f5f5f5
                    border-radius: 50%
                    background-color: $color-text
                    &.selected
                      border: 1px solid $btn-clo
                      background-color: $btn-clo
                    .bg
                      display: inline-block
                      width: 4px
                      height: 4px
                      border-radius: 50%
                      background-color: $color-text
                .an-txt
                  flex: 1
                  line-height: 20px
                  font-size: $font-size-small
                  color: $color-dialog-background
        .notice-btn
          padding: 20px
          background-color: $color-text
          text-align: center
          .desc-notice
            display: flex
            margin: 0 auto
            width: 195px
            .icon
              flex: 0 0 13px
              width: 13px
              margin-right: 10px
              bg-image('questionUnSelected')
              background-size: 13px 13px
              background-repeat: no-repeat
              background-position: center
              extend-click()
              &.selected
                bg-image('questionSelected')
            .desc
              line-height: 32px
              font-size: $font-size-small
              color: $color-tle
              .notice-details
                position: relative
                color: $btn-clo
                &:after
                  display: block
                  position: absolute
                  left: 13%
                  bottom: 0
                  width: 74%
                  border-bottom: 1px solid $btn-clo
                  content: ''
          .desc-notice-tx
            line-height: 32px
            font-size: $font-size-small
            color: $btn-clo
          .sumbit-btn
            margin-top: 18px
            line-height: 44px
            border-radius: 22px
            background-color: #ccc
            font-size: $font-size-large
            color: $color-q
            &.ok
              color: $color-text
              background-color: $btn-clo
    .investor-notice-details
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 1000
      background-color: $color-background-d
      .content-details-wrapper
        position: absolute
        top: 20px
        right: 20px
        bottom: 20px
        left: 20px
        background-color: $color-text
        .title
          padding-top: 5px
          line-height: 44px
          color: $color-tle
          font-weight: bold
          text-align: center
          font-size: $font-size-medium
          background-color: $color-text
        .read-btn-wrapper
          position: absolute
          width: 100%
          height: 70px
          left: 0
          bottom: 0
          background-color: $color-text
          text-align: center
          .read-btn
            display: block
            margin: 17px auto 0
            width: 50%
            line-height: 36px
            text-align: center
            border-radius: 18px
            background-color: $btn-clo
            color: $color-text
            font-size: $font-size-medium-x
        .content-details-scroll
          position: absolute
          top: 50px
          right: 0
          bottom: 70px
          left: 0
          overflow: hidden
          .txt
            line-height: 22px
            padding: 0 15px
            text-indent: 2em
            color: $color-q
            font-size: $font-size-small
            &.special
              text-indent: 0
              color: $color-tle
</style>
