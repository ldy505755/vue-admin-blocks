import ax from "@/utils/axios";

export const _getUserList = params =>
  ax.get("/user-list", {
    params
  }); // 列表
export const _delUser = params => ax.post("/user-delete", params); // 删除
export const _batchDelUser = params => ax.post("/user-batch-delete", params); // 批量删除
export const _editUser = params =>
  ax.post(params.id ? "/user-edit" : "/user-create", params); // 编辑/创建
