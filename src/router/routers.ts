import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Main from '@/components/main.vue'
import ParentView from '../components/parentView'
export default [
  {
    path: '/signin',
    name: 'signin',
    title: '登录',
    meta: {
      hideInMenu: true
    },
    component: Signin

  },
  {
    path: '/',
    name: 'home',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'home', // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/order',
    name: 'order',

    meta: {
      hideInMenu: false,
      title: '生产管理',
      icon: 'icon-dingdan',
      access: ['admin:order']
    },
    component: Main,
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',

        meta: {
          title: '生产订单',
          hideInMenu: false,
          access: ['admin:order']
        },

        component: () => import('@/views/order/order/index.vue')

      }, {
        path: 'storelist',
        name: 'storelist',

        meta: {
          title: '门店管理',
          hideInMenu: false,
          access: ['admin:store']
        },

        component: () => import('@/views/order/store/index.vue')

      }

    ]
  },
  {
    path: '/warehouse',
    name: 'warehouse',

    meta: {
      hideInMenu: false,
      title: '仓库管理'
    },
    component: Main,
    children: [
      {
        path: 'warehousepersonlist',
        name: 'warehousepersonlist',
        meta: {
          title: '仓库人员管理',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      }, {
        path: 'warehouselist',
        name: 'warehouselist',

        meta: {
          title: '仓库管理',
          hideInMenu: false
        },

        component: () => import('@/views/warehouse/list/index.vue')

      }

    ]
  },
  {
    path: '/resource',
    name: 'resource',

    meta: {
      hideInMenu: true,
      title: '资源维护',
      access: ['admin:resource']
    },
    component: Main,
    children: [

      {
        path: 'equipment',
        name: 'equipment',
        meta: {
          title: '设备类型',
          hideInMenu: false,
          access: ['admin:equipment']
        },
        component: ParentView,
        children: [
          {
            path: 'care',
            name: 'care',
            meta: {
              title: '保养维护',
              hideInMenu: false

              // access:[]
            },
            component: () => import('@/views/resource/equipment/care/index.vue')

          }, {
            path: 'check',
            name: 'check',
            meta: {
              title: '点检维护',
              hideInMenu: false
              // access:[]
            },
            component: () => import('@/views/resource/equipment/checklist/index.vue')

          }]

      }

    ]
  }
]
