**Demo:** <http://vab.cssue.com/>

> -   Username: admin
> -   Password: wasd@007

## 特性

1.  基于 Vue.js 的企业级中后台开源集成方案
2.  基于 Vue 官方命令行工具 Vue CLI 3 脚手架搭建
3.  使用 Vue 官方核心插件 Vue Router, Vuex
4.  使用 Vue 官方建议的 Axios 插件进行 HTTP 操作
5.  采用时下热门的 UI 组件库 iView
6.  通过 Mock.js 插件拦截 Ajax 请求并生成随机数据
7.  使用 cssnext 预处理 编写样式

## 开发构建

### 目录结构

```bash
├── /public            # 静态文件
├── /src               # 源码目录
│ ├── /assets          # 静态资源
│ ├── /components      # 公共组件
│ ├── /layouts         # 布局组件
│ ├── /mock            # 数据模拟
│ ├── /router          # 路由配置
│ ├── /services        # 数据接口
│ ├── /store           # vuex状态管理
│ ├── /utils           # 工具库
│ ├── /views           # 路由组件(页面维度)
│ ├── App.vue          # 组件入口
│ ├── config.js        # 应用配置
│ └── main.js          # 应用入口
├── .editorconfig      # 定义代码格式
├── .env.development   # 开发环境
├── .env.production    # 生产环境
├── .env.release       # 预生产环境
├── .env.test          # 测试环境
├── .gitignore         # git忽视
├── babel.config.js    # ES6语法编译配置
├── LICENSE            # 版权信息
├── package.json       # 依赖包
├── README.md          # 项目文档
└── vue.config.js      # 项目配置
```

### 开发流程

**Step 1,** 新建路由组件(测试) views/Test.vue

```html
<template>
  <Content id="test">
    <Spin v-if="loading" size="large" fix />
    <h2>This is a {{ title }}</h2>
  </Content>
</template>
<script>
import {
  _test // 测试接口
} from '@/services/test' // 接口文件
export default {
  name: 'Test', // 组件名称
  data: () => ({
    title: '',
    loading: false
  }),
  mounted() {
    this.$Loading.start()
    this.loading = true
    // 模拟异步请求
    setTimeout(() => {
      _test().then(res => {
        this.$Loading.finish()
        this.loading = false
        this.title = res.data
      }).catch(err => {
        this.$Loading.error()
        this.loading = false
        console.error(err)
      })
    }, 500)
  }
}
</script>
<style lang="postcss" scoped>
/* 样式使用 cssnext 预处理 */
:root {
  --bdColor: #ccc;
}
#test {
  & h2 {
    border-left: 4px solid var(--bdColor);
    padding-left: 12px;
  }
}
</style>
```

**Step 2,** 添加临时菜单(测试) mock/app.js

```javascript
import Mock from 'mockjs'

export default () => {
  Mock.mock(/\/menu/, {
    data: [{
      path: '/test', // 路由地址
      name: 'Test', // 菜单名称
      icon: 'md-document', // 菜单 Icon 图标
      compName: 'Test', // 组件名称
      compPath: '/Test' // 组件地址（ 默认指向 src/views 路由组件目录
    }]
  })
}
```

\* **注意**

> 1.  添加临时菜单需要重新登录才能更新新菜单
> 2.  因为路由是通过菜单动态生成，所以无需再为项目配置路由

**Step 3,** 新建接口管理文件 services/test.js

```javascript
import ax from '@/utils/axios'

export const _test = () => ax.get('/test') // 测试接口
```

\* **提示**

> -   如果后端提供正式接口，那么无须再模拟假数据，直接跳过 Step 4 和 Step 5
> -   如需使用 vuex 管理状态, 请阅读 src/layouts/partials/Sidebar.vue 组件和 src/store 目录源码

**Step 4,** 新建数据模拟文件 mock/test.js

```javascript
import Mock from 'mockjs'

export default () => {
  Mock.mock(/\/test/, () => ({
    data: 'test page' // 测试数据
  }))
}
```

**Step 5,** 使用数据模拟文件 mock/index.js

```javascript
import test from './test'

export default () => {
  test() // 测试
}
```

### 快速开始

**Step 1,** 安装依赖:

```bash
# 安装依赖
yarn
# 或
npm i
```

**Step 2,** 开发:

```bash
yarn start
# 或
npm start
```

**Step 3,** 构建:

```bash
# 构建最小测试
yarn test
# 或
npm test

# 构建最小预发布
yarn release
# 或
npm run release

# 构建最小生产
yarn build
# 或
npm run build
```
