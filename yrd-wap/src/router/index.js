import Vue from 'vue'
import Router from 'vue-router'

const Recommend = () => import('components/recommend/recommend')
const Assets = () => import('components/assets/assets')
const Usercenter = () => import('components/user-center/user-center')
const Notice = () => import('components/notice/notice')
const Productlist = () => import('components/product-list/product-list')
const SignIn = () => import('components/sign-in/sign-in')
const SignUp = () => import('components/sign-up/sign-up')
const Forget = () => import('components/forget/forget')
const productSubscribe = () => import('components/product-subscribe/product-subscribe')
const setUser = () => import('components/set-user/set-user')
const investRecord = () => import('components/invest-record/invest-record')
const Packs = () => import('components/packs/packs')
const Invite = () => import('components/invite/invite')
const Disclosure = () => import('components/disclosure/disclosure')
const CustomerService = () => import('components/customer-service/customer-service')
const Undefind = () => import('components/undefind/400')
const serverError = () => import('components/undefind/500')
const Recharge = () => import('components/recharge/recharge')
const Withdraw = () => import('components/withdraw/withdraw')
const RealName = () => import('components/real-name/real-name')
const RechargeSuccess = () => import('components/recharge-success/recharge-success')
const WithdrawSuccess = () => import('components/withdraw-success/withdraw-success')
const ToUser = () => import('components/to-user/to-user')
const LatestNews = () => import('components/latest-news/latest-news')
const NewsDetails = () => import('components/news-details/news-details')
const BillList = () => import('components/bill-list/bill-list')
const BillDetails = () => import('components/bill-details/bill-details')
const Platform = () => import('components/platform/platform')
const ShareBack = () => import('components/share-back/share-back')
const NoticeDetails = () => import('components/notice-details/notice-details')
const Contract = () => import('components/contract/contract')
const Contract6 = () => import('components/contract-6/contract-6')
const ProjectInfo = () => import('components/project-info/project-info')
const RepaymentPlan = () => import('components/repayment-plan/repayment-plan')
const RiskWarning = () => import('components/risk-warning/risk-warning')
const Report = () => import('components/report/report')
const Subscription = () => import('components/subscription/subscription')
const Guide = () => import('components/guide/guide')
const InvestorNotice = () => import('components/investor-notice/investor-notice')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: Undefind
    },
    {
      path: '/server-error',
      component: serverError
    },
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: 'subscribe/:id',
          component: productSubscribe,
          children: [
            {
              path: 'contract',
              component: Contract
            },
            {
              path: 'contract-6',
              component: Contract6
            },
            {
              path: 'project-info/:projectId',
              component: ProjectInfo
            },
            {
              path: 'repayment-plan/:projectId',
              component: RepaymentPlan
            },
            {
              path: 'risk-warning',
              component: RiskWarning
            },
            {
              path: 'subscription/:loanMoney/:surplus',
              component: Subscription
            },
            {
              path: 'investor-notice/:loanMoney/:surplus',
              component: InvestorNotice
            }
          ]
        },
        {
          path: 'notice',
          component: Notice,
          children: [
            {
              path: ':id',
              component: NoticeDetails
            }
          ]
        },
        {
          path: 'to-user',
          component: ToUser
        },
        {
          path: 'latest-news',
          component: LatestNews,
          children: [
            {
              path: 'news-details',
              component: NewsDetails
            },
            {
              path: 'bill-details',
              component: BillDetails
            }
          ]
        },
        {
          path: 'platform',
          component: Platform
        },
        {
          path: 'packs',
          component: Packs
        },
        {
          path: 'share-back',
          component: ShareBack
        }
      ]
    },
    {
      path: '/assets',
      component: Assets,
      children: [
        {
          path: 'recharge',
          component: Recharge
        },
        {
          path: 'withdraw',
          component: Withdraw
        },
        {
          path: 'bill-list',
          component: BillList,
          children: [
            {
              path: 'bill-details',
              component: BillDetails
            }
          ]
        }
      ]
    },
    {
      path: '/user-center',
      component: Usercenter,
      children: [
        {
          path: 'assets',
          component: Assets,
          children: [
            {
              path: 'recharge',
              component: Recharge
            },
            {
              path: 'withdraw',
              component: Withdraw
            },
            {
              path: 'bill-list',
              component: BillList,
              children: [
                {
                  path: 'bill-details',
                  component: BillDetails
                }
              ]
            }
          ]
        },
        {
          path: 'set-user',
          component: setUser
        },
        {
          path: 'invest-record',
          component: investRecord
        },
        {
          path: 'packs',
          component: Packs
        },
        {
          path: 'invite',
          component: Invite
        },
        {
          path: 'disclosure',
          component: Disclosure,
          children: [
            {
              path: 'report',
              component: Report
            }
          ]
        },
        {
          path: 'customer-service',
          component: CustomerService
        },
        {
          path: 'recharge',
          component: Recharge
        },
        {
          path: 'withdraw',
          component: Withdraw
        },
        {
          path: 'real-name',
          component: RealName
        }
      ]
    },
    {
      path: '/product-list',
      component: Productlist,
      children: [
        {
          path: 'subscribe/:id',
          component: productSubscribe,
          children: [
            {
              path: 'contract',
              component: Contract
            },
            {
              path: 'contract-6',
              component: Contract6
            },
            {
              path: 'project-info/:projectId',
              component: ProjectInfo
            },
            {
              path: 'repayment-plan/:projectId',
              component: RepaymentPlan
            },
            {
              path: 'risk-warning',
              component: RiskWarning
            },
            {
              path: 'subscription/:loanMoney/:surplus',
              component: Subscription
            },
            {
              path: 'investor-notice/:loanMoney/:surplus',
              component: InvestorNotice
            }
          ]
        }
      ]
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
      component: Guide
    },
    {
      path: '/recharge-success',
      component: RechargeSuccess
    },
    {
      path: '/withdraw-success',
      component: WithdrawSuccess
    }
  ]
})

