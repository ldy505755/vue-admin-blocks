import Vue from "vue";
import Vuex from "vuex";

// Vuex 模块引入
import app from "@/store/modules/app";
import menus from "@/store/modules/menus";
import tabs from "@/store/modules/tabs";

// 调用 `Vuex`
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    menus,
    tabs
  }
});
