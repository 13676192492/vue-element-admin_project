import request from '@/utils/request'
import { runApi } from '@/assets/publicScript/public'

//查询订单列表
export function getOrderList(params) {
    return request({
        url: runApi + '/api/orders/search',
        method: 'post',
        data: params
    })
}

//查询订单详情列表
export function getOrderDetails(no,params) {
    return request({
        url: runApi + '/api/orders/'+no+'/detail/sip',
        method: 'get',
        params
    })
}