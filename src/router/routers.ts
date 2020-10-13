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
    path: '/work',
    name: 'work',

    meta: {
      hideInMenu: false,
      title: '任务管理',
      icon: 'icon-dingdan'
      // access: ['admin:order']
    },
    component: Main,
    children: [
      {
        path: 'edit',
        name: 'edit',

        meta: {
          title: '任务编辑',
          hideInMenu: false
        },
        component: () => import('@/views/order/order/index.vue')
      }, {
        path: 'see',
        name: 'see',
        meta: {
          title: '任务查看',
          hideInMenu: false

        },
        component: () => import('@/views/order/store/index.vue')

      },
      {
        path: 'browse',
        name: 'browse',
        meta: {
          title: '任务浏览',
          hideInMenu: false

        },
        component: () => import('@/views/order/store/index.vue')

      }

    ]
  },
  {
    path: '/mytask',
    name: 'mytask',

    meta: {
      hideInMenu: false,
      title: '我的任务'
    },
    component: Main,
    children: [
      {
        path: 'videoup',
        name: 'videoup',
        meta: {
          title: '影像上传',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      }, {
        path: 'subscribe',
        name: 'subscribe',

        meta: {
          title: '我的订阅',
          hideInMenu: false
        },

        component: () => import('@/views/warehouse/list/index.vue')

      }

    ]
  },
  {

    path: '/task',
    name: 'task',
    meta: {
      title: '作业指导',
      hideInMenu: false

    },
    component: Main,
    children: [
      {
        path: 'position',
        name: 'position',
        meta: {
          title: '部位维护',
          hideInMenu: false

          // access:[]
        },
        component: () => import('@/views/resource/equipment/care/index.vue')

      }, {
        path: 'procedure',
        name: 'procedure',
        meta: {
          title: '工序维护',
          hideInMenu: false
          // access:[]
        },
        component: () => import('@/views/resource/equipment/checklist/index.vue')

      }, {
        path: 'technology',
        name: 'technology',
        meta: {
          title: '工艺维护',
          hideInMenu: false
          // access:[]
        },
        component: () => import('@/views/resource/equipment/checklist/index.vue')

      }, {
        path: 'tasks',
        name: 'tasks',
        meta: {
          title: '作业维护',
          hideInMenu: false
          // access:[]
        },
        component: () => import('@/views/resource/equipment/checklist/index.vue')

      }]

  },
  {
    path: '/sysp',
    name: 'sysp',

    meta: {
      hideInMenu: false,
      title: '系统参数'
    },
    component: Main,
    children: [
      {
        path: 'timer',
        name: 'timer',
        meta: {
          title: '拍摄时长',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      }
    ]
  },
  {
    path: '/system',
    name: 'system',

    meta: {
      hideInMenu: false,
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'dep',
        name: 'dep',
        meta: {
          title: '部门维护',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色维护',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      },
      {
        path: 'users',
        name: 'users',
        meta: {
          title: '用户维护',
          hideInMenu: false
        },
        component: () => import('@/views/warehouse/personlist/index.vue')

      }
    ]
  }
]
