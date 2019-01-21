import Vue from 'vue'
import VueRouter from 'vue-router'
// import iView from 'iview'
import routes from '@/router/routes'
import store from '@/store'

// 调用 `VueRouter`
Vue.use(VueRouter)

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  if (to.path === '/login') {
    document.title = sessionStorage.getItem('title') || document.title // 更新页面 title 元素内容
    store.commit('MENU_RESET') // 重置菜单
    store.commit('TABS_RESET') // 重置标签页
  }
  const user = store.state.app.userInfo
  if (!user && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

// router.afterEach((to, from) => {
//   iView.LoadingBar.finish()
// })

export default router
