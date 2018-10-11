import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes
}

const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.clear()
  }

  const user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
