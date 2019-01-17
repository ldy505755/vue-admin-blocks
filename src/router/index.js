import Vue from 'vue'
import VueRouter from 'vue-router'
// import iView from 'iview'
import routes from '@/router/routes'

// 调用 `VueRouter`
Vue.use(VueRouter)

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next('/login')
    sessionStorage.clear()
    // iView.LoadingBar.finish()
  } else {
    next()
  }
})

// router.afterEach((to, from) => {
//   iView.LoadingBar.finish()
// })

export default router
