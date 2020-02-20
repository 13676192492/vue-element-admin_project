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