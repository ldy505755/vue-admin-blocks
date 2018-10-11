export default(Mock, qs) => {
  // 用户登录
  Mock.mock(/\/login/, config => {
    let {user, pwd} = qs.parse(config.body)
    if (user === 'admin' && pwd === 'wasd@007') {
      return {
        data: {
          user_id: Mock.mock('@guid'),
          auth_token: Mock.mock('@guid'),
          real_name: 'Admin'
        },
        error: {
          code: 0,
          msg: 'Login success'
        }
      }
    }
    return {
      error: {
        code: 4000,
        msg: 'Your account username or password is incorrect'
      }
    }
  })

  // 菜单获取
  Mock.mock(/\/menu/, {
    data: [
      {
        name: 'Dashboard',
        path: '/'
      }, {
        name: 'Test',
        path: '/test'
      }, {
        name: 'Hello',
        path: '/hello',
        children: [
          {
            name: 'HelloWorld',
            path: '/hello/hello-world'
          }
        ]
      }, {
        name: 'Manage',
        path: '/manage',
        children: [
          {
            name: 'Users',
            path: '/manage/users'
          }
        ]
      }
    ],
    error: {
      code: 0,
      msg: 'Get menu success'
    }
  })

  // 密码修改
  Mock.mock(/\/edit-password/, config => {
    let {oldPwd} = qs.parse(config.body)
    if (oldPwd === 'wasd@007') {
      return {
        error: {
          code: 0,
          msg: 'Edit password success'
        }
      }
    }
    return {
      error: {
        code: 4000,
        msg: 'Your current password is incorrect'
      }
    }
  })
}
