import request from '@/utils/request'

//查询物业订单列表
export function getOrderList(params) {
    return request({
        url:'/api/orders/search',
        method: 'post',
        data: params
    })
}

//查询物业订单详情列表
export function getOrderDetails(no,params) {
    return request({
        url: '/api/orders/'+no+'/detail/sip',
        method: 'get',
        params
    })
}

//获取物业支付状态
export function payRecharge(params) {
    return request({
        url: '/api/orders/pay/recharge/'+ params.no,
        method: 'post',
        params: params
    })
}

//查询管理员订单列表
export function getAdminOrderList(params) {
    return request({
        url:'/api/admin/orders/search',
        method: 'post',
        data: params
    })
}

//查询管理员订单详情列表
export function getAdminOrderDetails(no,params) {
    return request({
        url: '/api/admin/orders/'+no+'/detail/sip',
        method: 'get',
        params
    })
}

// //获取物业支付状态
// export function payRecharge(params) {
//     return request({
//         url: '/api/orders/pay/recharge/'+ params.no,
//         method: 'post',
//         params: params
//     })
// }