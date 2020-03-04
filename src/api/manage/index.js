import request from '@/utils/request'


export function getEchartsData() {
    return request({
        url: '/api/admin/home/widgets/4',
        method: 'get'
    })
}

export function getTopData() {
    return request({
        url: '/api/admin/home/widgets/3',
        method: 'get'
    })
}