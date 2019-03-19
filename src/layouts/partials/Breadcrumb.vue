<template>
<div id="breadcrumb">
  <router-link v-if="$route.path !== '/'" to="/">
    <Icon v-if="dashboard.icon" :type="dashboard.icon" class="icon" />{{ dashboard.name }}
  </router-link>
  <transition-group name="breadcrumb">
    <span v-for="elem in breadcrumb" :key="elem.path">
      <span v-if="$route.path !== '/'" class="separator">/</span>
      <Icon v-if="elem.icon" :type="elem.icon" class="icon" />{{ elem.name }}
    </span>
  </transition-group>
</div>
</template>
<script>
import config from '@/config'
export default {
  name: 'IBreadcrumb',
  data: () => ({
    dashboard: '',
    breadcrumb: []
  }),
  watch: {
    // 侦听路由变化
    $route() {
      this.handleBreadcrumb()
    }
  },
  mounted() {
    this.handleBreadcrumb()
  },
  methods: {
    handleBreadcrumb() {
      const menu = this.$store.state.menus.menu // 获取菜单(主菜单和子菜单)
      if (!menu) {
        return false
      }
      const thisPath = this.$route.path // 当前菜单路径
      const mainPath = `/${thisPath.split('/')[1]}` // 主菜单路径
      const curMenu = menu.filter(name => name['path'] === mainPath)[0] // 获取当前菜单(主菜单和子菜单)
      const childMenu = curMenu['children'] // 获取当前菜单(子菜单)
      const breadcrumb = []
      let curTitle = curMenu['name']
      breadcrumb.push({
        name: curMenu['name'],
        icon: curMenu['icon'],
        path: curMenu['path']
      })
      if (childMenu) {
        for (const item of childMenu) {
          if (item['path'] === thisPath) {
            curTitle = item['name']
            breadcrumb.push({
              name: item['name'],
              icon: item['icon'],
              path: item['path']
            })
          }
        }
      }
      this.dashboard = menu[0]
      this.breadcrumb = breadcrumb

      // 更新页面 title 元素内容
      this.$store.commit('TITLE', curTitle)
    }
  }
}
</script>
<style lang="postcss" scoped>
#breadcrumb {
  color: #ccc;
  font-size: 12px;
  line-height: 24px;
  margin-top: 18px;
  & .separator {
    margin: 0 8px;
  }
  & .icon {
    margin: 0 4px 2px 0;
  }
  & span {
    display: inline-block;
  }

  /* breadcrumb transition */
  & .breadcrumb-enter-active,
  & .breadcrumb-leave-active {
    transition: all .5s;
  }

  & .breadcrumb-enter,
  & .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  & .breadcrumb-move {
    transition: all .5s;
  }

  & .breadcrumb-leave-active {
    position: absolute;
  }
}
</style>
