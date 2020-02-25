import request from '@/utils/request'
import { runApi } from '@/assets/publicScript/public'

//查询话单列表
export function getPhoneBillList(params) {
    return request({
        url: runApi + '/api/siprecord/search',
        method: 'post',
        data: params
    })
}

//查询话单列表
// export function getPhoneBillList(params) {
//     return request({
//         url: '/siprecord/searchTest',
//         method: 'post',
//         data: params
//     })
// }