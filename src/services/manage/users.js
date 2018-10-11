import ax from '@/config/axios'

export const getUserList = params => ax.get('/user-list', {params: params}) // 列表
export const delUser = params => ax.post('/user-delete', params) // 删除
export const batchDelUser = params => ax.post('/user-batch-delete', params) // 批量删除
export const editUser = params => {
  const url = params.id
    ? '/user-edit' // 编辑
    : '/user-create' // 新增
  return ax.post(url, params)
}
