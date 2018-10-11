import router from '@/router'
import {getMenuList} from '@/services/app'

const state = {
  menu: JSON.parse(sessionStorage.getItem('menu')) || [], // 主菜单
  menuActive: sessionStorage.getItem('menuActive') || '/', // 激活主菜单
  menuOpened: sessionStorage.getItem('menuOpened') || '' // 展开子菜单
}

const getters = {
  getMenu: state => state.menu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened
}

const mutations = {
  // 获取菜单
  MENU: (state, data) => {
    state.menu = data // 获取菜单
    sessionStorage.setItem('menu', JSON.stringify(data))
  },
  // 选择菜单
  MENU_SELECT: (state, data) => {
    router.push(data) // 路由跳转
    state.menuActive = data // 选择菜单
    state.menuOpened = `/${data.split('/')[1]}` // 展开菜单
    sessionStorage.setItem('menuActive', data)
    sessionStorage.setItem('menuOpened', state.menuOpened)
  },
  // 重置菜单
  MENU_RESET: (state) => {
    router.push('/login') // 路由跳转
    state.menu = []
    state.menuActive = '/'
    state.menuOpened = ''
    sessionStorage.clear()
  }
}

const actions = {
  // 获取菜单
  handleMenu: ({commit}) => {
    getMenuList().then(res => {
      commit('MENU', res.data)
      commit('MENU_SELECT', '/')
    })
  }
  // 激活菜单
  // handleMenuSelect: ({
  //   commit
  // }, name) => {
  //   commit('MENU_SELECT', name)
  // }
}

export default {state, getters, mutations, actions}
