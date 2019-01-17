<template>
<div id="tabs">
  <Tabs type="card" :value="$route.path" @on-click="handleTabClick" @on-tab-remove="handleTabRemove">
    <TabPane v-if="menu.length" :key="menu[0]['path']" :name="menu[0]['path']" :label="menu[0]['name']"></TabPane>
    <TabPane v-for="item in tabs" :key="item['path']" :name="item['path']" :label="item['name']" closable></TabPane>
  </Tabs>
  <!-- Tabs -->
  <Dropdown v-if="menu.length" class="dropdown" placement="bottom-end" @on-click="handleTabRemove">
    <Icon type="md-menu" size="16" style="cursor: pointer;"></Icon>
    <DropdownMenu slot="list">
      <DropdownItem v-for="item in dropdown" :key="item.name" :name="item.name">
        <Icon :type="item.icon" size="16" style="margin-top: -2px;" /> {{ item.label }}
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  <!-- .dropdown -->
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ITabs',
  data: () => ({
    // 下拉菜单元素数组
    dropdown: [{
      label: '关闭其它标签',
      name: 'closeOtherTabs',
      icon: 'md-close'
    }, {
      label: '关闭所有标签',
      name: 'closeAllTabs',
      icon: 'md-close-circle'
    }]
  }),
  computed: {
    ...mapGetters({
      menu: 'getMenu',
      tabs: 'getTabs'
    })
  },
  watch: {
    // 侦听路由变化
    $route() {
      // 创建标签页
      this.$store.commit('NEW_TABS', this.$route.path)
    }
  },
  methods: {
    // 切换标签页
    handleTabClick(name) {
      this.$store.commit('MENU_SELECT', name) // 选择菜单
    },
    // 关闭标签页
    handleTabRemove(name) {
      let path = this.$route.path // 当前路径
      // 标签页管理菜单
      if (name.indexOf('/')) {
        path = name === 'closeAllTabs' ? '/' : path
        name = [name, path]
      }
      let nextPath // 相邻路径
      // 关闭当前标签页
      if (path === name) {
        let tabs = this.tabs // 标签页对象
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i]['path'] === name) {
            // 获取当前相邻标签页
            var nextTab = tabs[i + 1] || tabs[i - 1]
            nextPath = nextTab ? nextTab['path'] : '/'
          }
        }
      }
      if (path === name || path === '/') {
        this.handleTabClick(nextPath || path) // 切换标签页
      }
      this.$store.commit('CLOSE_TABS', name) // 关闭标签页
    }
  }
}
</script>
<style lang="postcss">
#tabs {
  & .ivu-tabs-bar {
    margin-bottom: 0;
    padding: 8px 32px 0 16px;
  }
  & .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    background-color: #f0f0f0;
  }
  & .dropdown {
    position: absolute;
    right: 8px;
    top: 10px;
    z-index: 99;
  }
}
</style>
