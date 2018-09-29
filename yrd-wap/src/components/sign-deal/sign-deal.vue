<template>
	<div @touchmove.prevent>
		<m-header v-if="!isApp" :titleTxt="titleTxt" :isIndex="isIndex" :opcity="opcity" :isShow="isShow" :isSingDeal="isSingDeal"></m-header>
		<scroll ref="sdScroll" class="sign-deal-wrapper" :class="{'is-app': isApp}">
			<div class="sign-deal-ct">
				<div class="sign-deal-ct-g" :class="{'pb-none': isApp}">
					<h3 class="sign-deal-tle border-1px-b">网络借贷风险提示</h3>
					<div class="sign-deal-txt-wrapper">
						<p class="sign-deal-txt">尊敬的用户：</p>
						<p class="sign-deal-txt sdt1">为了确保您充分知悉网络借贷风险，防范借贷风险，更好的为您服务，现向您作以下借贷风险提示：</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">一、</span>
							<span class="sign-deal-txt-r">本网络借贷平台为网络借贷信息中介机构，本平台不承诺保本保息、不设资金池、平台不提供增信服务。</span>
						</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">二、</span>
							<span class="sign-deal-txt-r">借款人与出借人应遵循“借贷自愿、诚实守信、责任自负风险自担”的原则自行承担借贷风险。</span>
						</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">三、</span>
							<span class="sign-deal-txt-r">借贷有风险，出借须谨慎； 出借人应根据平台披露的相关信息谨慎做出判断和借贷决策，并自行承担借贷风险，网贷平台不承担借贷违约风险。</span>
						</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">四、</span>
							<span class="sign-deal-txt-r">
								<span class="sign-deal-txt-r-t">在您通过本网贷平台进行资金出借的过程中，也许会面临包括但不限于以下可能导致您出借资金及收益受损的各种风险，该等风险须由您自行承担：</span>
								<span class="sign-deal-txt-r-t">1.法律及监管风险： 因网贷相关法律及监管政策不完善、法律和监管政策发生变动、 法律和监管政策解释和执行存在不确定性等因素引起的风险， 该等风险可能导致网贷平台业务模式受影响、 相关产品合法性存在不确定、相关产品或服务无法继续提供等后果。</span>
								<span class="sign-deal-txt-r-t">2.市场风险：因市场资金面紧张或利率波动、行业不景气企业效益下滑等因素引起的风险。</span>
								<span class="sign-deal-txt-r-t">3.借款人信用风险：当借款人因财务状况发生变化、人身出现意外、 发生疾病、死亡等情况， 短期或者长期丧失还款能力， 或者借款人的还款意愿发生变化时，您的出借资金可能无法按时回收甚至无法回收, 您的预期收益可能无法实现。 本平台没有义务对逾期的本息以及费用进行垫付或未经委托对借款人进行追索。</span>
								<span class="sign-deal-txt-r-t">4.不可抗力风险：由于无法控制和不可预测的系统故障、设备故障、通讯故障、电力故障、网络故障、黑客或计算机病毒攻击、以及战争、动乱、自然灾害等其它因素，可能导致平台出现非正常运行或者瘫痪， 由此导致您无法及时进行查询、充值、出借、提现等操作。</span>
							</span>
						</p>
					</div>
					<h3 class="sign-deal-tle border-1px-b">网络借贷禁止性行为提示</h3>
					<div class="sign-deal-txt-wrapper">
						<p class="sign-deal-txt sdt1">请仔细阅读并充分理解《网络借贷信息中介机构业务活动管理暂行办法》及有关监管法律、政策规定的如下网络借贷禁止性行为：</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">一、</span>
							<span class="sign-deal-txt-r">
								<span class="sign-deal-txt-r-t">《网络借贷信息中介机构业务活动管理暂行办法》第十条规定：网络借贷信息中介机构不得从事或者接受委托从事下列活动：</span>
								<span class="sign-deal-txt-r-t">（一）为自身或变相为自身融资；</span>
								<span class="sign-deal-txt-r-t">（二）直接或间接接受、归集出借人的资金；</span>
								<span class="sign-deal-txt-r-t">（三）直接或变相向出借人提供担保或者承诺保本保息；</span>
								<span class="sign-deal-txt-r-t">（四）自行或委托、授权第三方在互联网、固定电话、移动电话等电子渠道以外的物理场所进行宣传或推介融资项目；</span>
								<span class="sign-deal-txt-r-t">（五）发放贷款，但法律法规另有规定的除外；</span>
								<span class="sign-deal-txt-r-t">（六）将融资项目的期限进行拆分；</span>
								<span class="sign-deal-txt-r-t">（七）自行发售理财等金融产品募集资金，代销银行理财、券商资管、基金、保险或信托产品等金融产品；</span>
								<span class="sign-deal-txt-r-t">（八）开展类资产证券化业务或实现以打包资产、证券化资产、信托资产、基金份额等形式的债权转让行为；</span>
								<span class="sign-deal-txt-r-t">（九）除法律法规和网络借贷有关监管规定允许外，与其他机构、代理销售、经纪等业务进行任何形式的混合、捆绑、代理；</span>
								<span class="sign-deal-txt-r-t">（十）虚构、夸大融资项目的真实性、收益前景，隐瞒融资项目的瑕疵及风险，以歧义性语言或其他欺骗性手段等进行虚假片面宣传或促销等，捏造、散布虚假信息或不完整信息损害他人商业信誉，误导出借人或借款人；</span>
								<span class="sign-deal-txt-r-t">（十一）向借款用途为股票、场外配资、期货合约、结构化产品及其他衍生品等高风险的融资提供信息中介服务；</span>
								<span class="sign-deal-txt-r-t">（十二）从事股权众筹等业务；</span>
								<span class="sign-deal-txt-r-t">（十三）法律法规、网络借贷有关监管规定禁止的其他活动。</span>
							</span>
						</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">二、</span>
							<span class="sign-deal-txt-r">
								<span class="sign-deal-txt-r-t">《网络借贷信息中介机构业务活动管理暂行办法》第十五条规定：参与网络借贷的出借人应当履行下列义务：</span>
								<span class="sign-deal-txt-r-t">（一）向网络借贷信息中介机构提供真实、准确、完整的身份等信息；</span>
								<span class="sign-deal-txt-r-t">（二）出借资金为来源合法的自有资金；</span>
								<span class="sign-deal-txt-r-t">（三）了解融资项目信贷风险，确认具有相应的风险认知和承受能力；</span>
								<span class="sign-deal-txt-r-t">（四）自行承担借贷产生的本息损失；</span>
								<span class="sign-deal-txt-r-t">（五）借贷合同及有关协议约定的其他义务。</span>
							</span>
						</p>
						<p class="sign-deal-txt sdt2">
							<span class="sign-deal-txt-l">三、</span>
							<span class="sign-deal-txt-r">
								<span class="sign-deal-txt-r-t">《网络借贷信息中介机构业务活动管理暂行办法》第十三条规定：借款人不得从事下列行为：</span>
								<span class="sign-deal-txt-r-t">（一）通过故意变换身份、虚构融资项目、夸大融资项目收益前景等形式的欺诈借款；</span>
								<span class="sign-deal-txt-r-t">（二）同时通过多个网络借贷信息中介机构，或者通过变换项目名称、对项目内容进行非实质性变更等方式，就同一融资项目进行重复融资；</span>
								<span class="sign-deal-txt-r-t">（三）在网络借贷信息中介机构以外的公开场所发布同一融资项目的信息；</span>
								<span class="sign-deal-txt-r-t">（四）已发现网络借贷信息中介机构提供的服务中含有本办法第十条所列内容，仍进行交易；</span>
								<span class="sign-deal-txt-r-t">（五）法律法规和网络借贷有关监管规定禁止从事的其他活动。</span>
							</span>
						</p>
						<p class="sign-deal-txt">出借人确认：本人已知悉并充分理解上述风险提示和禁止性行为规定。</p>
					</div>
				</div>
				<div v-if="!isApp" class="sign-deal-btn" @click="sdGoback">我已阅读</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import MHeader from 'components/m-header/m-header'
	import Scroll from 'base/scroll/scroll'

	export default {
	  data() {
	    return {
	      titleTxt: '有人贷网络借贷风险及禁止性行为',
	      isIndex: false,
	      opcity: 1,
	      isShow: false,
	      isSingDeal: true,
	      isApp: false
	    }
	  },
	  created () {
	  	const pathUrl = this.$route.path
	  	if (pathUrl.indexOf('app') !== -1) {
	  		this.isApp = true
	  	}
	  },
	  activated () {
      this.$refs.sdScroll.refresh()
    },
    methods: {
    	sdGoback () {
    		this.$router.push(`/subscription/${this.$route.params.id}/${this.$route.params.loanMoney}/${this.$route.params.surplus}/${this.$route.params.mh}/isRy/${this.$route.params.realName}/${this.$route.params.idCard}`)
    	}
    },
	  components: {
	    MHeader,
	    Scroll
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
	.sign-deal-ct
		padding: 10px 0 20px
	.sign-deal-ct-g
		margin: 0 auto 35px
		padding-bottom: 20px
		width: 90%
		background-color: #fff
		border-radius: 15px
		box-shadow: 0 4px 15px -4px #ccc
		&.pb-none
			margin-bottom: 0
		.sign-deal-tle
			line-height: 54px
			font-size: 14px
			text-align: center
			border-1px-b(#f0f0f0)
		.sign-deal-txt-wrapper
			margin: 0 auto
			padding-top: 15px
			width: 90%
			.sign-deal-txt
				line-height: 20px
				font-size: 12px
				color: #999
				letter-spacing: 1px
				&.sdt1
					text-indent: 2em
				&.sdt2
					display: flex
					.sign-deal-txt-l
						flex: 0 0 26px
						padding-left: 26px
						width: 26px
					.sign-deal-txt-r
						flex: 1
						.sign-deal-txt-r-t
							display: block
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