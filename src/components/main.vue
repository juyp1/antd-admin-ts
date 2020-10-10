<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="logo">
        <img src="../assets/logo.png"
             alt="">
      </div>
      <Menus :routers="routers"
             :nowpath="state.nownav"
             @menuclick="handleitem" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="21">
            <div style="padding-left:20px;padding-top:20px">
              <a-breadcrumb>
                <a-breadcrumb-item>{{state.nownav.ptitle}}</a-breadcrumb-item>
                <a-breadcrumb-item v-if="state.nownav.title!='首页'">
                  {{state.nownav.title}}
                </a-breadcrumb-item>
                <a-breadcrumb-item v-if="state.nownav.ctitle!=''">{{state.nownav.ctitle}}</a-breadcrumb-item>
              </a-breadcrumb>

            </div>
          </a-col>
          <a-col :span="3">
            <a-dropdown-button>
              欢迎你-admin
              <template v-slot:overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <icon-font type="icon-xiugaimima" />修改密码
                  </a-menu-item>
                  <a-menu-item key="2"
                               @click="loginOut">
                    <icon-font type="icon-tuichu" />退出登录
                  </a-menu-item>
                </a-menu>
              </template>
              <template v-slot:icon>
                <UserOutlined />
              </template>
            </a-dropdown-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="margin: 15px 16px">
        <div class="tags-nav">
          <template v-for="(item,index) in state.navlists">
            <span>

              <Tags :tageName="item.ctitle!==''?item.ctitle: item.title"
                    @close="handleclose"
                    @mouseover.stop="touchstart"
                    @click.stop="handlechange(item)"
                    @contextmenu.prevent="rightClick(item)"
                    :color="state.nownav.path===item.path?'#2db7f5':''"
                    :index="index" />
            </span>
            <div v-if="state.activated"
                 v-bind:style="{  position: 'absolute', zIndex: '99999',left: `${state.clientX-60}px`,top:`${state.clientY-10}px`}">
              <ul style="list-style: none;">
                <li>
                  <a-button style="min-width:100px;border:0px !important"
                            type="default"
                            @click="rightclose"> 关闭所有 </a-button>
                </li>
                <li>
                  <a-button style="min-width:100px;border:0px !important"
                            type="default"
                            @click="otherclose()"> 关闭其它 </a-button>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <div class="content-wrapper container"
             @click="righthide">

          <keep-alive :include="cacheList">
            <router-view />
          </keep-alive>
        </div>
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<script>
import _ from 'lodash'
import config from '../config/index'
import VueContextMenu from '@xunlei/vue-context-menu'
import { useStore } from 'vuex'
import {
  ref,
  onMounted,
  computed,
  reactive,
  defineComponent
} from 'vue'
import {
  useRouter,
  createRouter,
  createWebHistory
} from 'vue-router'
import _routers from '@/router/'
import Tags from './tags'
import {
  createFromIconfontCN,
  UserOutlined,
  MessageFilled
} from '@ant-design/icons-vue'
import {
  setToken,
  getToken,
  canTurnTo,
  setTitle
} from '@/libs/util'
import Menus from './menu'
const IconFont = createFromIconfontCN({
  scriptUrl: config.baseUrl.iconfont
})
const route = useRouter()
export default {
  components: {
    Tags,
    IconFont,
    UserOutlined,
    MessageFilled,
    Menus
  },
  setup () {
    const store = useStore()

    const state = reactive({
      clientX: '',
      clientY: '',
      activated: false,
      nownav: {},
      navlists: [],
      menurouter: [],
      selectrightpath: '',
      accesslist: []
    })
    state.navlists = [{
      path: '/home',
      title: '首页',
      ptitle: '首页',
      ctitle: ''
    }]
    const routers = ref([])
    const arr = [{
      path: '/home',
      title: '首页',
      ptitle: '首页',
      ctitle: ''
    }]
    const cacheList = computed(() => {
      const list = ['ParentView']
      return list
    })

    onMounted(() => {
      if (localStorage.getItem('nowvalue') != null) {
        state.nownav = JSON.parse(localStorage.getItem('nowvalue'))
      } else {
        state.nownav = {
          path: '/home',
          title: '首页',
          ptitle: '首页',
          ctitle: ''
        }
      }
      if (localStorage.getItem('navs') != null || localStorage.getItem('navs') != undefined) {
        state.navlists = JSON.parse(localStorage.getItem('navs'))
      } else {
        localStorage.setItem('navs', JSON.stringify(arr))
      }
      const router = _routers.options.routes
      setTimeout(() => {
        _turn(router)
      }, 130)
    })

    const _turn = (root) => {
      routers.value = []
      if (!root) return
      // 通过store获取数据
      const accesslist = store.state.user.userFunc.split(',')
      root.forEach((item, index) => {
        if (!item.meta.hideInMenu) {
          if (item.meta.access != undefined) {
            if (accesslist.indexOf(item.meta.access[0]) < 0) {
              // root.splice(index, 1)
              item.meta.hideInMenu = true
              _turn(item.children)
            } else {
              routers.value.push(item)
            }
          } else {
            routers.value.push(item)
          }
        }
      })
    }

    const handleitem = (item, submitem, csubmitem) => {
      state.activated = false
      const params = {
        path: `${item.path}/${submitem.path}${csubmitem != undefined ? '/' + csubmitem.path : ''}`,
        title: submitem.meta.title,
        ptitle: item.meta.title,
        ctitle: csubmitem != undefined ? csubmitem.meta.title : '',
        selectedKeys: [csubmitem != undefined ? csubmitem.path : submitem.path],
        openKeys: [item.path]
      }
      let arr = [{
        path: '/home',
        title: '首页',
        ptitle: '首页',
        ctitle: ''
      }]
      if (localStorage.getItem('navs') != null || localStorage.getItem('navs') != undefined) {
        arr = JSON.parse(localStorage.getItem('navs'))
        // 去重
        arr.push(params)
        var appArray = _.uniqWith(arr, _.isEqual)
        localStorage.setItem('navs', JSON.stringify(appArray))
      } else {
        arr.push(params)
        localStorage.setItem('navs', JSON.stringify(arr))
      }
      state.nownav = params
      localStorage.setItem('nowvalue', JSON.stringify(params))
      state.navlists = appArray == undefined ? arr : appArray
      _routers.push(params)
    }
    // 关闭
    const handleclose = (e) => {
      state.activated = false
      const arr = state.navlists
      if (state.nownav.path === '/home') {
        arr.splice(e.index, 1)
      } else {
        if (arr[e.index + 1] == undefined) {
          state.nownav = JSON.parse(JSON.stringify(arr[e.index - 1]))
          localStorage.setItem('nowvalue', JSON.stringify(arr[e.index - 1]))
          _routers.push(JSON.parse(JSON.stringify(arr[e.index - 1])).path)
        } else {
          state.nownav = JSON.parse(JSON.stringify(arr[e.index + 1]))
          localStorage.setItem('nowvalue', JSON.stringify(arr[e.index + 1]))
          _routers.push(JSON.parse(JSON.stringify(arr[e.index + 1])).path)
        }
        arr.splice(e.index, 1)
      }

      localStorage.setItem('navs', JSON.stringify(arr))
    }
    const handleMenuClick = (e) => {
      console.log('click', e)
    }
    // 切换
    const handlechange = (item) => {
      state.activated = false
      state.nownav = item
      localStorage.setItem('nowvalue', JSON.stringify(item))
      _routers.push(item.path)
    }
    const rightClick = (e) => {
      if (e.title !== '首页') {
        state.selectrightpath = e
        state.activated = true
      }
    }
    const touchstart = (e) => {
      if (state.activated) return
      state.clientX = e.clientX
      state.clientY = e.clientY
    }
    const righthide = () => {
      state.activated = false
    }
    const rightclose = () => {
      const arr = state.navlists
      state.nownav = JSON.parse(JSON.stringify(arr[0]))
      state.activated = false
      _routers.push(JSON.parse(JSON.stringify(arr[0])).path)
      for (let i = 0; i < arr.length;) {
        if (i > 0) {
          arr.splice(i, 1)
        } else {
          i++
        }
      }
      localStorage.setItem('navs', JSON.stringify(arr))
    }
    // 除了首页、和当前选择的不清空外其它的都删除
    const otherclose = () => {
      const arr = state.navlists
      for (let i = 0; i < arr.length;) {
        if (arr[i].title !== '首页') {
          if (state.selectrightpath.path === arr[i].path) {
            i++
          } else {
            arr.splice(i, 1)
          }
        } else {
          i++
        }
      }
      // 赋值为当前
      state.nownav = state.selectrightpath
      state.activated = false
      localStorage.setItem('navs', JSON.stringify(arr))
      _routers.push(state.selectrightpath.path)
    }
    // 登出
    const loginOut = () => {
      setToken('')
      localStorage.clear()
      _routers.push('/signin')
    }

    return {
      routers,
      state,
      cacheList,
      rightClick,
      touchstart,
      handleitem,
      handleMenuClick,
      handleclose,
      handlechange,
      rightclose,
      righthide,
      loginOut,
      otherclose
    }
  }
}
</script>

<style lang="scss">
.content-wrapper {
  margin-top: 15px;
  height: calc(100% - 80px);
  // overflow: auto;
}

.logo img {
  padding: 10px;
  width: 100%;
}

.container {
  background: #ffffff;
  // height: 100%;
}

.tags-nav {
  padding-top: 3px;
  height: 38px;
  -webkit-box-shadow: 0 0 3px 2px hsla(0, 0%, 39.2%, 0.1) inset;
  box-shadow: inset 0 0 3px 2px hsla(0, 0%, 39.2%, 0.1);

  .ant-tags {
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum";
    display: inline-block;
    height: auto;
    margin: 0 8px 0 0;
    padding: 0 7px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    cursor: default;
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    height: 32px;
    line-height: 32px;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
  }
}

.ant-dropdown-link {
  cursor: pointer;
}

.icons-list ::v-deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}

.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}

.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}

.right-menu a:hover {
  background: #eee;
  color: #fff;
}

.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
}

a {
  text-decoration: none;
}

.right-menu a {
  padding: 2px;
}

.right-menu a:hover {
  background: #42b983;
}
</style>
