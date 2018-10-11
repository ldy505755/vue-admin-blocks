**Demo:** <http://vab.cssue.com/>

> -   Username: admin
> -   Password: wasd@007

## 特性

1.  基于 Vue.js 的企业级中后台开源项目
2.  基于 Vue 官方命令行工具 Vue CLI 2 脚手架搭建
3.  使用 Vue 官方核心插件 Vue Router, Vuex
4.  使用 Vue 官方建议的 Axios 插件进行 HTTP 操作
5.  采用时下热门的 UI 组件库 iView
6.  通过 Mock.js 插件拦截 Ajax 请求并生成随机数据
7.  使用 cssnext 预处理 编写样式

## 开发构建

### 目录结构

```bash
├── /build/            # 项目构建(webpack)相关配置
├── /config/           # 项目开发环境配置
├── /src/              # 源码目录
│ ├── /assets/         # 组件静态资源(图片)
│ ├── /components/     # 公共组件
│ ├── /config/         # 项目配置
│ ├── /mock/           # 数据模拟
│ ├── /router/         # 路由配置
│ ├── /services/       # 数据接口
│ ├── /store/          # vuex状态管理
│ ├── /utils/          # 工具函数
│ ├── /views/          # 路由组件(页面维度)
│ ├── App.vue          # 组件入口
│ └── main.js          # 应用入口
├── /static/           # 非组件静态资源
├── .babelrc           # ES6语法编译配置
├── .editorconfig      # 定义代码格式
├── .eslintignore      # ES6规范忽略文件
├── .eslintrc.js       # ES6语法规范配置
├── .gitignore         # git忽略文件
├── .postcssrc         # PostCSS插件配置
├── index.html         # 页面入口
├── LICENSE            # 版权信息
├── package-lock.json  # 项目依赖包
├── package.json       # 项目依赖包
└── README.md          # 项目文档
```

### 开发流程

Step 1, 新建组件(测试) views/Test.vue

```html
<template>
<div id="test">
  <Spin v-if="loading" size="large" fix></Spin>
  <h2 v-else>This is a {{ title }}</h2>
</div>
</template>
<script>
import { test } from '@/services/test'
export default {
  name: 'Test',
  data: () => ({
    title: '',
    loading: false
  }),
  mounted() {
    this.loading = true
    // 模拟异步请求
    setTimeout(() => {
      test().then(res => {
        this.loading = false
        this.title = res.data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }, 500)
  }
}
</script>
<style lang="postcss" scoped>
/* 样式使用 cssnext 预处理 */
#test {
  & h2 {
    border-left: 2px solid #CCC;
    padding-left: 12px;
  }
}
</style>
```

Step 2, 添加路由(测试) router/routes.js

```javascript
export default[
  {
    path: '/',
    redirect: '/',
    name: 'SysLayout',
    component: resolve => {
      require(['@/views/common/layouts/Layout'], resolve)
    },
    children: [
      {
        // 添加路由(测试)
        path: '/test',
        name: 'Test',
        component: resolve => {
          require(['@/views/Test'], resolve)
        }
      }
    ]
  }
]
```

Step 3, 添加临时菜单(测试) mock/app.js

```javascript
export default(Mock, qs) => {
  Mock.mock(/\/menu/, {
    data: [
      {
        // 添加临时菜单(测试)
        name: 'Test',
        path: '/test'
      }
    ]
  })
}
```

\* **注意**

> -   添加临时菜单需要重新登录才能显示新菜单

Step 4, 新建接口管理文件 services/test.js

```javascript
import ax from '@/config/axios'

export const test = () => ax.get('/test')
```

Step 5, 新建数据模拟文件 mock/test.js

```javascript
export default(Mock, qs) => {
  Mock.mock(/\/test/, () => ({
    data: 'test page',
    error: {
      code: 0,
      msg: 'Get test success'
    }
  }))
}
```

Step 6, 使用数据模拟文件 mock/index.js

```javascript
import Mock from 'mockjs'
import qs from 'qs'
import test from './test'

const mock = () => {
  test(Mock, qs)
}

export default {mock}
```

\* **提示**

> -   如需使用 vuex 存储状态, 请阅读 views/common/partials/Sidebar.vue 组件和 store 目录源码

### 快速开始

Step 1, 安装依赖:

```bash
# 安装依赖
yarn
# 或
npm install
```

Step 2, 开发:

```bash
# 启用热加载到 localhost:8090
npm start
# 或
npm run dev
```

Step 3, 构建:

```bash
# 构建最小测试
npm run test

# 构建最小预发布
npm run release

# 构建最小生产
npm run build

# 构建最小生产并查看包分析器报告
npm run build --report
```
