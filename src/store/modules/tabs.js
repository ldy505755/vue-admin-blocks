const state = {
  tabs: JSON.parse(sessionStorage.getItem("tabs")) || [] // 标签页
};

const getters = {
  getTabs: state => state.tabs
};

const mutations = {
  // 创建标签页
  NEW_TABS: (state, data) => {
    const menu = JSON.parse(sessionStorage.getItem("menu")); // 获取菜单(主菜单和子菜单)
    // 判断展开标签页或首页
    if (
      !menu ||
      state.tabs.some(name => name["path"] === data) ||
      data === "/"
    ) {
      return false;
    }
    const path = `/${data.split("/")[1]}`; // 主菜单路径
    const childMenu = menu.filter(name => name["path"] === path)[0]["children"]; // 获取子菜单
    let tab;
    if (childMenu) {
      tab = childMenu.filter(name => name["path"] === data)[0]; // 当前标签页
    } else {
      tab = menu.filter(name => name["path"] === data)[0]; // 当前标签页
    }
    state.tabs.push({
      name: tab["name"],
      path: tab["path"]
    });
    // 添加当前标签页
    sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
  },
  // 关闭标签页
  CLOSE_TABS: (state, data) => {
    switch (data[0]) {
      case "closeAllTabs":
        // 关闭所有标签页
        state.tabs = [];
        break;
      case "closeOtherTabs":
        // 关闭其它标签页
        state.tabs = state.tabs.filter(name => name["path"] === data[1]);
        break;
      default:
        // 关闭当前标签页
        state.tabs = state.tabs.filter(name => name["path"] !== data);
    }
    // 更新当前标签页
    sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
  },
  // 重置标签页
  TABS_RESET: state => {
    state.tabs = [];
  }
};

export default {
  state,
  getters,
  mutations
};
