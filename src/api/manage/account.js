import request from '@/utils/request'

export function searchAccount(data) {
    return request({
        url: '/api/admin/user/search',
        method: 'post',
        data
    })
}

export function getAccount(id) {
    return request({
        url: '/api/admin/user/' + id,
        method: 'get'
    })
}

export function accountRecharge(query) {
    return request({
        url: '/api/admin/orders/pay/recharge',
        method: 'post',
        params: query
    })
}

export function getCommunity(id) {
    return request({
        url: '/api/admin/community/user/' + id,
        method: 'post'
    })
}

export function getOtherCommunity(data) {
    return request({
        url: '/api/admin/community/user/onsearch',
        method: 'post',
        data
    })
}

export function bindCommunity(id, userId) {
    return request({
        url: '/api/admin/community/' + id + '/bind/' + userId,
        method: 'put'
    })
}

export function cancelBindCommunity(id) {
    return request({
        url: '/api/admin/community/unbind/' + id,
        method: 'put'
    })
}

export function getAppAll(data) {
    return request({
        url: '/api/admin/application/search',
        method: 'post',
        data
    })
}

export function getAppList(id) {
    return request({
        url: '/api/admin/application/user/' + id,
        method: 'post'
    })
}

export function addBindApp(data) {
    return request({
        url: '/api/admin/application',
        method: 'post',
        data
    })
}

export function updateBindApp(id, data) {
    return request({
        url: '/api/admin/application/' + id,
        method: 'put',
        data
    })
}

export function cancelBindApp(id) {
    return request({
        url: '/api/admin/application/' + id,
        method: 'delete'
    })
}

export function getOrders(data) {
    return request({
        url: '/api/admin/orders/search',
        method: 'post',
        data
    })
}