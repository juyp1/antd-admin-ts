import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { setToken, getToken } from '@/libs/util'
import routers from './routers'
import store from '@/store'
const routes = routers
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const LOGIN_PAGE_NAME = 'signin'
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到homeName页
    })
  } else {
    // console.log(to)

    if (store.state.user.userFunc.length === 0) {
      store.dispatch('user/getUserInfoAction', token)
    }
    // store.dispatch('user/getUserInfoAction', token);
    // next()
    // if (store.state.user.hasGetInfo) {
    //   console.log(store.state.user.access)
    // turnTo(to, ['admin:zd'], next)
    // } else {
    //   store.dispatch('getUserInfo').then(user => {
    //     // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
    //     turnTo(to, user.access, next)
    //   }).catch(() => {
    //     setToken('')
    //     next({
    //       name: 'signin'
    //     })
    //   })
    // }
    // next()
  }
  // router.beforeEach((to, from, next) => {
  //   const token = localStorage.getItem('token')
  //   console.log('--',token)
  //   if (to.meta.isLogin) {
  //     // 检查是否有token
  //     if (token) {
  //       next()
  //     } else {
  //       // 跳转登录页
  //       next({
  //         path: '/signin',
  //         query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //       })
  //     }
  //   }
  //   next()
  // })
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
