<template>
<div id="sidebar">
  <Menu accordion ref="navigation" theme="dark" width="auto" :active-name="menuActive" :open-names="[menuOpened]" @on-select="handleMenuSelect">
    <template v-for="item in menu">
      <MenuItem v-if="!item.children" :key="item.path" :name="item.path">
      <Icon v-if="item.icon" :type="item.icon" />{{ item.name }}
      </MenuItem>
      <!-- 一级菜单 -->
      <Submenu v-else :key="item.path" :name="item.path">
        <template slot="title">
          <Icon v-if="item.icon" :type="item.icon" />{{ item.name }}
        </template>
        <MenuItem v-for="child in item.children" :key="child.path" :name="child.path">
        <Icon v-if="child.icon" :type="child.icon" />{{ child.name }}
        </MenuItem>
      </Submenu>
      <!-- 二级菜单 -->
    </template>
  </Menu>
</div>
</template>
<script>
import {
  // mapActions,
  mapGetters
} from "vuex";
export default {
  name: "ISidebar",
  computed: {
    ...mapGetters({
      menu: "getMenu",
      menuActive: "getMenuActive",
      menuOpened: "getMenuOpened"
    })
  },
  watch: {
    // 侦听路由变化
    $route() {
      this.handleMenuSelect(this.$route.path);
      // 手动更新展开的子目录
      this.$nextTick(function() {
        this.$refs["navigation"].updateOpened();
      });
    }
  },
  methods: {
    // ...mapActions(['handleMenuSelect'])
    handleMenuSelect(name) {
      this.$emit("on-click", false); // 关闭导航
      this.$store.commit("MENU_SELECT", name); // 选择菜单
      this.$route.meta.keepAlive = true; // 设置缓存组件
    }
  }
};
</script>
<style lang="postcss">
:root {
  --fColor: #2d8cf0;
  --bgColor1: #304156;
  --bgColor2: #263445;
  --bgColor3: #1f2d3d;
  --bgColor4: #001528;
}
#sidebar {
  background-color: var(--bgColor1);
  height: calc(100vh - 60px);
  overflow: auto;
  & .ivu-menu-dark.ivu-menu-vertical {
    background-color: var(--bgColor1);
    & .ivu-menu-item-active:not(.ivu-menu-submenu) {
      background-color: var(--bgColor1);
    }
    & .ivu-menu-opened {
      background-color: var(--bgColor3);
      & .ivu-menu-submenu-title {
        background-color: var(--bgColor1);
      }
      & .ivu-menu-item:hover {
        background-color: var(--bgColor4) !important;
      }
    }
    & .ivu-menu-submenu .ivu-menu-item-active {
      background-color: var(--bgColor3) !important;
      color: var(--fColor);
    }
    & .ivu-menu-item:hover,
    & .ivu-menu-submenu-title:hover {
      background-color: var(--bgColor2);
    }
  }
}
</style>
