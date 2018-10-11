import Mock from 'mockjs'
import qs from 'qs'
import app from './app'
import users from './users'
import test from './test'

const mock = () => {
  // 登录，菜单，改密
  app(Mock, qs)
  // 用户管理
  users(Mock, qs)
  // 测试
  test(Mock, qs)
}

export default {mock}
