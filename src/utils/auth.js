import Cookies from 'js-cookie'

const TokenKey = 'UserToken'


export function getCookie (v) {
  return Cookies.get(v)
}

export function setCookie (k, v) {
  return Cookies.set(k, v)
}

export function removeCookie (v) {
  return Cookies.remove(v)
}

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
