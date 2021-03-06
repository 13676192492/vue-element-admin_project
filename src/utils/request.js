import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  getAccessToken
} from '@/utils/auth'
// let base_url;
// if (process.env.NODE_ENV === 'production') {
//   base_url = process.env.VUE_APP_BASE_API
// } else if (process.env.NODE_ENV === 'development') {
//   base_url = ''
// }

// console.log('执行')
// var SS = getAccessToken()
// if(!SS&&getToken()){

// }
//不提示身份信息失效
const whiteUrl = ['/login', '/register'];
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

service.defaults.headers = {
  "Content-Type": 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
}


// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(getAccessToken())
    const url = config.url.replace(config.baseURL, '');

    // console.log(url);
    // console.log(url.indexOf(whiteUrl));
    // let isLogin = !!(url.indexOf(whiteUrl) + 1)
    let isLogin = whiteUrl.some((i) => {
      return i.indexOf(url)
    })
    // if (getAccessToken()) {
    //   config.headers["Authorization"] = 'Bearer ' + getAccessToken();
    // }
    // else if(!getAccessToken()&&!isLogin){
    if (getToken()) {
      config.headers["Authorization"] = 'Bearer ' + getToken();
    } else if (!getToken() && !isLogin) {


      MessageBox.alert('用户身份已失效，请重新登录！', '权限提示', {
        confirmButtonText: '确定',
        showClose: false,
        type: 'warning'
      }).then(() => {
        window.location.href = `${location.protocol}//${location.host}`;
      });
    }
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
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    if (!res.success) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    // console.log('err' + error) // for debug
    if (getToken()) {
      // console.log(error.response.status);
      if (error.response.status == 401) {
        MessageBox.alert('用户身份已失效，请重新登录！', '权限提示', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        });
      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }

    }

    return Promise.reject(error)
  }
)

export default service