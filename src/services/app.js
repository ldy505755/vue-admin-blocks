import ax from '@/config/axios'

export const login = params => ax.post('/login', params) // 用户登录
export const getMenuList = () => ax.get('/menu') // 获取菜单
export const editPwd = params => ax.post('/edit-password', params) // 修改密码
