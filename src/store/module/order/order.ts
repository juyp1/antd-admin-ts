import {
  getOrderList,
  getProduceDetail,
  getOrderDetail
} from '@/api/order/order'
import Constant from '../../../Constant'
interface Stateprops{
  orderlist: [];
  producelist: [];
  orderdetail: object;
}
export default {
  namespaced: true,
  state: {
    orderlist: [],
    producelist: [],
    orderdetail: {}
  },

  mutations: {
    [Constant.INITIALIZE_ORDERLIST]: (state: Stateprops, payload: []) => {
      state.orderlist = payload
    },
    [Constant.INITIALIZE_ORDERPRODUCELIST]: (state: Stateprops, payload: []) => {
      state.producelist = payload
    },
    [Constant.INITIALIZE_ORDERDETAIL]: (state: Stateprops, payload: object) => {
      state.orderdetail = payload
    }
  },
  actions: {
    getOrderListAction (state: any, params: object) {
      return new Promise((resolve, reject) => {
        getOrderList(params).then(res => {
          state.commit(Constant.INITIALIZE_ORDERLIST, res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getProduceDetailAction (state: any, orderid: string) {
      return new Promise((resolve, reject) => {
        getProduceDetail(orderid).then(res => {
          state.commit(Constant.INITIALIZE_ORDERPRODUCELIST, res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getOrderDetailAction (state: any, orderid: string) {
      return new Promise((resolve, reject) => {
        getOrderDetail(orderid).then(res => {
          state.commit(Constant.INITIALIZE_ORDERDETAIL, res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {

  }
}
