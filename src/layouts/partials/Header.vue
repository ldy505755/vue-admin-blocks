<template>
<div id="header">
  <Row>
    <Col :xs="0" :sm="0" :md="14" :lg="14" :xl="14">
    <div class="logo-info">
      <img class="logo" src="@/assets/logo.png" alt="logo">
      <p class="name">企业级中后台集成方案 <br> <span class="sub">基于 Vue.js 的开源集成方案</span></p>
    </div>
    <!-- .logo-info -->
    <IBreadcrumb />
    <!-- IBreadcrumb -->
    </Col>
    <Col :xs="4" :sm="2" :md="0" :lg="0" :xl="0">
    <Poptip class="navigation" placement="right-start" v-model="visible">
      <Icon class="nav-icon" type="md-menu" size="32" />
      <Sidebar slot="content" @on-click="handleClose" />
    </Poptip>
    <!-- .navigation -->
    </Col>
    <Col :xs="20" :sm="22" :md="10" :lg="10" :xl="10">
    <div class="login-info">
      <Dropdown placement="bottom-end" @on-click="handleDropdown">
        <strong class="user">
          <Avatar style="background-color: #1890ff" icon="md-person" size="small" />
          Hi, {{ userName }}
        </strong>
        <DropdownMenu class="list" slot="list">
          <DropdownItem v-for="item in dropdown" :key="item.name" :name="item.name">
            <Icon :type="item.icon" size="16" style="margin-top: -2px;" /> {{ item.label }}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!-- .login-info -->
    </Col>
  </Row>
  <EditPassword ref="editPassword" />
  <!-- EditPassword -->
</div>
</template>
<script>
import EditPassword from "@/layouts/pages/EditPassword";
import Sidebar from "@/layouts/partials/Sidebar";
import IBreadcrumb from "@/layouts/partials/Breadcrumb";
export default {
  name: "IHeader",
  components: {
    EditPassword,
    Sidebar,
    IBreadcrumb
  },
  data: () => ({
    // 导航可视状态
    visible: false,
    // 用户名
    userName: "",
    // 下拉菜单元素数组
    dropdown: [
      {
        label: "Password",
        name: "editPassword",
        icon: "md-lock"
      },
      {
        label: "Sign out",
        name: "signout",
        icon: "md-log-out"
      }
    ]
  }),
  mounted() {
    // 获取用户信息
    const userInfo = this.$store.state.app.userInfo;
    this.userName = userInfo.real_name || "Null";
  },
  methods: {
    // 关闭导航
    handleClose(state) {
      this.visible = state;
    },
    // 下拉菜单项
    handleDropdown(name) {
      switch (name) {
        case "editPassword":
          // 修改密码
          this.$refs[name].showModal();
          break;
        default:
          // 退出系统
          this.$Modal.confirm({
            title: "Warning",
            content: "Do you confirm the exit system?",
            okText: "OK",
            cancelText: "Cancel",
            onOk: () => {
              this.$router.push("/login");
            }
          });
      }
    }
  }
};
</script>
<style lang="postcss">
#header {
  background-color: #1f2d3d;
  color: #fff;
  min-height: 60px;
  & #sidebar {
    height: auto;
    width: 240px;
  }
  & .ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow:after,
  & .ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow {
    border-right-color: #304156;
  }
  & .ivu-poptip-inner {
    background-color: #304156;
  }
  & .ivu-poptip-body {
    padding: 8px 0;
  }
  & .logo-info {
    float: left;
    width: 270px;
  }
  & .logo {
    float: left;
    height: 40px;
    margin: 10px 16px;
    width: 40px;
  }
  & .name {
    font-size: 18px;
    line-height: 20px;
    padding: 12px 0 6px;
  }
  & .sub {
    font-size: 12px;
  }
  & .navigation {
    cursor: pointer;
    margin-left: 16px;
    margin-top: 14px;
  }
  & .login-info {
    margin: 18px 16px 0 0;
    text-align: right;
    & .user {
      color: #fff;
      cursor: pointer;
      display: block;
    }
    & .list {
      text-align: left;
    }
  }
}
</style>
