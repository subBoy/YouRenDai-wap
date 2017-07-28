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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/assets',
      component: Assets
    },
    {
      path: '/user-center',
      component: Usercenter
    },
    {
      path: '/notice',
      component: Notice
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
    }
  ]
})

