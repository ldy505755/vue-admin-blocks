<template>
<div id="test">
  <Spin v-if="loading" size="large" fix></Spin>
  <h2 v-else>This is a {{ title }}</h2>
</div>
</template>
<script>
import {
  test
} from '@/services/test'
export default {
  name: 'Test',
  data: () => ({
    title: '',
    loading: false
  }),
  mounted() {
    this.loading = true
    // 模拟异步请求
    setTimeout(() => {
      test().then(res => {
        this.loading = false
        this.title = res.data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }, 500)
  }
}
</script>
<style lang="postcss" scoped>
/* 样式使用 cssnext 预处理 */
#test {
  & h2 {
    border-left: 2px solid #CCC;
    padding-left: 12px;
  }
}
</style>
