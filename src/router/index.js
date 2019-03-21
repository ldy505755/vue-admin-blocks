import Vue from "vue";
import VueRouter from "vue-router";
// import iView from 'iview'
import routes from "@/router/routes";
import store from "@/store";
import utils from "@/utils";

// 调用 `VueRouter`
Vue.use(VueRouter);

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

// 刷新页面更新动态路由
const menu = store.state.menus.menu;
if (menu.length) {
  // 获取动态路由
  const routes = utils.getRoutes(menu);
  // 添加动态路由
  router.addRoutes(routes);
}

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  if (to.path === "/login") {
    store.commit("MENU_RESET"); // 重置菜单
    store.commit("TABS_RESET"); // 重置标签页
  }
  const user = store.state.app.userInfo;
  if (!user && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

// router.afterEach((to, from) => {
//   iView.LoadingBar.finish()
// })

export default router;
