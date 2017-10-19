<template>
  <div class="withdraw-wrapper">
    <m-header :isShow="isShow" :opcity="opcity" :titleTxt="titleTxt"></m-header>
    <access
      ref="accessEl"
      :accessTitle="accessTitle"
      :recordTitle="recordTitle"
      :airTxt="airTxt"
      :airBtnTxt="airBtnTxt"
      :accessList="accessList"
      :hasMore="hasMore"
      :caveatText="caveatText"
      :descTxt="descTxt"
      @getSum="getSum"
      @loadMore="loadMore"
      @airBtnMethod="airBtnMethod"
    >
      <div class="access-record-list" slot="record-list" v-show="accessList.length && accessList.length > 0">
        <ul class="record-list border-1px-b" v-for="item in accessList">
          <li class="record-item">
            <span class="name">提现编号</span>
            <span class="text">{{item.withdrawalReqNo}}</span>
          </li>
          <li class="record-item">
            <span class="name">操作时间</span>
            <span class="text">{{item.createdDate}}</span>
          </li>
          <li class="record-item">
            <span class="name">提现金额</span>
            <span class="text">{{item.withdrawalMoney}}</span>
          </li>
          <li class="record-item">
            <span class="name">实到账</span>
            <span class="text styl">{{item.actualMoney}}</span>
          </li>
          <li class="record-item">
            <span class="name">状态</span>
            <span class="text">{{item.statusCode}}</span>
          </li>
        </ul>
      </div>
    </access>
    <foot-btn :submitBtnTxt="submitBtnTxt" @submitFuc="submitFuc"></foot-btn>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Access from 'base/access/access'
  import FootBtn from 'base/foot-btn/foot-btn'
  import storage from 'good-storage'
  import {userWithdrawal, withdrawalRecord} from 'api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isShow: false,
        titleTxt: '提现',
        opcity: 1,
        accessTitle: '提现金额',
        recordTitle: '提现记录',
        airTxt: '先进行投资体验吧！',
        airBtnTxt: '立即投标',
        submitBtnTxt: '确认提现',
        descTxt: '点击输入提现金额',
        page: 1,
        rows: 5,
        accessList: [],
        hasMore: true,
        caveatText: ''
      }
    },
    created () {
      this._withdrawalRecord()
    },
    activated () {
      this._withdrawalRecord()
    },
    computed: {
      ...mapGetters([
        'changeLoginState'
      ])
    },
    methods: {
      getSum(val) {
        this.money = val
      },
      submitFuc() {
        this.money = parseFloat(this.money)
        if (!this.money) {
          this.caveatText = '请输入提现金额！'
          this.$refs.accessEl.caveat()
          return
        }
        if (this.money < 100) {
          this.caveatText = '提现金额不能小于100元！'
          this.$refs.accessEl.caveat()
          return
        }
        userWithdrawal(this.money).then((res) => {
          console.log('res', res)
          if (res.status === 'success') {
            storage.set('SECHARGE', res.data1.form)
            location.href = '/dist/withdraw.html'
          } else {
            if (res.msg) {
              this.caveatText = res.msg
              this.$refs.accessEl.caveat()
            } else {
              this.caveatText = '提现金额不能超出余额！'
              this.$refs.accessEl.caveat()
            }
          }
        })
      },
      loadMore() {
        if (!this.hasMore) {
          return
        }

        this.page++
        withdrawalRecord(this.changeLoginState, this.page, this.rows).then((res) => {
          console.log('moreData:', res)
          this.accessList = this.accessList.concat(res.rows)
          this._checkMore(res)
        })
      },
      airBtnMethod() {
        this.$router.push('/product-list')
      },
      _withdrawalRecord() {
        this.page = 1
        this.hasMore = true
        withdrawalRecord(this.changeLoginState, this.page, this.rows).then((res) => {
          console.log('firstData:', res)
          this.accessList = res.rows
          this._checkMore(res)
        })
      },
      _checkMore (data) {
        const rows = data.rows
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      }
    },
    components: {
      MHeader,
      Access,
      FootBtn
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .withdraw-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
</style>
