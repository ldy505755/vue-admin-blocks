<template>
<Card class="i-content" :bordered="false" dis-hover>
  <div class="i-search-bar">
    <slot name="search"> </slot>
    <!-- search -->
    <slot name="extra"> </slot>
    <!-- extra -->
  </div>
  <!-- .search-bar -->
  <slot> </slot>
</Card>
</template>
<script>
export default {
  name: 'Content',
  data: () => ({

  })
}
</script>
<style lang="postcss">
.i-search-bar {
  display: flex;
  justify-content: space-between;
}
</style>
