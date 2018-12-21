import Vue from 'vue'
import Router from 'vue-router'
import {setHisy, setNexty} from 'common/js/cache'

const Recommend = () => import('components/recommend/recommend')
const Assets = () => import('components/assets/assets')
const Notice = () => import('components/notice/notice')
const Productlist = () => import('components/product-list/product-list')
const Packs = () => import('components/packs/packs')
const Invite = () => import('components/invite/invite')
const Disclosure = () => import('components/disclosure/disclosure')
const Qualification = () => import('components/disclosure/qualification')
const Sadety = () => import('components/disclosure/sadety')
const OperateData = () => import('components/disclosure/operate-data')
const CustomerService = () => import('components/customer-service/customer-service')
const Undefind = () => import('components/undefind/400')
const serverError = () => import('components/undefind/500')
const RealName = () => import('components/real-name/real-name')
const RechargeSuccess = () => import('components/recharge-success/recharge-success')
const WithdrawSuccess = () => import('components/withdraw-success/withdraw-success')
const ToUser = () => import('components/to-user/to-user')
const LatestNews = () => import('components/latest-news/latest-news')
const NewsDetails = () => import('components/news-details/news-details')
const BillList = () => import('components/bill-list/bill-list')
const Platform = () => import('components/platform/platform')
const ShareBack = () => import('components/share-back/share-back')
const NoticeDetails = () => import('components/notice-details/notice-details')
const Contract = () => import('components/contract/contract')
const Contract6 = () => import('components/contract-6/contract-6')
const ProjectInfo = () => import('components/project-info/project-info')
const RepaymentPlan = () => import('components/repayment-plan/repayment-plan')
const RiskWarning = () => import('components/risk-warning/risk-warning')
const Guide = () => import('components/guide/guide')
const InvestSuccess = () => import('components/invest-success/invest-success')
const LatestNewsDetails = () => import('components/latest-news-details/latest-news-details')
const CalendarPayment = () => import('components/calendar/calendar-payment')
const Report = () => import('components/report/report')

const Usercenter = () => import('components/user-center/userCenter')
const SignUp = () => import('components/sign-up/signUp')
const Forget = () => import('components/forget/forgetPd')
const SignIn = () => import('components/sign-in/signIn')
const signDeal = () => import('components/sign-deal/sign-deal')
const reviewResult = () => import('components/review-result/review-result')
const investRecord = () => import('components/invest-record/investRecord')
const setUser = () => import('components/set-user/setUser')
const changeIp = () => import('components/change-ip/change-ip')
const changeIp2 = () => import('components/change-ip/change-ip-2')
const changeIp3 = () => import('components/change-ip/change-ip-3')
const changePd = () => import('components/change-pd/change-pd')
const BillDetails = () => import('components/bill-details/billDetails')
const InvestorNotice = () => import('components/investor-notice/investorNotice')
const Recharge = () => import('components/recharge/newRecharge')
const Withdraw = () => import('components/withdraw/newWithdraw')
const dealRecord = () => import('components/deal-record/deal-record')
const Subscription = () => import('components/subscription/newSubscription')
const publicNotice = () => import('components/disclosure/publicNotice')
const confirmationLetter = () => import('components/disclosure/confirmation-letter')
const Partner = () => import('components/disclosure/partner')
const Audit = () => import('components/disclosure/audit')
const auditDetail = () => import('components/disclosure/audit-detail')
const cashDetail = () => import('components/cash-detail/cash-detail')
const productSubscribe = () => import('components/product-subscribe/productSubscribe')
const Novice = () => import('components/novice/novice')

Vue.use(Router)

