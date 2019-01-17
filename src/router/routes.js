// `routes` 配置
export default [{
  path: '/login',
  name: 'Login',
  component: () => import('@/layouts/Login')
}, {
  path: '/',
  name: 'Layouts',
  redirect: '/',
  component: () => import('@/layouts'),
  children: [{
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/dashboard')
  }, {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test')
  }, {
    path: '/hello/hello-world',
    name: 'HelloWorld',
    component: () => import('@/views/hello/helloWorld')
  }, {
    path: '/manage/users',
    name: 'Users',
    component: () => import('@/views/manage/users')
  }]
}, {
  path: '*',
  name: 'NotFound',
  component: () => import('@/layouts/pages/NotFound')
}]
