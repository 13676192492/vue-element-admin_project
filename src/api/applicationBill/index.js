import request from '@/utils/request'

//查询物业话单列表
export function getApplicationBillList(params) {
    return request({
        url: '/api/apprecord/search',
        method: 'post',
        data: params
    })
}