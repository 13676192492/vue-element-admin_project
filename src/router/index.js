import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'dashboard',
      noCache: true,
      roles: ['USER', 'ADMIN']
    },
    children: [{
        path: '/index',
        component: () => import('@/views/property/index'),
        name: '首页',
        meta: {
          title: '首页',
          noCache: true,
          roles: ['USER']
        }
      },
      {
        path: '/index',
        component: () => import('@/views/manage/index'),
        name: '首页',
        meta: {
          title: '首页',
          noCache: true,
          roles: ['ADMIN']
        }
      }
    ]
  },
  {
    path: '/spendingOrder',
    component: Layout,
    redirect: '/spendingOrder/index',
    name: '订单管理',
    meta: {
      title: '订单管理',
      icon: 'chart',
      noCache: true
    },
    children: [{
        path: '/spendingOrder/index',
        component: () => import('@/views/spendingOrder/index'),
        name: '消费订单',
        meta: {
          title: '消费订单',
          noCache: true,
          roles: ['USER']
        }
      },
      {
        path: '/rechargeOrder/index',
        component: () => import('@/views/rechargeOrder/index'),
        name: '充值记录',
        meta: {
          title: '充值记录',
          noCache: true,
          roles: ['USER']
        }
      },
      {
        path: '/SpendingOrder/index',
        component: () => import('@/views/adminSpendingOrder/index'),
        name: '消费订单',
        meta: {
          title: '消费订单',
          noCache: true,
          roles: ['ADMIN']
        }
      },
      {
        path: '/RechargeOrder/index',
        component: () => import('@/views/adminRechargeOrder/index'),
        name: '充值记录',
        meta: {
          title: '充值记录',
          noCache: true,
          roles: ['ADMIN']
        }
      }
    ]
  },
  {
    path: '/applicationBill',
    component: Layout,
    redirect: '/applicationBill/index',
    meta: {
      title: '应用话单',
      icon: 'record',
      noCache: true
    },
    children: [{
      path: '/applicationBill/index',
      component: () => import('@/views/applicationBill/index'),
      name: '应用话单',
      meta: {
        title: '应用话单',
        noCache: true,
        roles: ['USER']
      }
    },{
      path: '/adminApplicationBill/index',
      component: () => import('@/views/adminApplicationBill/index'),
      name: '应用话单',
      meta: {
        title: '应用话单',
        noCache: true,
        roles: ['ADMIN']
      }
    } ]
  },
  {
    path: '/phoneBill',
    component: Layout,
    redirect: '/phoneBill/index',
    meta: {
      title: '话单记录',
      icon: 'record',
      noCache: true
    },
    children: [{
        path: '/phoneBill/index',
        component: () => import('@/views/phoneBill/index'),
        name: '话单记录',
        meta: {
          title: '话单记录',
          noCache: true,
          roles: ['USER']
        }
      },
      {
        path: '/PhoneBill/index',
        component: () => import('@/views/adminPhoneBill/index'),
        name: '话单记录',
        meta: {
          title: '话单记录',
          noCache: true,
          roles: ['ADMIN']
        }
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: '账号管理',
    meta: {
      noCache: true,
      icon: 'guide',
      roles: ['ADMIN']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/account/index'),
      name: '账号管理',
      meta: {
        title: '账号管理',
        noCache: true
      }
    }]
  },
  // {
  //   path: '/plotConsumption',
  //   component: Layout,
  //   redirect: '/plotConsumptionRank/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/plotConsumptionRank/index'),
  //       name: '小区消费排名',
  //       meta: { title: '小区消费排名', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/invoice',
    component: Layout,
    meta: {
      title: '发票管理',
      icon: 'invoice',
      roles: ['USER']
    },
    hidden: true,
    children: [{
      path: '/invoice/index',
      component: () => import('@/views/invoice/index'),
      name: '发票管理',
      meta: {
        title: '发票管理'
      }
    }]
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/index',
    hidden: true,
    meta: {
      title: '开票管理',
      icon: 'ticket',
      roles: ['ADMIN']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/ticket/index'),
      name: '开票管理',
      meta: {
        title: '开票管理',
        noCache: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]