<template>
  <div class="deal-record-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" @logined="logined" :gobool="gobool"></m-header>
    <scroll class="record-wrapper" ref="dealRecordScroll" :data="recordList" :pullup="pullup" @scrollToEnd="loadMore">
    	<div class="record-ctr">
    		<div class="record-ctr-btns-wrapper">
    			<div class="record-ctr-btns-box">
	    			<div class="record-ctr-btns rcb-tb-time rcb-tb-mr">
	    				<span class="rcb-l" @click="removeYear"></span>
	    				<span class="rcb-ct">{{thisYear}}</span>
	    				<span class="rcb-r" @click="addYear"></span>
	    			</div>
	    			<div class="record-ctr-btns rcb-tb-time">
	    				<span class="rcb-l" @click="removeMonth"></span>
	    				<span class="rcb-ct">{{monthVal}}月</span>
	    				<span class="rcb-r" @click="addMonth"></span>
	    			</div>
	    			<div class="record-ctr-btns rcb-tb-now">
	    				<span class="rcb-tb" @click="dealInit">返回今天</span>
	    			</div>
    			</div>
    		</div>
    		<div class="is-record-wrapper">
    			<div class="record-tabs-wrapper border-1px-b">
    				<span class="record-tab-item" v-for="(tab, index) in tabs" :class="{'seled': tabIdx === index}" v-html="tab.name" @click="seledTab(tab, index)"></span>
    			</div>
	        <div class="has-record-list" v-show="recordList.length > 0">
	        	<ul class="has-record-item border-1px-b" v-for="(item, index) in recordList">
	        		<li class="ri-box">
	        			<span class="ri-box-name">交易时间</span>
	        			<span class="ri-box-desc" v-html="item.createdDate"></span>
	        		</li>
	        		<li class="ri-box">
	        			<span class="ri-box-name">交易类型</span>
	        			<span class="ri-box-desc" v-html="item.type"></span>
	        		</li>
	        		<li class="ri-box">
	        			<span class="ri-box-name">交易金额</span>
	        			<span class="ri-box-desc" v-html="item.currentPageOperaMoney"></span>
	        		</li>
	        		<li class="ri-box" v-show="item.isShow">
	        			<span class="ri-box-name">交易状态</span>
	        			<span class="ri-box-desc" v-html="item.status"></span>
	        		</li>
	        		<li class="ri-box" v-show="item.isShow">
	        			<span class="ri-box-name">交易详情备注</span>
	        			<span class="ri-box-desc" v-html="item.remark"></span>
	        		</li>
	        		<li class="ri-sh-btn" @click="setSH(index)">
	        			<p class="desc" :class="{'ish': item.isShow}" v-html="rishBtnTxt(item.isShow)"></p>
	        		</li>
	        	</ul>
	        </div>
		      <div class="no-record-wrapper" v-show="!recordList.length || recordList.length === 0">
		      	<div class="icon"></div>
		        <p class="desc" v-html="airTxt"></p>
		      </div>
	      </div>
	      <loading :title="loadTitle" v-show="hasMore"></loading>
    	</div>
    </scroll>
    <top-tip ref="topTip">
      <p class="top-tip-desc" v-html="topTipTxt"></p>
    </top-tip>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import TopTip from 'base/top-tip/top-tip'
  import {getDealRecord} from 'api/user'

  export default {
    data() {
      return {
        titleTxt: '交易记录',
        loadTitle: '正在载入更多...',
        topTipTxt: '',
        isShow: false,
        opcity: 1,
        userId: '',
        pullup: true,
        hasMore: true,
        gobool: true,
        page: 1,
        rows: 5,
        type: 'chongZhi',
        tabIdx: 0,
        thisYear: new Date().getFullYear(),
        thisMonth: new Date().getMonth() + 1,
        tabs: [
        	{
        		name: '充值',
        		type: 'chongZhi'
        	},
        	{
        		name: '提现',
        		type: 'tiXian'
        	},
        	{
        		name: '出借',
        		type: 'touBiao'
        	},
        	{
        		name: '回款',
        		type: 'huanKuan'
        	}
        ],
        recordList: []
      }
    },
    computed: {
    	monthVal () {
    		let monthNum = '00' + this.thisMonth
    		return monthNum.substr(monthNum.length - 2, monthNum.length)
    	},
    	one () {
    		return this.thisYear + '-' + this.monthVal
    	},
      airTxt () {
        if (this.type === 'chongZhi') {
          return '您暂时没有充值记录哦'
        }
        if (this.type === 'tiXian') {
          return '您暂时没有提现记录哦'
        }
        if (this.type === 'touBiao') {
          return '您暂时没有出借记录哦'
        }
        return '您暂时没有回款记录哦'
      }
    },
    methods: {
    	rishBtnTxt (bool) {
    		if (bool) {
    			return '收起'
    		}
    		return '展开'
    	},
    	setSH (idx) {
    		const _this = this
    		let isShow = !this.recordList[idx].isShow
    		this.$set(_this.recordList[idx], 'isShow', isShow)
    		setTimeout(() => {
    			this.$refs.dealRecordScroll.refresh()
    		})
    	},
    	seledTab (tab, idx) {
    		this.tabIdx = idx
    		this.type = tab.type
    		this.getInvestRecord()
    	},
    	dealInit () {
    		const date = new Date()
    		this.thisYear = date.getFullYear()
    		this.thisMonth = date.getMonth() + 1
    	},
    	logined (res) {
        this.userId = res.user_Id
        this.getInvestRecord()
      },
      addYear () {
      	this.thisYear++
      	this.thisMonth = 1
      	this.getInvestRecord()
      },
      removeYear () {
      	this.thisYear--
      	this.thisMonth = 1
      	this.getInvestRecord()
      },
      addMonth () {
      	if (this.thisMonth > 11) {
      		this.thisYear++
      		this.thisMonth = 1
      		this.getInvestRecord()
      		return
      	}
      	this.thisMonth++
      	this.getInvestRecord()
      },
      removeMonth () {
      	if (this.thisMonth < 2) {
      		this.thisYear--
      		this.thisMonth = 12
      		this.getInvestRecord()
      		return
      	}
      	this.thisMonth--
      	this.getInvestRecord()
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        const _this = this
        getDealRecord(_this.userId, _this.page, _this.rows, _this.one, _this.type).then((res) => {
        	if (res.ret_code !== '1') {
        		this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
        	}
        	this.recordList = this.recordList.concat(this.genResult(res.ret_set))
        	this.checkMore(res)
        })
      },
      getInvestRecord () {
        this.page = 1
        this.hasMore = true
        const _this = this
        getDealRecord(_this.userId, _this.page, _this.rows, _this.one, _this.type).then((res) => {
        	if (res.ret_code !== '1') {
        		this.topTipTxt = res.ret_msg
            this.$refs.topTip.show()
            return
        	}
        	this.recordList = this.genResult(res.ret_set)
        	this.checkMore(res)
        })
      },
      checkMore (data) {
        const rows = data.ret_set
        if (!rows.length || rows.length < this.rows) {
          this.hasMore = false
        }
      },
      genResult (data) {
        let ret = []
        for (let i = 0; i < data.length; i++) {
          let obj = {
          	isShow: false
          }
          ret.push(Object.assign(data[i], obj))
        }
        return ret
      }
    },
    components: {
      MHeader,
      Scroll,
      Loading,
      TopTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .deal-record-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .top-tip-desc
      padding: 10px 20px
      line-height: 20px
      font-size: 12px
      color: #fff
    .record-wrapper
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      overflow: hidden
      .record-ctr
      	padding: 15px 0 1px
      	.record-ctr-btns-wrapper
      		margin: 0 auto 10px
	      	width: 90%
	      	background-color: $color-text
	      	border-radius: 10px
	      	box-shadow: 0px 5px 5px -6px #ccc
      		.record-ctr-btns-box
	      		display: flex
	      		margin: 0 auto
	      		width: 90%
	      		height: 50px
	      		.record-ctr-btns
	      			display: flex
	      			&.rcb-tb-time
	      				flex: 0 0 90px
	      				width: 90px
	      				&.rcb-tb-mr
	      					margin-right: 12px
	      				.rcb-l
	      					display: flex
	      					align-items: center
	      					justify-content: center
	      					flex: 0 0 20px
	      					width: 20px
	      					height: 50px
	      					bg-image('l')
	      					background-position: center
	      					background-size: 10px auto
	      					background-repeat: no-repeat
	      					extend-click()
	      				.rcb-ct
	      					flex: 1
	      					display: flex
	      					align-items: center
	      					justify-content: center
	      					height: 50px
	      					font-size: 12px
	      					color: #ff4e49
	      				.rcb-r
	      					display: flex
	      					align-items: center
	      					justify-content: center
	      					flex: 0 0 20px
	      					width: 20px
	      					height: 50px
	      					bg-image('r')
	      					background-position: center
	      					background-size: 10px auto
	      					background-repeat: no-repeat
	      					extend-click()
	      			&.rcb-tb-now
	      				flex: 1
	      				justify-content: flex-end
	      				.rcb-tb
	      					display: flex
	      					align-items: center
	      					justify-content: flex-end
	      					flex: 0 0 60px
	      					width: 60px
	      					height: 50px
	      					color: #ff4e49
	      					font-size: 12px
	      					extend-click()
	      .is-record-wrapper
	        margin: 0 auto 15px
	        width: 90%
	        border-radius: 10px
	        box-shadow: 0px 5px 5px -6px #ccc
	        background-color: $color-text
	        padding-bottom: 20px
	        .record-tabs-wrapper
	        	display: flex
	        	border-1px-b(#f5f5f5)
	        	.record-tab-item
	        		flex: 1
	        		position: relative
	        		display: flex
	        		justify-content: center
	        		align-items: center
	        		height: 40px
	        		font-size: 12px
	        		&.seled
	        			color: #ff4e49
	        			&:before
	        				content: ''
	        				position: absolute
	        				bottom: -1px
	        				left: 10%
	        				right: 10%
	        				height: 3px
	        				background-color: #ff4e49
	        				z-index: 1
	        				transform: scaleY(0.5)
	        .has-record-list
	        	.has-record-item
	        		padding: 10px 15px 15px 15px
	        		border-1px-b(#f5f5f5)
	        		&:last-child
	        			padding: 10px 15px 0 15px
	        			border-1px-b(#fff)
	        		.ri-box
	        			display: flex
	        			.ri-box-name
	        				flex: 0 0 120px
	        				display: flex
	        				line-height: 20px
	        				padding: 8px 0
	        				width: 120px
	        				font-size: 12px
	        				color: #323232
	        			.ri-box-desc
	        				flex: 1
	        				display: flex
	        				justify-content: flex-end
	        				line-height: 20px
	        				padding: 8px 0
	        				font-size: 12px
	        				color: #969696
	        		.ri-sh-btn
	        			display: flex
	        			padding-top: 10px
	        			.desc
	        				flex: 1
	        				line-height: 20px
	        				padding-bottom: 10px
	        				font-size: 12px
	        				color: #323232
	        				text-align: center
	        				bg-image('s')
	        				background-position: bottom center
	        				background-size: 10px 10px
	        				background-repeat: no-repeat
	        				&.ish
	        					bg-image('h')
	        .no-record-wrapper
	        	padding-top: 20px
		        .icon
		        	height: 50px
		        	bg-image('air')
		        	background-position: center
		        	background-size: 25px 25px
		        	background-repeat: no-repeat
		        .desc
		          color: #323232
		          line-height: 20px
		          text-align: center
		          font-size: 12px
</style>
