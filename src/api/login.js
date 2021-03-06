import request from '@/utils/request'

export function loginByUsername(account, password) {
    const data = {
        account,
        password
    }
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

export function getUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            token
        }
    })
}

//获取验证码
export function getCaptcha(params) {
    return request({
        url: '/api/account/register-verify-phone',
        method: 'post',
        data: params
    })
}

//登录
export function login(params) {
    return request({
        url: '/api/account/login',
        method: 'post',
        data: params
    })
}

//注册
export function register(params) {
    return request({
        url: '/api/account/register-by-phone',
        method: 'post',
        data: params
    })
}

//忘记密码获取验证码
export function getCaptcha2(params) {
    return request({
        url: '/api/account/forgot-password-phone',
        method: 'post',
        data: params
    })
}

//手机找回 - 重置密码
export function changePwd(params) {
    return request({
        url: '/api/account/reset-password-phone',
        method: 'put',
        data: params
    })
}