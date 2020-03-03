import request from '@/utils/request'

//查询物业话单列表
export function getPhoneBillList(params) {
    return request({
        url: '/api/siprecord/search',
        method: 'post',
        data: params
    })
}

//查询管理员话单列表
export function getAdminPhoneBillList(params) {
    return request({
        url: '/api/admin/siprecord/search',
        method: 'post',
        data: params
    })
}