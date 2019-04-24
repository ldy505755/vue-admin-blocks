<template>
<Content id="test">
  <Spin v-if="loading" size="large" fix />
  <h2>This is a {{ title }}</h2>
  <div v-if="title">
    <p><router-link :to="{name:'HelloWorld', params:{payload: 'params'}}"> Params 方式向 HelloWorld 组件传参 </router-link></p>
    <p><router-link :to="{path:'/hello/hello-world', query:{payload: 'query'}}"> Query 方式向 HelloWorld 组件传参 </router-link></p>
  </div>
</Content>
</template>
<script>
import { _test } from "@/services/test";
export default {
  name: "Test",
  data: () => ({
    title: "",
    loading: false
  }),
  mounted() {
    this.$Loading.start();
    this.loading = true;
    // 模拟异步请求
    setTimeout(() => {
      _test()
        .then(res => {
          this.$Loading.finish();
          this.loading = false;
          this.title = res.data;
        })
        .catch(err => {
          this.$Loading.error();
          this.loading = false;
          console.error(err);
        });
    }, 500);
  }
};
</script>
<style lang="postcss" scoped>
/* 样式使用 cssnext 预处理 */
:root {
  --bdColor: #ccc;
  --color: #42b983;
  --size: 4px;
}
#test {
  & h2 {
    margin-bottom: calc(var(--size) * 4);
    padding-left: calc(var(--size) * 3);
    border-left: var(--size) solid var(--bdColor);
  }
  & p {
    margin: calc(var(--size) * 2) 0;
  }
  & a {
    color: var(--color);
  }
}
</style>
