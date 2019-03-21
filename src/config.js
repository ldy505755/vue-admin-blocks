const version = "3.2.1"; // 系统版本
const timeout = 10000; // 请求超时
const baseAPI = {
  development: "http://dev.xx.com/api",
  test: "https://test.xx.com/api",
  release: "https://release.xx.com/api",
  production: "https://prod.xx.com/api"
};
const env = localStorage.getItem("env") || process.env.VUE_APP_ENV;
const baseURL = localStorage.getItem("newBaseAPI") || baseAPI[env];

if (env !== "production") {
  console.log("VUE_APP_ENV", env);
  console.log("API_URL", baseURL);
}

// 系统参数配置
export default {
  version, // 系统版本
  timeout, // 请求超时
  baseAPI, // 所有环境接口对象
  env, // 当前环境
  baseURL // 当前环境接口地址
};
