import Cookies from 'js-cookie'

const TokenKey = '__LJB__ADMIN__'
const tokenName = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setAccessToken(token) {
  return Cookies.set(tokenName, token)
}

export function getAccessToken() {
  return Cookies.get(tokenName)
}

export function removeAccessToken() {
  return Cookies.remove(tokenName)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
