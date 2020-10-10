
import user from './module/user/user'
import order from './module/order/order'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      userFunc: []
    }

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    order
  }
})
