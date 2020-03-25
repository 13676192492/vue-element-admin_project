import request from '@/utils/request'

//查询物业话单列表
export function getApplicationBillList(params) {
    return request({
        url: '/api/apprecord/search',
        method: 'post',
        data: params
    })
}

//查询物业话单列表
export function getAdminApplicationBillList(params) {
    return request({
        url: '/api/admin/apprecord/search',
        method: 'post',
        data: params
    })
}

//获取所有应用数据
export function getAllAppId() {
    return request({
        url: '/api/admin/application/all',
        method: 'get',
    })
}

// 补录
export function setSupplementData(params) {
    return request({
        url: '/api/admin/apprecord/create',
        method: 'post',
        data: params
    })
}