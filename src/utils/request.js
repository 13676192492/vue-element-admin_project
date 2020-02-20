import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, getAccessToken } from '@/utils/auth'
let base_url;
if (process.env.NODE_ENV === 'production') {
  base_url = ''
} else if (process.env.NODE_ENV === 'development') {
  base_url = ''
}

// console.log('执行')
// var SS = getAccessToken()
// if(!SS&&getToken()){

// }


// create an axios instance
const service = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: 5000 // request timeout
})

service.defaults.headers = {
  // "Authorization" :'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFDNjJEMzZBMjBGRjYxNzI3OUI3M0RDN0Q2Njc1QTc4MDI3QTdERjUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJIR0xUYWlEX1lYSjV0ejNIMW1kYWVBSjZmZlUifQ.eyJuYmYiOjE1NzQ5ODk5MTIsImV4cCI6MTU3NDk5MzUxMiwiaXNzIjoiaHR0cDovLzEwLjAuMS4yMjIvb2F1dGgiLCJhdWQiOiJ1aG9tZSIsImNsaWVudF9pZCI6InVob21lLndlYiIsInN1YiI6IjEwMDAwIiwiYXV0aF90aW1lIjoxNTc0OTg4NDk5LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJBRE1JTiIsIm5hbWUiOiJhZG1pbiIsInRlbmFudF9pZCI6IjEwMDAwIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInVob21lLm8ybyIsInVob21lLnJrZSJdLCJhbXIiOlsicHdkIl19.pu8CBbdPuIw9CJiowsNuR-ertiFHsTVCFsEspZZyJv2kR_emDGeWw9MU9mKfS-R6SF1OrmDfkbDObZFa6eB0xCEYMgnLErHi-OWyBRExgCNIlV_1lbNcqRaj-MMAhRUF3wFzZ5xe8oPWbEGUGBO-dMC7xQtRo5-jT3fy8Y_niKaUveBH4OWYcKTMMjr36vfTjnaar7n856ueLfkQfZtb9rDNMbbjlis5dBhg6CDLArgLerSbrwdso8OF7A47wFcbQryOpORyeui975bTT6Lv8V-vcjJuE_przkh_xSPAZNHEoxkCf_VxRKgkramm20gNM8iW2D8lPyLoBIiPULO68w',
  // "Authorization": 'Bearer ' + SS,
  "Content-Type": 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
}


// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(getAccessToken())
    if (getAccessToken()) {
      config.headers["Authorization"] = 'Bearer ' + getAccessToken();
    }
    // else if(!getAccessToken()&&getToken()){
    //   MessageBox.alert('用户身份已失效，请重新登录！', '权限提示', {
    //     confirmButtonText: '确定',
    //     showClose: false,
    //     type: 'warning'
    //   }).then(() => {
    //     // window.location.href = `${location.protocol}//${location.host}`;
    //   });
    // }
    // if (store.getters.token) {

    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken();

    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
