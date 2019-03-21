// `routes` 配置
export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/layouts/Login")
    // }, {
    //   path: '/',
    //   name: 'Layouts',
    //   redirect: '/',
    //   component: () => import('@/layouts'),
    //   children: [{
    //     path: '/',
    //     name: 'Dashboard',
    //     component: () => import('@/views/dashboard'),
    //     meta: {
    //       keepAlive: true
    //     }
    //   }, {
    //     path: '/test',
    //     name: 'Test',
    //     component: () => import('@/views/Test'),
    //     meta: {
    //       keepAlive: true
    //     }
    //   }, {
    //     path: '/hello/hello-world',
    //     name: 'HelloWorld',
    //     component: () => import('@/views/hello/helloWorld'),
    //     meta: {
    //       keepAlive: true
    //     }
    //   }, {
    //     path: '/manage/users',
    //     name: 'Users',
    //     component: () => import('@/views/manage/users'),
    //     meta: {
    //       keepAlive: true
    //     }
    //   }]
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/layouts/pages/NotFound")
  }
];
