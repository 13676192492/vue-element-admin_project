import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import getters from './getters'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    settings,
    tagsView,
    errorLog
  },
  getters
})

export default store
