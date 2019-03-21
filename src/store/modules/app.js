import qs from "qs";
import config from "@/config";

const state = {
  title: document.title, // 页面 title 元素内容
  loading: false, // 加载状态
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || "", // 用户信息
  resError: "" // 错误数据
};

const getters = {
  // getTitle: state => state.title,
  // getLoading: state => state.loading,
  getUserInfo: state => state.userInfo,
  getResError: state => state.resError
};

const mutations = {
  // 更新页面 title 元素内容
  TITLE: (state, data) => {
    document.title =
      config.env === "production"
        ? `${state.title} | ${data}`
        : `${config.env} ) ${state.title} | ${data}`;
  },
  // 更新加载状态
  LOADING: (state, data) => {
    state.loading = data;
  },
  // 更新用户信息
  USER_INFO: (state, data) => {
    state.userInfo = data;
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  },
  // 更新错误数据
  RES_ERROR: (state, data) => {
    state.resError = data
      ? {
          status: data.status,
          statusText: data.statusText,
          statusCode: `${data.status} ${data.statusText}`,
          error: {
            "Response Data": data.data,
            "Request URL": data.config.url,
            "Request Method": data.config.method.toUpperCase(),
            "Form Data": qs.parse(data.config.data)
          }
        }
      : "";
  }
};

export default {
  state,
  getters,
  mutations
};
