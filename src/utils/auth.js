import Cookies from 'js-cookie'

const TokenKey = '__LJB__ADMIN__'
const rolesKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setRoles(roles) {
  return Cookies.set(rolesKey, roles)
}

export function getRoles() {
  return Cookies.get(rolesKey)
}

export function removeRoles() {
  return Cookies.remove(rolesKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
