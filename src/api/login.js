import request from '@/utils/request'
import { runApi } from '@/assets/publicScript/public'

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
        params: { token }
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