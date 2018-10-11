// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// iView 完整引入
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 自定义组件引入
import VCom from './components'
// 工具函数引入
import Utils from './utils'

// mock 数据引入
import Mock from './mock'
Mock.mock()

Vue.use(iView)
Vue.use(VCom)

Object.defineProperty(Vue.prototype, '$Utils', {value: Utils})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: {
  //   App
  // }
}).$mount('#app')
