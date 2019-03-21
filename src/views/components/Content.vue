<template>
<Card class="i-content" :bordered="false" dis-hover>
  <slot name="header" />
  <!-- header -->
  <div class="i-search-bar">
    <slot name="search" />
    <!-- search -->
    <slot name="extra" />
    <!-- extra -->
  </div>
  <!-- .search-bar -->
  <slot />
</Card>
</template>
<script>
export default {
  name: "Content",
  data: () => ({})
};
</script>
<style lang="postcss">
.i-content {
  min-height: calc(100vh - 174px);
  & .i-search-bar {
    display: flex;
    justify-content: space-between;
  }
  & .i-content {
    min-height: auto;
    & .ivu-card-body {
      padding: 0;
    }
  }
}
</style>
