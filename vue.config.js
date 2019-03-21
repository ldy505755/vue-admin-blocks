// vue.config.js
const path = require("path");
const dir = `dist/${process.env.VUE_APP_ENV}`;

module.exports = {
  // 部署生产环境和开发环境下的 URL
  // baseUrl: process.env.NODE_ENV === "production" ? "/your_url" : "/",
  // 生成构建文件的目录
  outputDir: path.resolve(__dirname, dir),
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: path.resolve(__dirname, `${dir}/index.html`),
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  // 指定服务端口
  devServer: {
    port: 8090
  }
};
