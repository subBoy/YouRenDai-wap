import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Assets from 'components/assets/assets'
import Usercenter from 'components/user-center/user-center'
import Notice from 'components/notice/notice'
import Productlist from 'components/product-list/product-list'
import SignIn from 'components/sign-in/sign-in'
import SignUp from 'components/sign-up/sign-up'
import Forget from 'components/forget/forget'
import productSubscribe from 'components/product-subscribe/product-subscribe'
import setUser from 'components/set-user/set-user'
import investRecord from 'components/invest-record/invest-record'
import Packs from 'components/packs/packs'
import Invite from 'components/invite/invite'
import Disclosure from 'components/disclosure/disclosure'
import CustomerService from 'components/customer-service/customer-service'

Vue.use(Router)

export default new Router({
  routes: [
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
          component: productSubscribe
        },
        {
          path: 'notice',
          component: Notice
        }
      ]
    },
    {
      path: '/assets',
      component: Assets
    },
    {
      path: '/user-center',
      component: Usercenter,
      children: [
        {
          path: 'assets',
          component: Assets
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
          component: Disclosure
        },
        {
          path: 'customer-service',
          component: CustomerService
        }
      ]
    },
    {
      path: '/product-list',
      component: Productlist,
      children: [
        {
          path: 'subscribe/:id',
          component: productSubscribe
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
    }
  ]
})

