import request from '@/utils/request'

export function getHomeId() {
    return request({
        url: '/api/home/widgets',
        method: 'get'
    })
}

export function getHomeData(id) {
    return request({
        url: '/api/home/widgets/' + id,
        method: 'get'
    })
}

export function searchUnrelated(data) {
    return request({
        url: '/api/community/search-unrelated',
        method: 'post',
        data
    })
}

export function searchConnected(data) {
    return request({
        url: '/api/community/search',
        method: 'post',
        data
    })
}

export function bindPlot(id) {
    return request({
        url: '/api/community/bind/' + id,
        method: 'put'
    })
}

export function searchDevice(data) {
    return request({
        url: '/api/user/device/search',
        method: 'post',
        data
    })
}

export function payRecharge(query) {
    return request({
        url: '/api/orders/pay/recharge',
        method: 'post',
        params: query
    })
}