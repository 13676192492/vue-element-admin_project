import { loginByUsername, logout, getUserInfo, login } from '@/api/login'
import { getToken, setToken,setRoles, getRoles,removeToken , removeRoles } from '@/utils/auth'
import {
  Message
} from 'element-ui'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    // SET_SETTING: (state, setting) => {
    //   state.setting = setting
    // },
    // SET_STATUS: (state, status) => {
    //   state.status = status
    // },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {

      // const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.data.success) {
            // debugger
            // loginByUsername(account, userInfo.password).then(response => {
            //   const data = response.data
              // commit('SET_TOKEN', data.token)
              // setToken(response.data.token)
              commit('SET_ROLES', res.data.data.roles)
              commit('SET_TOKEN', res.data.data.access_token)
              setToken(res.data.data.access_token)
              setRoles(res.data.data.roles)
              // setAccessToken(res.data.data.access_token)
              resolve()
            // }).catch(error => {
            //   reject(error)
            // })
          } else {
            Message({
              message: res.data.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
            resolve()
          }

        })

      })

    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // resolve()
        // getUserInfo(state.token).then(response => {
          // 由于mockjs 不支持自定义状态码只能这样hack
          // console.log(JSON.stringify(response) )
          // if (!response.data) {
          //   reject('Verification failed, please login again.')
          // }
          // const data = response.data
          // console.log(getRoles())
          let roles = getRoles();
          let reg = new RegExp('"',"g");
          roles = roles.substring(1,roles.length-1).replace(reg,"").split(",");
          let data = {
            roles
          }
          // let data2 ={"data":{"roles":["admin"],"token":"admin","introduction":"我是超级管理员","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"},"status":200,"statusText":"OK","headers":{},"config":{"transformRequest":{},"transformResponse":{},"timeout":5000,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*","Cache-Control":"no-cache","Pragma":"no-cache","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YWM4YmNiOS1hODc2LTRmZGUtYWNjZS1hNTdlNTcwYTBlMWEiLCJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiNzMyMzE0NDQ0OTA4MTM0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJuYmYiOjE1ODI2Nzg4ODQsImV4cCI6MTU4MjY4NjA4NCwiaXNzIjoiT2NzIiwiYXVkIjoiQW55b25lIn0.qzxgODLBScYwKYRTDalnJxS6HSYSfr5SwAGpP0gqBQA"},"method":"get","baseURL":"","url":"/user/info","params":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YWM4YmNiOS1hODc2LTRmZGUtYWNjZS1hNTdlNTcwYTBlMWEiLCJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiNzMyMzE0NDQ0OTA4MTM0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJuYmYiOjE1ODI2Nzg4ODQsImV4cCI6MTU4MjY4NjA4NCwiaXNzIjoiT2NzIiwiYXVkIjoiQW55b25lIn0.qzxgODLBScYwKYRTDalnJxS6HSYSfr5SwAGpP0gqBQA"}},"request":{"custom":{"events":{},"requestHeaders":{"Accept":"application/json, text/plain, */*","Cache-Control":"no-cache","Pragma":"no-cache","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YWM4YmNiOS1hODc2LTRmZGUtYWNjZS1hNTdlNTcwYTBlMWEiLCJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiNzMyMzE0NDQ0OTA4MTM0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJuYmYiOjE1ODI2Nzg4ODQsImV4cCI6MTU4MjY4NjA4NCwiaXNzIjoiT2NzIiwiYXVkIjoiQW55b25lIn0.qzxgODLBScYwKYRTDalnJxS6HSYSfr5SwAGpP0gqBQA","X-Requested-With":"MockXMLHttpRequest"},"responseHeaders":{},"method":"GET","url":"/user/info?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YWM4YmNiOS1hODc2LTRmZGUtYWNjZS1hNTdlNTcwYTBlMWEiLCJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiNzMyMzE0NDQ0OTA4MTM0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJuYmYiOjE1ODI2Nzg4ODQsImV4cCI6MTU4MjY4NjA4NCwiaXNzIjoiT2NzIiwiYXVkIjoiQW55b25lIn0.qzxgODLBScYwKYRTDalnJxS6HSYSfr5SwAGpP0gqBQA","async":true,"options":{"url":"/user/info?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YWM4YmNiOS1hODc2LTRmZGUtYWNjZS1hNTdlNTcwYTBlMWEiLCJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiNzMyMzE0NDQ0OTA4MTM0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJuYmYiOjE1ODI2Nzg4ODQsImV4cCI6MTU4MjY4NjA4NCwiaXNzIjoiT2NzIiwiYXVkIjoiQW55b25lIn0.qzxgODLBScYwKYRTDalnJxS6HSYSfr5SwAGpP0gqBQA","type":"GET","body":null},"timeout":71,"template":{"rurl":{},"rtype":"get"}},"match":true,"readyState":4,"timeout":5000,"status":200,"statusText":"OK","responseText":"{\n    \"roles\": [\n        \"admin\"\n    ],\n    \"token\": \"admin\",\n    \"introduction\": \"我是超级管理员\",\n    \"avatar\": \"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif\",\n    \"name\": \"Super Admin\"\n}","response":"{\n    \"roles\": [\n        \"admin\"\n    ],\n    \"token\": \"admin\",\n    \"introduction\": \"我是超级管理员\",\n    \"avatar\": \"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif\",\n    \"name\": \"Super Admin\"\n}"}};

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }

          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(data);
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeRoles()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRoles()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          console.log(response)
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
