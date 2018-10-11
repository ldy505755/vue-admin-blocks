import Vue from 'vue'
import Vuex from 'vuex'

// Vuex 模块引入
import app from '@/store/modules/app'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    menu
  }
})
