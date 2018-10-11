<template>
<div id="main">
  <div id="login">
    <transition :name="settings.visible ? 'slideleft' : 'slideright'">
      <EnvConfig v-if="settings.visible" @on-click="handleSettings"></EnvConfig>
      <!-- EnvConfig -->
      <div v-else class="login">
        <div class="logo-info">
          <img class="logo" src="../assets/logo.png" alt="logo">
          <p class="name">企业级中后台项目 <br>
            <span class="sub">基于 Vue.js 的开源项目</span>
          </p>
        </div>
        <!-- .logo-info -->
        <VForm ref="login" :elem="loginElem" :model="login" :rules="loginRule" :btn-loading="this.$store.state.app.loading" btn-long submit-text="Sign in" @on-submit="handleLogin"></VForm>
        <!-- VForm -->
        <p class="version">Version: {{ version }}</p>
        <!-- .version -->
      </div>
    </transition>
    <a v-if="settings.button" class="settings" href="#" @click.prevent="handleSettings">
      <Icon :type="settings.visible ? 'md-laptop' : 'md-construct'" size="16" style="margin-top: -2px;"></Icon>
      <strong>{{ settings.visible ? 'Login' : 'Settings'}}</strong>
    </a>
  </div>
  <!-- #login -->
  <SysError></SysError>
  <!-- SysError -->
</div>
</template>
<script>
import config from '@/config'
import ax from '@/config/axios'
import {
  login
} from '@/services/app'
import EnvConfig from './common/partials/EnvConfig'
import SysError from './common/partials/Error'
export default {
  name: 'Login',
  components: {
    EnvConfig,
    SysError
  },
  data: () => ({
    // 设置属性对象
    settings: {
      button: false,
      visible: false
    },
    // 表单元素数组(登录)
    loginElem: [{
      prop: 'user',
      placeholder: 'Username'
    }, {
      prop: 'pwd',
      placeholder: 'Password',
      type: 'password'
    }],
    // 表单数据对象(登录)
    login: {
      user: '',
      pwd: ''
    },
    version: '',
    // 表单验证规则(登录)
    loginRule: {
      user: [{
        required: true,
        message: 'Please fill in the username',
        trigger: 'blur'
      }],
      pwd: [{
        required: true,
        message: 'Please fill in the password',
        trigger: 'blur'
      }]
    }
  }),
  mounted() {
    const {
      version,
      env
    } = config
    switch (env) {
      case 'release':
        this.version = `${version} Release`
        break
      case 'production':
        // this.version = `${version} Production`
        this.version = version
        break
      default:
        this.settings.button = true
        this.login = {
          user: 'admin',
          pwd: 'wasd@007'
        }
        this.version = env === 'development' ? `${version} Develop` : `${version} Test`
    }
  },
  methods: {
    // 项目环境设置
    handleSettings() {
      this.settings.visible = !this.settings.visible
    },
    // 用户登录
    handleLogin(name) {
      // 配置默认接口地址
      ax.defaults.baseURL = localStorage.getItem('newBaseAPI') || config.baseURL

      this.$store.commit('LOADING', true)
      // 模拟异步请求
      setTimeout(() => {
        login(this.login).then(res => {
          // 获取用户信息
          sessionStorage.setItem('user', JSON.stringify(res.data))
          // 获取菜单列表
          this.$store.dispatch('handleMenu')
          this.$store.commit('LOADING', false)
        }).catch(() => {
          this.$store.commit('LOADING', false)
        })
      }, 800)
    }
  }
}
</script>
<style lang="postcss" scoped>
#login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 350px;
  margin: -175px 0 0 -180px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  /* 过渡动画 */
  & .slideleft-enter-active, & .slideright-enter-active {
    transition: all 0.5s;
    transform: translateX(0);
  }
  & .slideleft-enter, & .slideright-enter {
    opacity: 0;
  }
  & .slideleft-leave-active, & .slideright-leave-active {
    transition: all 0.5s;
    opacity: 0;
  }
  & .slideleft-leave, & .slideright-leave {
    transform: translateX(0);
  }
  & .slideleft-enter, & .slideright-leave-active {
    transform: translateX(300px);
  }
  & .slideleft-leave-active, & .slideright-enter {
    transform: translateX(-300px);
  }
  /* end */
  & .settings {
    position: absolute;
    bottom: 16px;
  }
  & .login {
    position: absolute;
    width: 288px;
  }
  & .logo-info {
    height: 64px;
    margin-bottom: 22px;
    text-align: center;
    & .logo {
      width: 64px;
      height: 64px;
      margin-right: 10px;
    }
    & .name {
      position: relative;
      bottom: 14px;
      display: inline-block;
      text-align: left;
      font-size: 18px;
      line-height: 20px;
    }
    & .sub {
      font-size: 12px;
    }
  }
  & .version {
    text-align: center;
    color: #888;
  }
}
</style>
