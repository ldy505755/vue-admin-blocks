import ax from '@/utils/axios'

export const getUserList = params => ax.get('/user-list', {
  params
}) // 列表
export const delUser = params => ax.post('/user-delete', params) // 删除
export const batchDelUser = params => ax.post('/user-batch-delete', params) // 批量删除
export const editUser = params => ax.post(params.id ? '/user-edit' : '/user-create', params) // 编辑/创建
