<template>
<div id="content">
  <Card :bordered="false" dis-hover>
    <div class="search-bar">
      <slot name="search"> </slot>
      <!-- search -->
      <slot name="extra"> </slot>
      <!-- extra -->
    </div>
    <!-- .search-bar -->
    <slot> </slot>
  </Card>
</div>
</template>
<script>
export default {
  name: 'Content',
  data: () => ({

  })
}
</script>
<style lang="postcss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
}
</style>
