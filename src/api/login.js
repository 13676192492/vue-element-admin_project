import request from '@/utils/request'
import {
    runApi
} from '@/assets/publicScript/public'

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
        url: runApi + '/api/account/register-verify-phone',
        method: 'post',
        data: params
    })
}

//登录
export function login(params) {
    return request({
        url: runApi + '/api/account/login',
        method: 'post',
        data: params
    })
}

//注册
export function register(params) {
    return request({
        url: runApi + '/api/account/register-by-phone',
        method: 'post',
        data: params
    })
}

//忘记密码获取验证码
export function getCaptcha2(params) {
    return request({
        url: runApi + '/api/account/forgot-password-phone',
        method: 'post',
        data: params
    })
}

//修改密码
export function changePwd(params) {
    return request({
        url: runApi + '/api/account/change-password',
        method: 'put',
        data: params
    })
}