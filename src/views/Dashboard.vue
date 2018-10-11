<template>
<div id="dashboard">
  <h1>{{ msg }}</h1>
  <h3>基于 Vue.js 的开源项目</h3>
  <h3>iView UI 组件库
    <a href="https://www.iviewui.com/docs/guide/install" target="_blank">https://www.iviewui.com/docs/guide/install</a>
  </h3>
  <Button type="info">Info</Button>
  <Button type="success">Success</Button>
  <Button type="warning">Warning</Button>
  <Button type="error">Error</Button>
  <h3>项目仓库地址
    <a href="https://github.com/ldy505755/vue2-admin-block.git" target="_blank">https://github.com/ldy505755/vue2-admin-block.git</a>
  </h3>
  <img class="logo" src="../assets/logo.png" alt="logo">
</div>
</template>
<script>
export default {
  name: 'Dashboard',
  data: () => ({
    msg: '企业级中后台项目'
  })
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
#dashboard {
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
