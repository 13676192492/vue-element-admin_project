import Cookies from 'js-cookie'

const TokenKey = 'Token'
const rolesKey = 'Roles'
const nameKey = 'Name'

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

// export function removeRoles() {
//     return Cookies.remove(rolesKey)
// }

// export function removeToken() {
//     return Cookies.remove(TokenKey)
// }

export function setName(name) {
    return Cookies.set(nameKey, name)
}

export function getName() {
    return Cookies.get(nameKey)
}

// export function removeName() {
//     return Cookies.remove(nameKey)
// }
export function removeAll() {
    return (function a() {
        Cookies.remove(nameKey);
        Cookies.remove(rolesKey);
        Cookies.remove(TokenKey);
    })()
}