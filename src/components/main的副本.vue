<template>
  <a-layout id="components-layout-demo-side"
            style="min-height: 100vh">

    <a-layout-sider>
      <div class="logo" />
      <a-menu theme="dark"
              mode="inline">

        <a-sub-menu :key="item.index"
                    class="icons-list"
                    v-for="(item,index) of routers">

          <template v-slot:title>
            <span>
              <icon-font :type="item.meta.icon!=undefined?item.meta.icon:'icon-computer'" />
              <span>{{item.meta.title}}</span>

            </span>
          </template>

          <template v-for="(subitem,subindex) of item.children">

            <a-menu-item v-if="!subitem.meta.hideInMenu&&subitem.children==undefined"
                         :key="subitem.index"
                         @click="handleitem(item,subitem)">

              {{subitem.meta.title}}

            </a-menu-item>
            <a-sub-menu :title="subitem.meta.title"
                        v-if="!subitem.meta.hideInMenu&&subitem.children!==undefined&&subitem.children.length>0">

              <a-menu-item v-for="(csubmitem,cindex) of subitem.children"
                           :key="cindex"
                           @click="handleitem(item,subitem,csubmitem)">
                <div v-if="!csubmitem.meta.hideInMenu">
                  {{csubmitem.meta.title}}
                </div>
              </a-menu-item>

            </a-sub-menu>
          </template>

        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout>

      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="21">
            <div style="padding-left:20px;padding-top:20px">
              <a-breadcrumb>
                <a-breadcrumb-item>{{nownav.ptitle}}</a-breadcrumb-item>
                <a-breadcrumb-item v-if="nownav.title">{{nownav.title}}</a-breadcrumb-item>
                <a-breadcrumb-item v-if="nownav.ctitle">{{nownav.ctitle}}</a-breadcrumb-item>
              </a-breadcrumb>
            </div>
          </a-col>
          <a-col :span="3">
            <a-dropdown-button>
              欢迎你-admin
              <template v-slot:overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <UserOutlined />修改密码
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-badge :count="100">
                      <MessageFilled />消息中心
                    </a-badge>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <UserOutlined />退出登录
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
      <a-layout-content style="margin: 0 16px">

        <div class="tags-nav">

          <template v-for="(item,index) in navlists">
            <span v-if="item.close">
              <Tags :tageName="item.ctitle!==''?item.ctitle: item.title"
                    @close="handleclose"
                    @mouseover.stop="touchstart"
                    @click.stop="handlechange(item)"
                    @contextmenu.prevent="rightClick(item)"
                    :color="nownav.path===item.path?'#2db7f5':''"
                    :index="index" />
            </span>
          </template>

        </div>
        <div v-if="state.activated"

             v-bind:style="{  position: 'absolute', zIndex: '99999',left: `${state.clientX-60}px`,top:`${state.clientY-10}px`}">
          <ul style="list-style: none;">
            <li>
              <a-button style="min-width:100px"  type="danger"   @click="rightclose"> 关闭所有 </a-button>
            </li>
            <li>
              <a-button style="min-width:100px"  type="danger"> 关闭其它 </a-button>
            </li>
          </ul>
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
import { ref, onMounted, computed, reactive } from 'vue'
import { useRouter, createRouter, createWebHistory } from 'vue-router'
import { HomeOutlined, MailOutlined, UserOutlined, MessageFilled, createFromIconfontCN } from '@ant-design/icons-vue'
import _routers from '@/router/'
import Tags from './tags'

