export default(Mock, qs) => {
  let citys = {
    '110100': 'BeiJing',
    '310100': 'ShangHai',
    '440100': 'GuangZhou',
    '330100': 'HangZhou',
    '330200': 'NingBo'
  }
  let hobbys = {
    'eat': 'Eat',
    'sleep': 'Sleep',
    'run': 'Run',
    'movie': 'Movie'
  }
  let data = Mock.mock({
    'users|11-87': [
      {
        id: '@guid',
        name: '@name',
        'age|18-55': 1,
        'gender|0-1': 1,
        email: '@email',
        birth: '@date',
        'city|1': citys,
        'hobby|1-3': hobbys,
        desc: '@paragraph'
      }
    ]
  })
  let users = data.users

  // 参数函数
  let params = (cityStr, hobbyArr) => {
    let city = {}
    if (cityStr) {
      city[cityStr] = citys[cityStr]
    }
    let hobby = {}
    if (hobbyArr) {
      let len = hobbyArr.length
      for (let i = 0; i < len; i++) {
        let k = hobbyArr[i]
        hobby[k] = hobbys[k]
      }
    }
    return {city, hobby}
  }

  // 用户列表
  Mock.mock(/\/user-list/, config => {
    let {pagePara, name} = qs.parse(config.url.split('?')[1])
    let {current, pageSize} = JSON.parse(pagePara)
    let _users = users.filter(u => {
      if (name && u.name.indexOf(name) === -1) {
        return false
      }
      return true
    })
    let total = _users.length
    let pageMax = Math.ceil(total / pageSize)
    current = current > pageMax
      ? pageMax
      : current
    _users = _users.filter((u, index) => index < pageSize * current && index >= pageSize * (current - 1))
    return {
      data: {
        total: total,
        users: _users
      },
      error: {
        code: 0,
        msg: 'Get users success'
      }
    }
  })

  // 删除用户
  Mock.mock(/\/user-delete/, config => {
    let {id} = qs.parse(config.body)
    users = users.filter(u => u.id !== id)
    return {
      error: {
        code: 0,
        msg: 'Delete success'
      }
    }
  })

  // 批量删除用户
  Mock.mock(/\/user-batch-delete/, config => {
    let {ids} = qs.parse(config.body)
    ids = ids.split(',')
    users = users.filter(u => !ids.includes(u.id))
    return {
      error: {
        code: 0,
        msg: 'Delete success'
      }
    }
  })

  // 编辑用户
  Mock.mock(/\/user-edit/, config => {
    let {
      id,
      name,
      age,
      gender,
      email,
      birth,
      city,
      hobby,
      desc
    } = qs.parse(config.body)
    let _params = params(city, hobby)
    users.some(u => {
      if (u.id === id) {
        u.name = name
        u.age = parseInt(age)
        u.gender = parseInt(gender)
        u.email = email
        u.birth = birth
        u.city = _params.city
        u.hobby = _params.hobby
        u.desc = desc
      }
    })
    return {
      error: {
        code: 0,
        msg: 'Update success'
      }
    }
  })

  // 新增用户
  Mock.mock(/\/user-create/, config => {
    let {
      name,
      age,
      gender,
      email,
      birth,
      city,
      hobby,
      desc
    } = qs.parse(config.body)
    let _params = params(city, hobby)
    users.unshift({
      id: Mock.mock('@guid'),
      name: name,
      age: parseInt(age),
      gender: parseInt(gender),
      email: email,
      birth: birth,
      city: _params.city,
      hobby: _params.hobby,
      desc: desc
    })
    return {
      error: {
        code: 0,
        msg: 'Create success'
      }
    }
  })
}
