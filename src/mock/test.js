import Mock from 'mockjs'

export default () => {
  // 测试数据
  Mock.mock(/\/test/, () => ({
    data: 'test page',
    error: {
      code: 0,
      msg: 'Get test success'
    }
  }))
}
