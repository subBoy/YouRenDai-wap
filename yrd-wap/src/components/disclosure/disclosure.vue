<template>
  <div class="disclosure-wrapper" @touchmove.prevent>
    <m-header :titleTxt="titleTxt" :isShow="isShow" :opcity="opcity" v-show="isWap" style="display: none"></m-header>
    <b-scroll class="disclosure-group" ref="disclosureScroll" :style="positionTop">
      <div class="disclosure-scroll">
        <div class="disclosure-banner">
          <img src="./banner.jpg" width="100%">
        </div>
        <div class="disclosure-content">
          <div class="disclosure-content-group-1" :class="{'show-all': status1}">
            <div class="stair-title border-1px-b">
              <span class="title-txt">基本信息</span>
              <span class="title-btn" v-show="status1" @click="changstatus1">收起全部</span>
            </div>
            <div class="second-title">工商信息</div>
            <div class="disclosure-ct-list">
              <ul class="list-wrapper">
                <li class="ct-item">
                  <span class="ct-item-title">平台名称</span>
                  <span class="ct-item-desc">安信卓越投资管理(北京)有限公司</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">平台简称</span>
                  <span class="ct-item-desc">有人贷</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">统一社会信用代码</span>
                  <span class="ct-item-desc">91110105069564306U</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">注册/实缴资本</span>
                  <span class="ct-item-desc">120000000 元</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">注册地址</span>
                  <span class="ct-item-desc">北京市朝阳区王四营甲 2 号观 107 号</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">联系地址</span>
                  <span class="ct-item-desc">北京市朝阳区王四营甲 2 号观 107 号</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">成立时间</span>
                  <span class="ct-item-desc">2013 年 06 月 05 日</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">经营期限</span>
                  <span class="ct-item-desc">2013 年 06 月 05 日-2033 年 06 月 04 日</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">经营状态</span>
                  <span class="ct-item-desc">开业</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">法定代表人</span>
                  <span class="ct-item-desc">王一鲁</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">经营范围</span>
                  <span class="ct-item-desc">投资管理；投资咨询；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料  ) ;  企业管理咨询；企业策划；承办展览展示活动。（“1、未经有关部门批准，不得以公开方式募集资金；2、 不得公开开展证券类产品和金融衍生品交易活动 ；3、不得发放贷款； 4、不得对所投资企业以外的其他企业提供担保； 5、不得向投资者承诺投资本金不受损失或者承诺最低收益” ； 依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动。）</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">营业执照</span>
                  <span class="ct-item-desc">
                    <router-link tag="a" class="item-desc-btn" :to="listPath1">查看详情</router-link>
                  </span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">股东信息</span>
                  <span class="ct-item-desc">
                    <router-link tag="a" class="item-desc-btn" :to="listPath6">查看详情</router-link>
                  </span>
                </li>
              </ul>
            </div>
            <div class="second-title">平台信息</div>
            <div class="disclosure-ct-list">
              <ul class="list-wrapper">
                <li class="ct-item">
                  <span class="ct-item-title">平台地址</span>
                  <span class="ct-item-desc">
                    <a href="https://www.yourendai.com" class="call-me">https://www.yourendai.com</a>
                  </span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">平台简称</span>
                  <span class="ct-item-desc">有人贷</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">APP 应用</span>
                  <span class="ct-item-desc">有人贷</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">微信公众号</span>
                  <span class="ct-item-desc">有人 E 助手（anxin-yourendai）<br/>有人微助手（yourendai2014）</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">联系方式</span>
                  <span class="ct-item-desc">
                    <a href="tel:010-53320601" class="call-me">010-53320601</a>
                  </span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">客服电话</span>
                  <span class="ct-item-desc">
                    <a href="tel:400-663-9190" class="call-me">400-663-9190</a>
                  </span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">服务邮箱</span>
                  <span class="ct-item-desc">
                    <a href="mailto:help@yourendai.com" class="email-styl" v-if="isWap">help@yourendai.com</a>
                    <a class="email-styl" v-else>help@yourendai.com</a>
                  </span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">商务合作</span>
                  <span class="ct-item-desc"><a href="tel:010-53358917" class="call-me">010-53358917</a></span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">投诉举报电话</span>
                  <span class="ct-item-desc">
                    <a href="tel:400-663-9190" class="call-me">400-663-9190</a>
                  </span>
                </li>
              </ul>
            </div>
            <div class="second-title">备案信息</div>
            <div class="disclosure-ct-list">
              <ul class="list-wrapper">
                <li class="ct-item" v-if="disData && disData.filingInformation">
                  <span class="ct-item-title">电信业务经营许可信息</span>
                  <span class="ct-item-desc" v-html="disData.filingInformation.f1"></span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">资金存管银行</span>
                  <span class="ct-item-desc">新网银行</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">存管上线时间</span>
                  <span class="ct-item-desc">2017 年 6 月 21 日</span>
                </li>
                <!-- <li class="ct-item">
                  <span class="ct-item-title">公安机关核发的网站备案图标及编号</span>
                  <span class="ct-item-desc">
                    <span class="desc-has-icon">公安网备 31011502000216</span>
                  </span>
                </li> -->
                <li class="ct-item" v-if="disData && disData.filingInformation">
                  <span class="ct-item-title">在地方金融局的备案登记信息</span>
                  <span class="ct-item-desc" v-html="disData.filingInformation.f2"></span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">网站 ICP 备案号</span>
                  <span class="ct-item-desc">京 ICP 备 13035874 号-2</span>
                </li>
                <li class="ct-item">
                  <span class="ct-item-title">信息系统安全等级保护备案证明信息</span>
                  <span class="ct-item-desc">
                    <span>证书编号：11010113021-0001<br/>
                      <router-link tag="a" class="item-desc-btn styl" :to="listPath3">查看详情</router-link>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="disclosure-boos-qm">法定代表人签名：</div>
          </div>
          <div class="show-all-btn-wrapper">
            <span class="show-all-btn" v-show="!status1" @click="changstatus1">展开全部</span>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="disclosure-content-group-2" :class="{'show-all': status2}">
            <div class="stair-title border-1px-b">
              <span class="title-txt">治理信息</span>
              <span class="title-btn" v-show="status2" @click="changstatus2">收起全部</span>
            </div>
            <div class="second-title">组织架构</div>
            <div class="disclosure-ct-list">
              <div class="arch-head">
                <img class="head-img" src="./icon-1.png" width="65px">
              </div>
              <div class="arch-content">
                <img class="head-img" src="./body.jpg" width="100%">
              </div>
            </div>
            <div class="second-title">管理团队</div>
            <div class="disclosure-ct-list">
              <div class="ct-group">
                <div class="swiper-container" id="swiper-container02">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="./ct-3-1.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-2.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-3.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-4.png" width="100%">
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-3-5.png" width="100%">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-next next-btn"></div>
                <div class="swiper-button-prev prev-btn"></div>
              </div>
            </div>
            <div class="second-title">从业人员</div>
            <p class="de-staff-desc" v-if="disData && disData.filingInformation">截至{{disData.practitioners.practitionersInfo.statisticalTime}}共{{disData.practitioners.practitionersInfo.practitionersNumber}}名员工，人员构成，年龄结构、学历结构分布如下：</p>
            <div class="staff-svg-wrapper" v-if="disData && disData.filingInformation">
              <div class="staff-svg-group">
                <div class="staff-svg-box">
                  <div class="staff-svg-item" v-html="run(practitionersList)">
                  </div>
                  <div class="staff-svg-desc">
                    <div class="staff-svg-desc-list">
                      <div class="staff-svg-desc-item" v-for="item in practitionersList">
                        <span class="item-nuit" :style="setBg(item.bgCor)"></span>
                        <span class="item-desc-txt" v-html="item.distributionType"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="staff-svg-item-tle">
                  <p class="staff-svg-item-tle-txt">
                    <span class="tle-nuit"></span>
                    <span class="tle-txt">人员分布：IT人员与非IT人员</span>
                  </p>
                </div>
              </div>
              <div class="staff-svg-group">
                <div class="staff-svg-box">
                  <div class="staff-svg-item" v-html="run(ageList)">
                  </div>
                  <div class="staff-svg-desc">
                    <div class="staff-svg-desc-list">
                      <div class="staff-svg-desc-item" v-for="item in ageList">
                        <span class="item-nuit" :style="setBg(item.bgCor)"></span>
                        <span class="item-desc-txt" v-html="item.distributionType"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="staff-svg-item-tle">
                  <p class="staff-svg-item-tle-txt">
                    <span class="tle-nuit"></span>
                    <span class="tle-txt">年龄分布：20-25 26-30 31-35 36岁以上</span>
                  </p>
                </div>
              </div>
              <div class="staff-svg-group">
                <div class="staff-svg-box">
                  <div class="staff-svg-item" v-html="run(educationList)">
                  </div>
                  <div class="staff-svg-desc">
                    <div class="staff-svg-desc-list">
                      <div class="staff-svg-desc-item" v-for="item in educationList">
                        <span class="item-nuit" :style="setBg(item.bgCor)"></span>
                        <span class="item-desc-txt" v-html="item.distributionType"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="staff-svg-item-tle">
                  <p class="staff-svg-item-tle-txt">
                    <span class="tle-nuit"></span>
                    <span class="tle-txt">学历分布：大专及以下 本科 硕士及博士以上</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="disclosure-hr"></div>
            <div class="disclosure-boos-qm">法定代表人签名：</div>
          </div>
          <div class="show-all-btn-wrapper">
            <span class="show-all-btn" v-show="!status2" @click="changstatus2">展开全部</span>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="disclosure-content-group-3" :class="{'show-all': status3}">
            <div class="stair-title border-1px-b">
              <span class="title-txt">法律法规</span>
              <span class="title-btn" v-show="status3" @click="changstatus3">收起全部</span>
            </div>
            <div class="second-title">监管文件</div>
            <div class="disclosure-ct-list">
              <div class="ct-group">
                <div class="swiper-container" id="swiper-container03">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="./ct-5-1.png" width="100%">
                      <ul class="fileBox">
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/07.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/08.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/09.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/10.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/11.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/12.pdf"></a>
                        </li>
                      </ul>
                    </div>
                    <div class="swiper-slide">
                      <img src="./ct-5-2.png" width="100%">
                      <ul class="fileBox">
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/01.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/02.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/03.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/04.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/05.pdf"></a>
                        </li>
                        <li>
                          <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/06.pdf"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="swiper-button-next next-btn-1"></div>
                <div class="swiper-button-prev prev-btn-1"></div>
              </div>
            </div>
            <div class="second-title">风险控制</div>
            <div class="disclosure-ct-list">
              <div class="ct-group">
                <img src="./ct-6.png" width="100%">
                <ul class="fileBox">
                  <li>
                    <router-link tag="a" :to="listPath3"></router-link>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/13.pdf"></a>
                  </li>
                  <li>
                    <router-link tag="a" :to="listPath1"></router-link>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/15.pdf"></a>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/16.pdf"></a>
                  </li>
                  <li>
                    <a href="/dist/pdf/web/viewer.html?file=/loan/blacklist/pdf/14.pdf"></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="disclosure-hr"></div>
            <div class="disclosure-boos-qm">法定代表人签名：</div>
          </div>
          <div class="show-all-btn-wrapper">
            <span class="show-all-btn" v-show="!status3" @click="changstatus3">展开全部</span>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">审计信息</span>
          </div>
          <div class="disclosure-ct-list">
            <ul class="ct-item-sj-group">
              <router-link class="ct-item-sj" tag="li" :to="listPath7">
                <img class="ct-item-sj-img" src="./ct-7-1.png" width="80%">
              </router-link>
              <li class="ct-item-sj">
                <img class="ct-item-sj-img" src="./ct-7-2.png" width="80%">
              </li>
            </ul>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">运营数据</span>
          </div>
          <div class="disclosure-ct-list">
            <router-link class="run-data" tag="div" :to="listPath2">
              <img class="run-data-img" @load="refresh" src="./ct-8.png" width="88%">
            </router-link>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">对外公告</span>
          </div>
          <div class="disclosure-ct-list">
            <router-link class="run-data" tag="div" :to="listPath4">
              <img class="run-data-img" @load="refresh" src="./ct-9.png" width="88%">
            </router-link>
          </div>
        </div>
        <div class="disclosure-content">
          <div class="stair-title border-1px-b">
            <span class="title-txt">信批确认函</span>
          </div>
          <div class="disclosure-ct-list">
            <router-link class="run-data" tag="div" :to="listPath5">
              <img class="run-data-img" @load="refresh" src="./ct-10.png" width="88%">
            </router-link>
          </div>
        </div>
        <div class="hr-20"></div>
      </div>
    </b-scroll>
    <transition name="slide">
      <router-view :isWap="isWap" :positionTop="positionTop"></router-view>
    </transition>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import BScroll from 'base/scroll/scroll'
  import {getDisclosureInfo} from 'api/user'

  import 'animate.css/animate.css'
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper/dist/js/swiper.js'

  export default {
    data () {
      return {
        titleTxt: '信息披露',
        isShow: false,
        opcity: 1,
        mySwiper2: '',
        mySwiper3: '',
        status1: false,
        status2: false,
        status3: false,
        isWap: false,
        positionTop: 'top: 0px',
        listPath1: '/disclosure/qualification',
        listPath2: '/disclosure/operate-data',
        listPath3: '/disclosure/sadety',
        listPath4: '/disclosure/public-notice',
        listPath5: '/disclosure/confirmation-letter',
        listPath6: '/disclosure/partner',
        listPath7: '/disclosure/audit',
        listPath8: '/disclosure/compliance',
        disData: {},
        practitionersList: [],
        educationList: [],
        ageList: []
      }
    },
    created () {
      const pathVal = this.$route.path
      if (pathVal.indexOf('app') >= 0) {
        this.isWap = false
        this.positionTop = 'top: 0px'
        this.listPath1 = '/app-disclosure/qualification'
        this.listPath2 = '/app-disclosure/operate-data'
        this.listPath3 = '/app-disclosure/sadety'
        this.listPath4 = '/app-disclosure/public-notice'
        this.listPath5 = '/app-disclosure/confirmation-letter'
        this.listPath6 = '/app-disclosure/partner'
        this.listPath7 = '/app-disclosure/audit'
        this.listPath8 = '/app-disclosure/compliance'
      } else {
        this.positionTop = 'top: 44px'
        this.isWap = true
        this.listPath1 = '/disclosure/qualification'
        this.listPath2 = '/disclosure/operate-data'
        this.listPath3 = '/disclosure/sadety'
        this.listPath4 = '/disclosure/public-notice'
        this.listPath5 = '/disclosure/confirmation-letter'
        this.listPath6 = '/disclosure/partner'
        this.listPath7 = '/disclosure/audit'
        this.listPath8 = '/disclosure/compliance'
      }
      this._getDisclosureInfo()
      setTimeout(() => {
        this._swiper()
      }, 20)
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.$refs.disclosureScroll.refresh()
        }, 20)
      },
      setBg (bgc) {
        const bg = bgc
        return `background-color: ${bg}`
      },
      _getDisclosureInfo () {
        getDisclosureInfo().then((res) => {
          this.disData = res.data
          let _practitionersList = this.disData.practitioners.practitionersList
          this.practitionersList.push(Object.assign(_practitionersList[1], {bgCor: '#ff4d49'}))
          this.practitionersList.push(Object.assign(_practitionersList[0], {bgCor: '#5962ff'}))
          let _ageList = this.disData.practitioners.ageList
          this.ageList.push(Object.assign(_ageList[1], {bgCor: '#ff4d49'}))
          this.ageList.push(Object.assign(_ageList[2], {bgCor: '#5962ff'}))
          this.ageList.push(Object.assign(_ageList[3], {bgCor: '#f7622e'}))
          this.ageList.push(Object.assign(_ageList[0], {bgCor: '#ffc700'}))
          let _educationList = this.disData.practitioners.educationList
          this.educationList.push(Object.assign(_educationList[2], {bgCor: '#5962ff'}))
          this.educationList.push(Object.assign(_educationList[0], {bgCor: '#f7622e'}))
          this.educationList.push(Object.assign(_educationList[1], {bgCor: '#ffc700'}))
        })
      },
      run (itemArr) {
        let itemHtml = '<svg class="svg-wrapper" version="1.1" xmlns="http://www.w3.org/2000/svg" width="2000" height="2000"><circle cx="1000" cy="1000" r="600" fill="#e1f0ff"/>'
        const _this = this
        let rotateDeg = 0
        for (let i = 0; i < itemArr.length; i++) {
          (function (i) {
            let _deg = parseFloat(itemArr[i].percentage) * 3.6
            if (itemArr[i - 1]) {
              rotateDeg += parseFloat(itemArr[i - 1].percentage) * 3.6
            }
            itemHtml += _this._drawArcByRadiusDeg(1000, 400, 600, _deg, rotateDeg, 1, itemArr[i].bgCor, itemArr[i].percentage)
          })(i)
        }
        itemHtml += '<circle cx="1000" cy="1000" r="500" fill="#fff"/></svg>'
        return itemHtml
      },
      _drawArcByRadiusDeg (startX, startY, r, deg, rotateDeg, clockwise, bgCor, textTxt) {
        let cw = typeof clockwise !== 'undefined' ? clockwise : 1
        let x = r * (Math.sin(deg * Math.PI / 180) + 1) + 400
        let y = (cw === 1 ? 1 : -1) * r * (1 - Math.cos(deg * Math.PI / 180)) + 400
        let bigOrSmall = deg > 180 ? 1 : 0
        let line = ` L 1000 1000 L ${startX} ${startY} Z`
        const bdeg = (deg / 2) + rotateDeg
        const textVal = textTxt
        let Txtx = r * (Math.sin(bdeg * Math.PI / 180) + 1) + 400
        let Txty = (cw === 1 ? 1 : -1) * r * (1 - Math.cos(bdeg * Math.PI / 180)) + 400
        let addX = 0
        let addY = 0
        if (Txtx > 400 && Txtx < 1000 && Txty > 400 && Txty < 1000) {
          addX = -240
          addY = -50
        }
        if (Txtx > 1000 && Txtx < 1600 && Txty > 400 && Txty < 1000) {
          addX = 240
          addY = -50
        }
        if (Txtx > 400 && Txtx < 1000 && Txty > 1000 && Txty < 1600) {
          addX = -240
          addY = 50
        }
        if (Txtx >= 1000 && Txtx <= 1600 && Txty >= 1000 && Txty <= 1600) {
          addX = 240
          addY = 50
        }
        if (Txtx >= 800 && Txtx <= 1200 && Txty < 1000) {
          addX = 0
          addY = -60
        }
        if (Txtx >= 800 && Txtx <= 1200 && Txty > 1000) {
          addX = 0
          addY = 60
        }
        if (Txtx < 1000 && Txty >= 800 && Txty <= 1200) {
          addX = -250
          addY = 0
        }
        if (Txtx > 1000 && Txty >= 800 && Txty <= 1200) {
          addX = 250
          addY = 0
        }
        Txtx = Txtx + addX
        Txty = Txty + addY
        return `<path d="M ${startX} ${startY} A ${r} ${r} 1 ${bigOrSmall} ${cw} ${x} ${y} ${line}" transform="rotate(${rotateDeg}, 1000, 1000)" stroke="${bgCor}" fill="${bgCor}" fill-opacity="1"/><path fill="${bgCor}" transform="rotate(${bdeg}, 1000, 1000)" stroke="#fff" d="M 970 350 L 1030 350 L 1000 450  Z"/><text x="${Txtx}" y="${Txty}" fill="${bgCor}" text-anchor="middle" style="font-size:100px;">${textVal}</text>`
      },
      changstatus1 () {
        this.status1 = !this.status1
      },
      changstatus2 () {
        this.status2 = !this.status2
      },
      changstatus3 () {
        this.status3 = !this.status3
      },
      _swiper () {
        this.mySwiper2 = new Swiper('#swiper-container02', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn'
          }
        })
        this.mySwiper3 = new Swiper('#swiper-container03', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.next-btn-1',
            prevEl: '.prev-btn-1'
          }
        })
      }
    },
    watch: {
      status1: function (newVal, oldVal) {
        this.refresh()
      },
      status2: function (newVal, oldVal) {
        this.refresh()
      },
      status3: function (newVal, oldVal) {
        this.refresh()
      }
    },
    components: {
      MHeader,
      BScroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .disclosure-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 999
    background-color: #f2fdff
    .hr-20
      height: 20px
    .disclosure-group
      position: absolute
      top: 44px
      right: 0
      bottom: 0
      left: 0
      .disclosure-content
        margin: 20px auto 0
        padding-bottom: 20px
        width: 90%
        border-radius: 10px
        background-color: #fff
        box-shadow: 0px 0px 10px -2px #ccc
        .disclosure-hr
          width: 100%
          height: 1px
          background-color: #f0f0f0
        .disclosure-boos-qm
          display: flex
          align-items: center
          justify-content: flex-end
          margin: 20px 20px 0
          padding-right: 90px
          height: 36px
          background-position: right center 
          background-repeat: no-repeat
          background-size: 65px auto 
          background-image: url(./qm.png)
          font-size: 12px
        .disclosure-content-group-1
          overflow: hidden
          height: 131px
          &.show-all
            height: auto
        .disclosure-content-group-2
          overflow: hidden
          height: 118px
          &.show-all
            height: auto
        .disclosure-content-group-3
          overflow: hidden
          height: 145px
          &.show-all
            height: auto
        .show-all-btn-wrapper
          padding-top: 15px
          .show-all-btn
            extend-click()
            display: block
            margin: 0 auto
            width: 48px
            font-size: 12px
            color: #323232
            padding-right: 15px
            background-image: url(./show-down.png)
            background-repeat: no-repeat
            background-size: auto 8px
            background-position: center right
        .stair-title
          padding: 0 10px
          line-height: 30px
          border-1px-b(#f0f0f0)
          font-size: 12px
          color: #323232
          overflow: hidden
          .title-txt
            float: left
            display: block
            padding-left: 7px
            background-image: url(./title-icon.png)
            background-repeat: no-repeat
            background-size: auto 10px
            background-position: center left
          .title-btn
            extend-click()
            float: right
            display: block
            padding-right: 15px
            background-image: url(./hide-up.png)
            background-repeat: no-repeat
            background-size: auto 8px
            background-position: center right
        .second-title
          padding: 0 10px
          line-height: 30px
          font-size: 12px
          color: #323232
        .de-staff-desc
          padding: 0 10px
          line-height: 22px
          font-size: 10px
          color: #323232
        .staff-svg-wrapper
          padding-bottom: 30px
          .staff-svg-group
            position: relative
            .staff-svg-item-tle
              display: flex
              position: absolute
              left: 0px
              right: 0px
              top: auto
              bottom: -10px
              height: 40px
              justify-content: center
              align-items: center
              .staff-svg-item-tle-txt
                display: flex
                align-items: center
                .tle-nuit
                  display: block
                  flex: 0 0 10px
                  margin-right: 10px
                  width: 10px
                  height: 10px
                  border-radius: 50%
                  background-color: #ff4d49
                .tle-txt
                  flex: 1
                  font-size: 12px
          .staff-svg-box
            position: relative
            margin: 0 auto
            width: 200px
            height: 200px
            .staff-svg-desc
              display: flex
              position: absolute
              top: 50px
              right: 50px
              bottom: 50px
              left: 50px
              align-items: center
              justify-content: center
              .staff-svg-desc-item
                display: flex
                align-items: center
                padding: 5px 0
                .item-nuit
                  display: block
                  flex: 0 0 5px
                  margin-right: 5px
                  width: 5px
                  height: 5px
                  border-radius: 50%
                .item-desc-txt
                  flex: 1
                  font-size: 10px
            .staff-svg-item
              margin: 0 auto
              width: 200px
              height: 200px
              .svg-wrapper
                transform: scale(0.1)
                transform-origin: 0 0
        .disclosure-ct-list
          padding: 0 10px
          .list-wrapper
            border: 1px solid #f0f0f0
            border-bottom: none
            .ct-item
              display: flex
              line-height: 14px
              border-bottom: 1px solid #f0f0f0
              font-size: 8px
              color: #323232
              .ct-item-title
                display: flex
                flex: 1
                padding: 10px 10px 10px 20px
                border-right: 1px solid #f0f0f0
                align-items: center
                background-color: #f0f5fc
              .ct-item-desc
                display: flex
                flex: 2
                padding: 10px 10px 10px 20px
                align-items: center
                .call-me
                  color: #323232
                .item-desc-btn
                  extend-click()
                  display: flex
                  width: 60px
                  height: 20px
                  background-color: #fd6e54
                  color: #fff
                  justify-content: center
                  align-items: center
                  border-radius: 5px
                  &.styl
                    margin-top: 7px
                .email-styl
                  line-height: 8px
                  color: #fd6e54
                  border-bottom: 1px solid #fd6e54
                .desc-has-icon
                  display: block
                  padding-left: 15px
                  background-image: url(./label.jpg)
                  background-repeat: no-repeat
                  background-size: auto 15px
                  background-position: center left
          .ct-item-sj-group
            display: flex
            .ct-item-sj
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              .ct-item-sj-img
                padding-top: 20px
          .run-data
            display: flex
            justify-content: center
            align-items: center
            .run-data-img
              padding-top: 20px
          .arch-head
            position: relative
            text-align: center
            z-index: 1
            .head-img
              margin: 0 auto
          .arch-content
            margin-top: -8px
    .swiper-container
      width: 100%
      height: 100%
    .swiper-slide
      position: relative
      text-align: center
      font-size: 18px
      overflow: hidden
    .ct-title-wrapper
      position: absolute
      top: 32.5%
      left: 0
      transform: translateY(-50%)
      line-height: 30px
      font-size: 15px
      color: #fe4c42
      width: 100%
      text-align: center
    .ct-wrapper
      position: relative
      margin-top: -10%
    .ct-group
      position: relative
      width: 100%
    .ct-group .next-btn, .ct-group .next-btn-1
      background: url("next-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      right: 0
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .ct-group .prev-btn, .ct-group .prev-btn-1
      background: url("prev-1.png") no-repeat
      background-size: 8px 16px
      background-position: center
      width: 30px
      height: 30px
      animation: unset
      top: 50%
      transform: translateY(-50%)
      z-index: 10
    .fileBox
      position: absolute
      top: -2%
      left: 0
      width: 100%
      height: 100%
      z-index: 1
    .fileBox li
      float: left
      width: 50%
      height: 33.333%
    .fileBox li a
      display: block
      width: 100%
      height: 100%
</style>