console.log(config.baseUrl.iconfont)
const IconFont = createFromIconfontCN({
  scriptUrl: config.baseUrl.iconfont
})
const route = useRouter()
export default {
  components: {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    MessageFilled,
    Tags,
    IconFont

  },
  setup () {
    const state = reactive({
      clientX: '',
      clientY: '',
      activated: false
    })
    const routers = ref([])
    const navlists = ref([{ path: '/home', title: '首页', ptitle: '首页', ctitle: '' }])
    const nownav = ref({ path: '/home', title: '首页', ptitle: '首页', ctitle: '' })
    const arr = [{ path: '/home', title: '首页', ptitle: '首页', ctitle: '' }]
    const cacheList = computed(() => {
      const list = ['ParentView']
      return list
    })

    onMounted(() => {
      // listenPage()
      if (localStorage.getItem('navs') != null || localStorage.getItem('navs') != undefined) {
        navlists.value = JSON.parse(localStorage.getItem('navs'))
      } else {
        localStorage.setItem('navs', JSON.stringify(arr))
      }
      const router = _routers.options.routes
      turn(router)
    })
    // 权限处理
    const turn = (router) => {
      routers.value = []
      const accesslist = ['admin:total', 'admin:order', 'admin:store', 'admin:resource', 'admin:equipment']
      // 一级菜单
      for (let i = 0; i < router.length;) {
        if (!router[i].meta.hideInMenu) {
          if (router[i].meta.access != undefined) {
            if (accesslist.indexOf(router[i].meta.access[0]) < 0) {
              router.splice(i, 1)
            } else {
              i++
            }
          } else {
            i++
          }
        } else {
          i++
        }
      }

      router.forEach((item, index) => {
        if (!item.meta.hideInMenu) {
          if (item.children != undefined) {
            item.children.forEach((_item, _index) => {
              if (_item.meta.access != undefined) {
                if (accesslist.indexOf(_item.meta.access[0]) > -1) {
                  _item.meta.hideInMenu = false
                } else {
                  // 二级的不存在直接移除
                  if (_item.children != undefined) {
                    _item.children.splice(_index, 1)
                  }
                }
              } else {
                _item.meta.hideInMenu = false
              }

              if (_item.children != undefined) {
                for (let i = 0; i < _item.children.length;) {
                  if (_item.children[i].meta.access != undefined) {
                    if (accesslist.indexOf(_item.children[i].meta.access[0]) < 0) {
                      _item.children.splice(i, 1)
                    } else {
                      i++ // 只有在没有删除元素时才对索引 i++
                    }
                  } else {
                    i++
                  }
                }
              }
            })
          }
          routers.value.push(item)
        }
      })
    }

    const handleitem = (item, submitem, csubmitem) => {
      state.activated = false
      const params = { path: `${item.path}/${submitem.path}${csubmitem != undefined ? '/' + csubmitem.path : ''}`, title: submitem.meta.title, close: true, ptitle: item.meta.title, ctitle: csubmitem != undefined ? csubmitem.meta.title : '' }
      let arr = [{ path: '/home', title: '首页', close: true, ptitle: '首页', ctitle: '' }]
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
      nownav.value = params
      localStorage.setItem('nowvalue', JSON.stringify(params))
      navlists.value = appArray == undefined ? arr : appArray
      _routers.push(params)
    }
    // 关闭
    const handleclose = (e) => {
      state.activated = false
      const arr = navlists.value
      if (nownav.value.path === '/home') {
        arr.splice(e.index, 1)
      } else {
        if (arr[e.index + 1] == undefined) {
          nownav.value = JSON.parse(JSON.stringify(arr[e.index - 1]))
          _routers.push(JSON.parse(JSON.stringify(arr[e.index - 1])).path)
        } else {
          nownav.value = JSON.parse(JSON.stringify(arr[e.index + 1]))
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
      nownav.value = item

      _routers.push(item.path)
    }
    const rightClick = (e) => {
      console.log(e)
      if (e.title !== '首页') {
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
      const arr = navlists.value
      nownav.value = JSON.parse(JSON.stringify(arr[0]))
      state.activated = false
      _routers.push(JSON.parse(JSON.stringify(arr[0])).path)
      for (let i = 0; i < arr.length;) {
        if (i > 0) {
          arr.splice(i, 1)
        } else {
          i++
        }
      }
      // arr.map((item, index) => {
      //   if (index > 0) {
      //     arr.splice(index, 1)
      //   }

      // })
      localStorage.setItem('navs', JSON.stringify(arr))
      //
    }

    const listenPage = () => {
      window.onbeforeunload = function (e) {
        e = e || window.event
        if (e) {
          if (localStorage.getItem('nowvalue') != null) {
            console.log('????', JSON.parse(localStorage.getItem('nowvalue')).path)
            nownav.value = JSON.parse(localStorage.getItem('nowvalue'))
            // _routers.push(JSON.parse(localStorage.getItem('nowvalue')).path)
          }
        }
        return false
      }
    }
    return {
      routers,
      navlists,
      nownav,
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
      listenPage
    }
  }
}
</script>

<style lang="scss">
.content-wrapper {
  padding: 18px;
  height: calc(100% - 80px);
  overflow: auto;
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
