let version = '0.1.0' // 系统版本
let baseAPI = {
  development: 'http://dev.xx.com/api',
  test: 'https://test.xx.com/api',
  release: 'https://release.xx.com/api',
  production: 'https://prod.xx.com/api'
}
let env = process.env.NODE_ENV
let baseURL = baseAPI[env]

// 系统参数配置
export default {
  timeout: 10000, // 请求超时
  version, // 系统版本
  baseAPI, // 所有环境接口对象
  env, // 当前环境
  baseURL // 当前环境接口地址
}
