<template>
<div id="login-warp">
  <div id="login">
    <transition :name="settings.visible ? 'slideleft' : 'slideright'">
      <IConfig v-if="settings.visible" />
      <!-- IConfig -->
      <div class="login">
        <div class="logo-info">
          <img class="logo" src="@/assets/logo.png" alt="logo">
          <p class="name">企业级中后台集成方案 <br>
            <span class="sub">基于 Vue.js 的开源集成方案</span>
          </p>
        </div>
        <!-- .logo-info -->
        <IForm ref="login" :model="login" :elem="loginElem" :rules="loginRule" :btn-loading="$store.state.app.loading" btn-long submit-text="Sign in" @on-submit="handleLogin" />
        <!-- IForm -->
        <p class="version">Version: {{ version }}</p>
        <!-- .version -->
      </div>
    </transition>
    <a v-if="settings.button" class="settings" href="#" @click.prevent="settings.visible = !settings.visible">
      <Icon :type="settings.visible ? 'md-laptop' : 'md-construct'" size="16" style="margin-top: -2px;" />
      <strong>{{ settings.visible ? 'Login' : 'Settings'}}</strong>
    </a>
  </div>
  <!-- #login -->
  <IError />
  <!-- IError -->
</div>
</template>
<script>
import config from '@/config'
import ax from '@/utils/axios'
import {
  login
} from '@/services/app'
import IConfig from '@/layouts/partials/Config'
import IError from '@/layouts/partials/Error'
export default {
  name: 'Login',
  components: {
    IConfig,
    IError
  },
  data: () => ({
    // 设置属性对象
    settings: {
      button: false,
      visible: false
    },
    // 版本属性
    version: '',
    // 表单数据对象(登录)
    login: {
      user: '',
      pwd: ''
    },
    // 表单元素数组(登录)
    loginElem: [{
      prop: 'user',
      placeholder: 'Username',
      prefix: 'md-contact'
    }, {
      prop: 'pwd',
      placeholder: 'Password',
      prefix: 'md-lock',
      type: 'password'
    }],
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
      env,
      version
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
    // 用户登录
    handleLogin(name) {
      // 配置默认接口地址
      const baseURL = localStorage.getItem('newBaseAPI') || config.baseURL
      if (config.env !== 'production') {
        console.log('API_URL', baseURL)
      }
      ax.defaults.baseURL = baseURL

      this.$Loading.start()
      this.$store.commit('LOADING', true)
      // 模拟异步请求
      setTimeout(() => {
        login(this.login).then(res => {
          this.$Loading.finish()
          this.$store.commit('LOADING', false)
          const userInfo = res.data
          if (userInfo) {
            // 设置页面 title 元素内容
            sessionStorage.setItem('title', document.title)
            // 获取用户信息
            this.$store.commit('USER_INFO', userInfo)
            // 获取菜单列表
            this.$store.dispatch('handleMenu')
          } else {
            this.$Message.error('The user information is empty')
          }
        }).catch(() => {
          this.$Loading.error()
          this.$store.commit('LOADING', false)
        })
      }, 800)
    }
  }
}
</script>
<style lang="postcss" scoped>
#login {
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  height: 350px;
  left: 50%;
  margin: -175px 0 0 -180px;
  padding: 36px;
  position: fixed;
  top: 50%;
  width: 360px;
  /* 过渡动画 */
  & .slideleft-enter-active, & .slideright-enter-active {
    transform: translateX(0);
    transition: all 0.5s;
  }
  & .slideleft-enter, & .slideright-enter {
    opacity: 0;
  }
  & .slideleft-leave-active, & .slideright-leave-active {
    opacity: 0;
    transition: all 0.5s;
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
    bottom: 16px;
    position: absolute;
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
      height: 64px;
      margin-right: 10px;
      width: 64px;
    }
    & .name {
      bottom: 14px;
      display: inline-block;
      font-size: 18px;
      line-height: 20px;
      position: relative;
      text-align: left;
    }
    & .sub {
      font-size: 12px;
    }
  }
  & .version {
    color: #888;
    text-align: center;
  }
}
</style>
