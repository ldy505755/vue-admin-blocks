import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// iView 完整引入
import iView from "iview";
import "iview/dist/styles/iview.css";
// 自定义组件引入
import iComp from "@/components";
// 工具函数引入
import Utils from "@/utils";
// 自定义组件引入
import vComp from "@/views/components";

// Mock 数据引入
import Mock from "@/mock";
// if (process.env.NODE_ENV === 'development') {
Mock();
// }

// 调用 `iView`
Vue.use(iView);
// 调用 `iComp`
Vue.use(iComp);
// 调用 `vComp`
Vue.use(vComp);

Object.defineProperty(Vue.prototype, "$Utils", {
  value: Utils
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
