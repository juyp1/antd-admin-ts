import Cookies from 'js-cookie'
// cookie保存的天数
import config from '../config/index'
// import { forEach, hasOneOf, objEqual } from './tools'

export const TOKEN_KEY = 'token'

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)

  if (token) return token
  else return false
}
