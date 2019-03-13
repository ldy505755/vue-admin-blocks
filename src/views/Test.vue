<template>
<Content id="test">
  <Spin v-if="loading" size="large" fix></Spin>
  <h2>This is a {{ title }}</h2>
</Content>
</template>
<script>
import {
  _test
} from '@/services/test'
export default {
  name: 'Test',
  data: () => ({
    title: '',
    loading: false
  }),
  mounted() {
    this.$Loading.start()
    this.loading = true
    // 模拟异步请求
    setTimeout(() => {
      _test().then(res => {
        this.$Loading.finish()
        this.loading = false
        this.title = res.data
      }).catch(err => {
        this.$Loading.error()
        this.loading = false
        console.error(err)
      })
    }, 500)
  }
}
</script>
<style lang="postcss" scoped>
/* 样式使用 cssnext 预处理 */
:root {
  --bdColor: #ccc;
}
#test {
  & h2 {
    border-left: 4px solid var(--bdColor);
    padding-left: 12px;
  }
}
</style>
