<template>
<div :id="nav ? 'sys-nav' : 'sys-sidebar'">
  <Menu accordion ref="navigation" :active-name="menuActive" :open-names="[menuOpened]" @on-select="handleMenuSelect" :width="nav ? '240px' : 'auto'">
    <template v-for="item in menu">
    <MenuItem v-if="!item.children" :key="item.path" :name="item.path">{{ item.name }}</MenuItem>
    <!-- 一级菜单 -->
    <Submenu v-else :key="item.path" :name="item.path">
    <template slot="title">{{ item.name }}</template>
    <MenuItem v-for="child in item.children" :key="child.path" :name="child.path"> {{ child.name }} </MenuItem>
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
} from 'vuex'
export default {
  name: 'SysSidebar',
  props: {
    nav: Boolean
  },
  computed: {
    ...mapGetters({
      menu: 'getMenu',
      menuActive: 'getMenuActive',
      menuOpened: 'getMenuOpened'
    })
  },
  watch: {
    // 侦听路由变化
    $route() {
      // 手动更新展开的子目录
      this.$nextTick(function() {
        this.$refs['navigation'].updateOpened()
      })
    }
  },
  methods: {
    // ...mapActions(['handleMenuSelect'])
    handleMenuSelect(name) {
      this.$emit('on-click', false) // 关闭导航
      this.$store.commit('MENU_SELECT', name) // 选择菜单
    }
  }
}
</script>
<style lang="postcss" scoped>
#sys-nav {
  & .ivu-menu-vertical::after {
    display: none;
  }
}
#sys-sidebar {
  overflow: auto;
  height: calc(100vh - 60px);
  background-color: #efefef;
  & .ivu-menu-vertical {
    background-color: #efefef;
    &::after {
      display: none;
    }
    & .ivu-menu-item-active {
      background-color: #f3f3f3;
    }
  }
}
</style>
