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