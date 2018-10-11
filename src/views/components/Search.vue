<template>
<div id="search">
  <div class="head">
    <div class="title">
      <Icon type="md-search" size="16" style="margin-top: -2px;"></Icon> Search
    </div>
    <!-- .title -->
  </div>
  <!-- .head -->
  <div class="body">
    <VForm inline :label-width="labelWidth" :elem="elem" :model="model" :loading="loading" :btn-loading="btnLoading" @on-submit="handleSearch" @on-reset="handleSearch" :btn-label-width="4" reset submit-text="Search" ok-icon="md-search"></VForm>
    <!-- VForm -->
  </div>
  <!-- .body -->
</div>
</template>
<script>
export default {
  name: 'Search',
  props: {
    elem: Array,
    model: Object,
    loading: Boolean,
    btnLoading: Boolean,
    labelWidth: Number
  },
  data: () => ({

  }),
  methods: {
    handleSearch() {
      this.$emit('on-search', 'search')
    }
  }
}
</script>
<style lang="postcss" scoped>
.head {
  position: relative;
  border: 1px solid #dcdee2;
  border-bottom-style: none;
  font-size: 14px;
  & .title {
    padding: 12px 16px;
  }
}
.body {
  margin-bottom: 16px;
  padding: 12px 16px 0;
  border: 1px solid #dcdee2;
}
</style>
