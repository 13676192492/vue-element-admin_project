import request from '@/utils/request'

//查询订单列表
export function getOrderList(params) {
    return request({
        url:'/api/orders/search',
        method: 'post',
        data: params
    })
}

//查询订单详情列表
export function getOrderDetails(no,params) {
    return request({
        url: '/api/orders/'+no+'/detail/sip',
        method: 'get',
        params
    })
}

export function payRecharge(params) {
    return request({
        url: '/api/orders/pay/recharge/'+ params.no,
        method: 'post',
        params: params
    })
}