const routes = [
  {
    path: '*',
    component: Undefind
  },
  {
    path: '/app/novice',
    component: Novice
  },
  {
    path: '/novice',
    component: Novice
  },
  {
    path: '/cash-detail',
    component: cashDetail
  },
  {
    path: '/recharge',
    component: Recharge
  },
  {
    path: '/withdraw',
    component: Withdraw
  },
  {
    path: '/investor-notice',
    component: InvestorNotice
  },
  {
    path: '/review-result',
    component: reviewResult
  },
  {
    path: '/review-result/:type/:total/:balance',
    component: reviewResult
  },
  {
    path: '/change-ip',
    component: changeIp
  },
  {
    path: '/change-ip/step2',
    component: changeIp2
  },
  {
    path: '/change-ip/step3',
    component: changeIp3
  },
  {
    path: '/change-pd',
    component: changePd
  },
  {
    path: '/set-user',
    component: setUser
  },
  {
    path: '/real-name',
    component: RealName
  },
  {
    path: '/calendar-payment',
    component: CalendarPayment
  },
  {
    path: '/server-error',
    component: serverError
  },
  {
    path: '/sign-deal/:id/:loanMoney/:surplus/:mh/:realName/:idCard',
    component: signDeal
  },
  {
    path: '/app/sign-deal',
    component: signDeal
  },
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/subscribe/:id',
    component: productSubscribe
  },
  {
    path: '/contract',
    component: Contract
  },
  {
    path: '/contract-6',
    component: Contract6
  },
  {
    path: '/project-info/:projectId',
    component: ProjectInfo
  },
  {
    path: '/repayment-plan/:projectId',
    component: RepaymentPlan
  },
  {
    path: '/risk-warning',
    component: RiskWarning
  },
  {
    path: '/subscription/:id/:loanMoney/:surplus/:mh',
    component: Subscription
  },
  {
    path: '/subscription/:id/:loanMoney/:surplus/:mh/:isReady/:realName/:idCard',
    component: Subscription
  },
  {
    path: '/investor-notice/:id/:loanMoney/:surplus/:mh',
    component: InvestorNotice
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/bill-list',
    component: BillList
  },
  {
    path: '/bill-details',
    component: BillDetails
  },
  {
    path: '/assets',
    component: Assets
  },
  {
    path: '/notice-details/:id',
    component: NoticeDetails
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/app/platform',
    component: Platform
  },
  {
    path: '/platform',
    component: Platform
  },
  {
    path: '/deal-record',
    component: dealRecord
  },
  {
    path: '/invest-record',
    component: investRecord
  },
  {
    path: '/packs',
    component: Packs
  },
  {
    path: '/invite',
    component: Invite
  },
  {
    path: '/share-back',
    component: ShareBack
  },
  {
    path: '/user-center',
    component: Usercenter
  },
  {
    path: '/disclosure',
    component: Disclosure,
    children: [
      {
        path: 'partner',
        component: Partner
      },
      {
        path: 'audit',
        component: Audit,
        children: [
          {
            path: 'audit-detail',
            component: auditDetail
          }
        ]
      },
      {
        path: 'qualification',
        component: Qualification
      },
      {
        path: 'sadety',
        component: Sadety
      },
      {
        path: 'public-notice',
        component: publicNotice
      },
      {
        path: 'confirmation-letter',
        component: confirmationLetter
      },
      {
        path: 'operate-data',
        component: OperateData,
        children: [
          {
            path: 'report',
            component: Report
          }
        ]
      }
    ]
  },
  {
    path: '/customer-service',
    component: CustomerService
  },
  {
    path: '/to-user',
    component: ToUser
  },
  {
    path: '/latest-news',
    component: LatestNews
  },
  {
    path: '/news-details',
    component: NewsDetails
  },
  {
    path: '/latest-news-details/:messageId',
    component: LatestNewsDetails
  },
  {
    path: '/product-list',
    component: Productlist
  },
  {
    path: '/signIn',
    component: SignIn
  },
  {
    path: '/signUp',
    component: SignUp
  },
  {
    path: '/signUp/:id',
    component: SignUp
  },
  {
    path: '/forget',
    component: Forget
  },
  {
    path: '/guide',
    meta: {
      requireAuth: true
    },
    component: Guide
  },
  {
    path: '/recharge-success',
    component: RechargeSuccess
  },
  {
    path: '/withdraw-success',
    component: WithdrawSuccess
  },
  {
    path: '/invest-success',
    component: InvestSuccess
  },
  {
    path: '/app-disclosure',
    component: Disclosure,
    children: [
      {
        path: 'partner',
        component: Partner
      },
      {
        path: 'audit',
        component: Audit
      },
      {
        path: 'audit',
        component: Audit,
        children: [
          {
            path: 'audit-detail',
            component: auditDetail
          }
        ]
      },
      {
        path: 'qualification',
        component: Qualification
      },
      {
        path: 'sadety',
        component: Sadety
      },
      {
        path: 'public-notice',
        component: publicNotice
      },
      {
        path: 'confirmation-letter',
        component: confirmationLetter
      },
      {
        path: 'operate-data',
        component: OperateData,
        children: [
          {
            path: 'report',
            component: Report
          }
        ]
      }
    ]
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  setHisy(from.path)
  setNexty(to.path)
  next()
})

export default router
