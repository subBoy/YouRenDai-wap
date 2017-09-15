<template>
  <div class="contract-wrapper">
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity"></m-header>
    <scroll class="contract-scroll">
      <div class="contract-group">
        <div class="contract-txt">
          <h3 class="contract-name"><span></span>借款合同</h3>
          <p>本借款合同（下称“本合同”）由以下各方于<em class="wid-60"></em>年<em class="wid-30"></em>月<em class="wid-30"></em>日于有人贷网站（网址：www.yourendai.com）签署：</p>
          <div class="xin-txt">
            <p class="txt-fw-700">出借人：</p>
            <p class="pt-none">网站用户名： </p>
            <p>身份证号码： </p>
          </div>
          <div class="xin-txt">
            <p class="txt-fw-700">借款人： </p>
            <p class="pt-none">企业营业执照号： </p>
            <p>居间人：安信卓越投资管理（北京）有限公司</p>
          </div>
          <div class="jian-yu">
            <p class="txt-fw-700">鉴于： </p>
            <p class="text-indnt-2"><span>1.</span>居间人是一 家在北京市合法成立并有效存续的有限责任公司，拥有投融资网络信息平台：有人贷网站（网址：www.yourendai.com）（以下统称“本网站”）的经营权，能获得大量的投融资信息，并能有效提供投融资居间撮合服务；</p>
            <p class="text-indnt-2"><span>2.</span>借款人因日 常运营资金周转需要，拟寻求资金支持，现自愿通过注册本网站向出借人申请借款；出借人因合法拥有资金，决定通过一定的投资渠道投资，自愿通过本网站注册投资用户向借款人提供借款，双方承诺其提供给居间人的信息是完全真实的；
            </p>
            <p class="text-indnt-2"><span>3.</span>以上各方本 着实事求是、平等互利、共同发展的 原则，就借款人通过本网站向出借人申请借款事宜，经过友好协商，达成如下条款： </p>
          </div>
          <div class="tiaokuan">
            <p class="txt-fw-700">第 1 条 借款</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>1.1</span> 借款本金：人民币（大写）<em class="wid-60"></em>（小写￥<em class="wid-60"></em> 元）。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>1.2</span>借款期限：<em class="wid-60"></em>个自然日，自<em class="wid-60"></em>起至<em class="wid-60"></em>止（该起始日与实际出借日不一致的，起始日以实际出借日为准，到期日顺延）。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>1.3</span>借款利率：年利率<em class="wid-60"></em>/年。借款利率不因国家政策变化而调整。借款利率的折算：日利率=年利率/365，月利率=年利率/12。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>1.4</span>借款用途：本合同项下借款用于<em class="wid-120"></em>。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>1.5</span>借款人、出借人一致同意，出借资金划付至借款人名下账户之日，即出借资金为借款人实际控制和所有之日，为实际出借日。</p>
            <p class="txt-fw-700">第 2 条 借款偿还</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>2.1</span>借款人采用以下第（3）种方式向乙方还款：</p>
            <p class="text-indnt-2 text-indnt-2-2">（1）按月等额本息还款，即银行按揭贷款的还款方式，每个月还款额相同。</p>
            <p class="text-indnt-2 text-indnt-2-2">（2）每月付利息，按季度分期还本金。</p>
            <p class="text-indnt-2 text-indnt-2-2">（3）每月付利息，到期一次性还清全部本金及到期当月利息。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>2.2</span>还息日为每月 25 日，当月无该日的，还息日为本月最后一日。 </p>
            <p class="text-indnt-2 text-indnt-2-2"><span>2.3</span>保证严格按本合同约定的期限偿还当期应还款金额、并支付其它各项费用。 </p>
            <p class="txt-fw-700">第 3 条 提前还款</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>3.1</span>按照本合同第 2.1条的还款方式提前还款的，若提前一个月以上（含一月）进行还款的，应另行支付一个月（年利率/12）的利息作为提前还款违约金；若提前还款时间不足一个月的，仍需支付当月利息。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>3.2</span>若本网站另行公布的借款规则中对提前还款违约金另行约定的，各方同意以另行公布的借款规则为准。</p>
            <p class="txt-fw-700">第 4 条 逾期还款</p>
            <p class="text-indnt-2">还款日 24 时前，未足额支付相应款项的，则视为逾期。</p>
            <p class="txt-fw-700">第5条 出借人权利义务</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.1</span>出借人保证其所用于出借的资金来源合法，是该资金的合法所有人，如果第三人对资金归属、合法性问题发生争议，由出借人自行解决。如出借人未能解决，则一切后果由出借人自行承担。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.2</span>出借人享有其所出借款项所带来的利息收益，并应主动缴纳由利息所得带来的可能的税费。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.3</span>出借人有权了解借款人的个人资信情况和经济状况。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.4</span>出借人同意按本网站的服务规则及本合同的约定向借款人出借。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.5</span>如违约，出借人有权要求居间人提供其已获得的借款人信息。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.6</span>出借人应当对其知晓的借款人的个人信息保密，但本合同另有规定的必要情况下除外。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>5.7</span> 出借人了解出借风险，确认具有相应的风险认知和承受能力。</p>
            <p class="txt-fw-700">第 6 条 借款人的权利义务</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.1</span>有权向出借人申请借款。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.2</span>应按照居间人及出借人的要求提供相关资料，确保所提供资料是真实、完整、有效的。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.3</span>应按照约定按时足额偿还借款本金和利息、支付约定的相关费用。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.4</span>须按本合同约定的用途使用借款，并保证不利用本合同项下借款从事违反国家法律法规的非法活动。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.5</span>有如下任何信息或情形变动、发生时，有义务于 5 日内通知居间人及出借人：住所、联系方式、涉及重大诉讼及其它有损偿还能力事宜、（法人）发生隶属关系变更、经营范围改变、高管变动、组织架构调整、重大违纪违法或被索赔事件、经营困难、财务状况恶化、债权债务纠纷、其它可能影响偿债能力的事宜。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.6</span>出现如下情形的，应通知出借人并取得其同意：为他人提供担保、再次向第三方借款、处置名下重大资产、对外投资及资产转让、股权调整或股权转让、减少注册资本、进行分立、合并、重组等体制变更、撤销、解散、停业等。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.7</span>未经出借人书面同意，借款人不得将本合同项下的任何权利义务转让给任何第三方。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>6.8</span>借款人同意并确认，本合同如涉及两人以上借款，任一借款人均应履行本合同项下的义务，对全部借款承担连带清偿责任，出借人有权向任一借款人追索本息及其他相关费用。</p>
            <p class="txt-fw-700">第 7 条 居间人的权利义务</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>7.1</span>居间人有权根据借款人提供的各项信息及居间人独立获得的信息对借款人的信用进行评估，自主决定是否审核通过并将借款人的借款需求向出借人进行推荐。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>7.2</span>居间人有权根据出借人的委托采取包括但不限于通过站内信、电子邮件、公共媒体公告等方式进行通知、公告。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>7.3</span>居间人根据出借人、借款人的授权，通过本网站平台，为双方提供对接、撮合等服务。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>7.4</span>居间人有权向出借人、借款人收取居间服务费用，出借人、借款人同意按照最新网站服务规则确定的收费标准向居间人支付各项费用。 </p>
            <p class="txt-fw-700">第 8 条 借款人出现以下情形之一者，即视为根本违约：</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.1</span>借款人提供虚假、伪造的申请材料，或进行虚假陈述。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.2</span>借款人未按合同约定用途使用借款。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.3</span>借款人未按合同约定偿还或支付到期本金、利息、费用及其它任何应付款项。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.4</span>违反本合同规定的借款人义务。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.5</span>借款人为逃避债务，恶意转移资产或放弃、减免对第三方的债权。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.6</span>借款人被依法追究刑事责任或被依法受到其他强制措施或被有关机关采取了限制其某项权利的措施，影响其履行本合同义务的。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>8.7</span>其他足以让出借人认为危机本合同项下债权安全的情况。</p>
            <p class="txt-fw-700">第 9 条 违约处理</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>9.1</span>发生本合同规定的任何一种违约事件时，违约方应承担因其违约对其他各方造成的一切直接或间接损失。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>9.2</span>发生本合同规定的任何一种违约事件时，居间人有权将借款人列入本网站“逾期黑名单”，并将借款人违约失信的相关信息及其他信息向包括但不限于媒体、用人单位、公安机关及有关逾期款项催收服务机构披露。对此，居间人不承担任何责任。</p>
            <p class="text-indnt-2 text-indnt-2-2"><span>9.3</span>如本合同的其他条款对一方的违约及违约责任另有明确规定，并且该条款的规定与本条的规定不同的，则适用其他条款。</p>
            <p class="txt-fw-700">第 10 条 保密条款 </p>
            <p class="text-indnt-2">各方保证，对讨论、签订、履行本合同过程中所获悉的属于其他方的且无法自公开渠道获得的文件和资料（包括但不限于个人隐私、商业计划、运营资金、财务信息等）予以保密。否则应承担相应的违约责任并赔偿由此造成的全部损失。</p>
            <p class="txt-fw-700">第 11 条 争议的解决</p>
            <p class="text-indnt-2">本合同使用中华人民共和国法律和法规。因本合同发生纠纷，任何一方均可向居间人住所地有管辖权的人民法院提出诉讼。 </p>
            <p class="txt-fw-700">第 12 条 合同的生效及其他 </p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.1</span>本合同使用中华人民共和国法律和法规。因本合同发生纠纷，任何一方均可向居间人住所地有管辖权的人民法院提出诉讼。</p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.2</span>各方确认并同意，委托并授权第三方支付机构办理基于本网站平台达成的借款资金发放、偿还、划付等，该等行为的法律后果皆由委托人承担。</p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.3</span>各方确认并同意，基于保障资金安全及实现债权的需要，各方另行签署的相关合同亦具有独立的法律效力。</p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.4</span>各方确认，如本合同中的任何一条被视为无效，不影响本合同其他条款的效力。</p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.5</span>各方确认，各方自行保管在本网站及第三方支付机构注册的账户信息及密码，若有遗失，应及时书面通知居间人。各方承诺自行操作自己的账户，由此所产生的一切后果自行承担。</p>
            <p class="text-indnt-2 text-indnt-2-3"><span>12.6</span>本合同采用数据电文形式，自各方网上签署确认之日起生效。各方确认该数据电文合同具有法律认可的效力。</p>
            <p>（以下无正文）</p>
            <div class="con-foot-list">
              <ul>
                <li>
                  <p>出借人：</p>
                </li>
                <li>
                  <p>借款人：</p>
                </li>
                <li>
                  <p>身份证号：</p>
                </li>
                <li>
                  <p>签章：</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
        isShow: false,
        opcity: 1,
        titleTxt: '协议范本'
      }
    },
    components: {
      MHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .contract-wrapper
    position: fixed;
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background
    .contract-scroll
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .contract-group
        padding: 5px 0
        .contract-name
          position: relative
          font-size: 14px
          line-height: 14px
          padding: 15px 10px 15px 37px
          color: #333
          border-bottom: 1px solid #f0f0f0
        .contract-name span
          display: block
          position: absolute
          left: 10px
          top: 11px
          width: 22px
          height: 22px
          background: url('20170101-5.png') no-repeat center
          background-size: 22px
        em.wid-30
          display: inline-block
          width: 16px
          height: 12px
          margin: 0 3px
        em.wid-60
          display: inline-block
          width: 28px
          height: 12px
          margin: 0 3px
        em.wid-120
          display: inline-block
          width: 70px
          height: 12px
          margin: 0 3px
        .contract-txt
          margin: 0 20px 20px 20px
          background: #fff
          border-radius: 10px
          box-shadow:0 1px 8px -3px #ccc
        .contract-txt p
          padding: 0 10px
          line-height: 24px
          font-size: 12px
          color: #666
          padding-top: 9px
          font-family: 'sell'
        .contract-txt p.pt-none
          padding-top: 0
        .txt-fw-700
          font-weight: 700
        .contract-txt p.txt-fw-700
          padding-bottom: 9px
          color: #333
        .contract-txt p.text-indnt-2
          padding-left: 2.5em
          position: relative
        .contract-txt p.text-indnt-2-2
          padding-left: 3em
        .contract-txt p.text-indnt-2-3
          padding-left: 3.5em
        .contract-txt p.text-indnt-2
          padding-top: 2px
        .text-indnt-2 span
          display: block
          position: absolute
          left: 10px
          top: 2px
        .con-foot-list
          padding-bottom: 11px
        .con-foot-list ul
          overflow: hidden
        .con-foot-list ul li
          width: 50%
          float: left
</style>
