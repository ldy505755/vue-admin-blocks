import ax from "@/utils/axios";

export const _login = params => ax.post("/login", params); // 用户登录
export const _getMenuList = () => ax.get("/menu"); // 获取菜单
export const _editPwd = params => ax.post("/edit-password", params); // 修改密码
