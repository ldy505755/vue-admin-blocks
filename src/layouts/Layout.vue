<template>
<div id="layout">
  <IHeader />
  <!-- IHeader -->
  <Row>
    <Col :xs="0" :sm="0" :md="5" :lg="4" :xl="3">
    <ISidebar ref="sidebar" />
    <!-- ISidebar -->
    </Col>
    <Col :xs="24" :sm="24" :md="19" :lg="20" :xl="21">
    <ITabs />
    <!-- ITabs -->
    <div id="container">
      <div id="main">
        <!-- {{ keepAlive }}
        <pre>{{ routes }}</pre> -->
        <!-- <transition name="fade-transform" mode="out-in"> -->
          <keep-alive>
            <router-view v-if="keepAlive" />
          </keep-alive>
          <router-view v-if="!keepAlive" />
        <!-- </transition> -->
      </div>
      <!-- #main -->
      <IFooter />
      <!-- IFooter -->
    </div>
    <!-- #container -->
    </Col>
  </Row>
  <IError />
  <!-- IError -->
</div>
</template>
<script>
import IHeader from "@/layouts/partials/Header";
import ISidebar from "@/layouts/partials/Sidebar";
import ITabs from "@/layouts/partials/Tabs";
import IFooter from "@/layouts/partials/Footer";
import IError from "@/layouts/partials/Error";
import { mapGetters } from "vuex";
export default {
  name: "ILayout",
  components: {
    IHeader,
    ISidebar,
    ITabs,
    IFooter,
    IError
  },
  data: () => ({
    routes: [],
    keepAlive: true
  }),
  computed: {
    ...mapGetters({
      menu: "getMenu",
      tabs: "getTabs"
    })
  },
  watch: {
    // 侦听路由变化
    $route() {
      this.$store.commit("MENU_SELECT", this.$route.fullPath); // 选择菜单
      this.$refs["sidebar"].updateOpened(); // 手动更新展开的子菜单
      // 设置路由组件缓存
      for (const route of this.routes) {
        if (route.path === this.$route.path) {
          this.keepAlive = route.meta.keepAlive;
        }
      }
    },
    // 侦听标签变化
    tabs() {
      // 根据 tabs 的增减来判断路由组件是否进行缓存
      this.handleKeepAlive();
    }
  },
  mounted() {
    this.routes = this.$router["options"]["routes"][0]["children"]; // 获取动态路由
    // 根据 tabs 的增减来判断路由组件是否进行缓存
    this.handleKeepAlive();
  },
  methods: {
    // 根据 tabs 的增减来判断路由组件是否进行缓存
    handleKeepAlive() {
      for (const route of this.routes) {
        if (route.meta.keepAliveUse) {
          route.meta.keepAlive = false;
        }
        for (const tab of this.tabs) {
          if (route.path === tab.path) {
            route.meta.keepAliveUse = true;
            route.meta.keepAlive = true;
          }
        }
      }
    }
  }
};
</script>
<style lang="postcss">
#container {
  background-color: #f0f0f0;
  height: calc(100vh - 100px);
  overflow: auto;
  & #main {
    min-height: calc(100% - 43px);
    overflow: hidden;
    padding: 16px;
  }

  /* fade-transform */
  & .fade-transform-enter-active,
  & .fade-transform-leave-active {
    transition: all 0.3s;
  }

  & .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  & .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
