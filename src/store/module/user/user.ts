import {
  signinUser,
  getUserInfo
} from '@/api/user'
import Constant from '../../../Constant'
interface StateProps {
	result: object;
	userFunc: string;
}
export default {
  namespaced: true,
  state: {
    result: {},
    userFunc: ''
  },

  mutations: {

    [Constant.USER_SIGNIN]: (state: StateProps, payload: object) => {
      state.result = payload
    },
    [Constant.USER_TOKEN]: (state: StateProps, payload: string) => {
      localStorage.setItem('userFunc', payload)
    }
  },
  actions: {

    signinUserAction (state: any, data: object) {
      return new Promise((resolve, reject) => {
        signinUser(data).then(res => {
          state.commit(Constant.USER_SIGNIN, res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfoAction (state: any, token: string) {
      return new Promise((resolve, reject) => {
        getUserInfo(token).then(res => {
          state.commit(Constant.USER_TOKEN, res.data.functionlist)
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
