import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  parkInfo:null,
  passwordMask:false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_PARKINFO: (state, parkInfo) => {
    state.parkInfo = parkInfo;
  },
  CHANGE_MASK:(state,bool)=>{
    state.passwordMask = bool;
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changePark({commit},data){
    commit('SET_PARKINFO', data)
  },
  changeMask({commit},data){
    commit('CHANGE_MASK', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

