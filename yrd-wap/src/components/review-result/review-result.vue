<template>
	<div @touchmove.prevent>
		<m-header :titleTxt="titleTxt" :isIndex="isIndex" :opcity="opcity" :isShow="isShow" @logined="setUserInfo"></m-header>
		<scroll ref="sdScroll" class="sign-deal-wrapper">
			<div class="sign-deal-ct">
				<div class="sign-deal-ct-g">
					<h3 class="sign-deal-tle">请充分权衡风险和收益</h3>
					<div class="sign-deal-txt-wrapper">
						<div class="review-result-img"></div>
						<div class="review-result-ct">
							<p class="review-result-desc">您当前测评结果为：</p>
							<h3 class="review-result-name" v-html="userType"></h3>
							<p class="review-result-desc-1">  以上评估仅供参考，并未完全包含所有影响风险承受能力的因素，您可根据自身风险承受能力的变化，申请重新评估，但一年不超过<span class="review-result-num" v-html="thisResult.total">3</span>次；</p>
							<p class="review-result-desc-2">您今年剩余测评次数为<span class="review-result-num-s" v-html="thisResult.balance">2</span>次</p>
						</div>
						<div class="sign-deal-btn" @click="sdGolist">去出借</div>
						<div class="review-result-btn" @click="sdGoback">重新测评</div>
					</div>
				</div>
			</div>
			<top-tip ref="topTip">
	      <p class="top-tip-desc" v-html="topTipTxt"></p>
	    </top-tip>
		</scroll>
	</div>
</template>

<script>
	import MHeader from 'components/m-header/m-header'
	import Scroll from 'base/scroll/scroll'
	import TopTip from 'base/top-tip/top-tip'

	export default {
	  data() {
	    return {
	      titleTxt: '测评结果',
	      isIndex: false,
	      opcity: 1,
	      isShow: false,
	      userInfo: {},
	      topTipTxt: '',
	      thisResult: {
	      	balance: this.$route.params.balance,
	      	code: this.$route.params.type,
	      	total: this.$route.params.total
	      }
	    }
	  },
	  activated () {
      this.$refs.sdScroll.refresh()
    },
    computed: {
    	userType () {
    		if (this.thisResult.code === 'A') {
    			return '保守型'
    		}
    		if (this.thisResult.code === 'B') {
    			return '稳健型'
    		}
    		if (this.thisResult.code === 'C') {
    			return '进取型'
    		}
    		return ''
    	}
    },
    methods: {
    	sdGolist () {
    		this.$router.replace({
          path: '/product-list'
        })
    	},
    	sdGoback () {
    		if (!this.thisResult.balance || this.thisResult.balance < 1) {
    			this.topTipTxt = '今年评测次数已用完<br/>不可再继续评测'
          this.$refs.topTip.show()
          return
    		}
    		this.$router.replace({
          path: '/investor-notice'
        })
    	},
    	setUserInfo (res) {
        this.userInfo = res
      }
    },
	  components: {
	    MHeader,
	    Scroll,
	    TopTip
	  }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.sign-deal-wrapper
	position: fixed
	top: 44px
	left: 0
	bottom: 0
	width: 100%
	background-color: #f9f9f9
	&.is-app
		top: 0
	.top-tip-desc
    padding: 10px 20px
    line-height: 20px
    font-size: 12px
    color: #fff
	.sign-deal-ct
		padding: 10px 0 20px
	.sign-deal-ct-g
		margin: 0 auto 35px
		padding-bottom: 20px
		width: 90%
		background-color: #fff
		border-radius: 15px
		box-shadow: 0 4px 15px -4px #ccc
		.sign-deal-tle
			line-height: 54px
			font-size: 14px
			text-align: center
		.sign-deal-txt-wrapper
			margin: 0 auto
			width: 90%
			.review-result-img
				height: 185px
				bg-image('rr')
				background-size: 195px 185px
				background-position: center
			.review-result-ct
				padding-top: 15px
			.review-result-desc
				line-height: 22px
				font-size: 12px
			.review-result-name
				line-height: 32px
				font-size: 18px
			.review-result-desc-1
				line-height: 20px
				font-size: 10px
				color: #999
				text-indent: 2em
				.review-result-num
					font-weight: bold
					color: #ff4e49
			.review-result-desc-2
				padding: 10px 0 15px
				line-height: 20px
				font-size: 10px
				text-align: right
				.review-result-num-s
					padding: 0 5px
					font-weight: bold
					color: #ff4e49
					border-1px-b(#ff4e49)
			.review-result-btn
				line-height: 52px
				text-align: center
				font-size: 12px
				color: #ff4e49
	.sign-deal-btn
		margin: 0 auto
		line-height: 44px
		text-align: center
		font-size: 18px
		width: 90%
		background-color: #ff4e49
		color: #fff
		border-radius: 22px 
</style>