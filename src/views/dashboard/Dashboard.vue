<template>
<Content id="dashboard">
  <h1>{{ msg }}</h1>
  <h3>基于 Vue.js 的开源集成方案</h3>
  <h3>iView UI 组件库
    <a href="https://www.iviewui.com/docs/guide/install" target="_blank">https://www.iviewui.com/docs/guide/install</a>
  </h3>
  <h3>集成方案仓库地址
    <a href="https://github.com/ldy505755/vue-admin-blocks.git" target="_blank">https://github.com/ldy505755/vue-admin-blocks.git</a>
  </h3>
  <img class="logo" src="@/assets/logo.png" alt="logo">
</Content>
</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    msg: "企业级中后台集成方案"
  })
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
#dashboard {
  text-align: center;
  & h1 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  & h3 {
    margin: 20px 0;
    font-weight: 400;
    & a {
      color: #51b883;
    }
  }
}
</style>
