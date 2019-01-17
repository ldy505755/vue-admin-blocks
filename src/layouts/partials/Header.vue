<template>
<div id="header">
  <Row>
    <Col :xs="0" :sm="0" :md="6">
    <div class="logo-info">
      <img class="logo" src="@/assets/logo.png" alt="logo">
      <p class="name">企业级中后台集成方案 <br> <span class="sub">基于 Vue.js 的开源集成方案</span></p>
    </div>
    <!-- .logo-info -->
    </Col>
    <Col :xs="6" :sm="12" :md="0">
    <Poptip class="navigation" placement="right-start" v-model="visible">
      <Icon class="nav-icon" type="md-menu" size="32" />
      <Sidebar slot="content" @on-click="handleClose" />
    </Poptip>
    <!-- .navigation -->
    </Col>
    <Col :xs="18" :sm="12" :md="18">
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
import EditPassword from '@/layouts/pages/EditPassword'
import Sidebar from '@/layouts/partials/Sidebar'
export default {
  name: 'IHeader',
  components: {
    EditPassword,
    Sidebar
  },
  data: () => ({
    // 导航可视状态
    visible: false,
    // 用户名
    userName: '',
    // 下拉菜单元素数组
    dropdown: [{
      label: 'Password',
      name: 'editPassword',
      icon: 'md-lock'
    }, {
      label: 'Sign out',
      name: 'signout',
      icon: 'md-log-out'
    }]
  }),
  mounted() {
    // 获取用户信息
    const user = JSON.parse(sessionStorage.getItem('user'))
    this.userName = user.real_name || 'Null'
  },
  methods: {
    // 关闭导航
    handleClose(state) {
      this.visible = state
    },
    // 下拉菜单项
    handleDropdown(name) {
      switch (name) {
        case 'editPassword':
          // 修改密码
          this.$refs[name].showModal()
          break
        default:
          // 退出系统
          this.$Modal.confirm({
            title: 'Warning',
            content: 'Do you confirm the exit system?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: () => {
              this.$store.commit('MENU_RESET') // 重置菜单
            }
          })
      }
    }
  }
}
</script>
<style lang="postcss">
#header {
  background-color: #1f2d3d;
  color: #fff;
  & #sidebar {
    height: auto;
    width: 240px;
  }
  & .ivu-poptip-popper[x-placement^=right] .ivu-poptip-arrow:after, & .ivu-poptip-popper[x-placement^=right] .ivu-poptip-arrow {
    border-right-color: #304156;
  }
  & .ivu-poptip-inner {
    background-color: #304156;
  }
  & .ivu-poptip-body {
    padding: 8px 0;
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
    margin: 18px 16px;
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
