<template>
<div class="i-table">
  <Table ref="table" :stripe="stripe" :border="border" :height="height" :row-class-name="rowClassName" :loading="loading" :columns="columns" :data="data" @on-selection-change="handleSelectionChange" />
  <!-- Table -->
  <slot />
  <Page v-if="total > 10" class="page" show-elevator show-total show-sizer placement="top" :total="total" :current="current" :page-size="pageSize" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange" />
  <!-- Page -->
</div>
</template>
<script>
export default {
  name: "ITable",
  props: {
    stripe: Boolean,
    border: Boolean,
    height: String,
    rowClassName: Function,
    loading: Boolean,
    columns: Array,
    data: Array,
    total: Number
  },
  data: () => ({
    current: 1,
    pageSize: 10
  }),
  methods: {
    // 将数据导出为 .csv 文件
    exportCsv(obj) {
      this.$refs["table"].exportCsv(obj);
    },
    // 在多选模式下有效, 点击全选时触发
    selectAll(status) {
      this.$refs["table"].selectAll(status);
    },
    // 在多选模式下有效, 只要选中项发生变化时就会触发
    handleSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    // 获取当前分页
    handlePage(type) {
      this.current = type ? 1 : this.current;
      return {
        current: this.current,
        pageSize: this.pageSize
      };
    },
    // 改变页码
    handlePageChange(page) {
      this.current = page;
      this.$emit("on-page-change");
    },
    // 切换每页条数
    handlePageSizeChange(page) {
      this.pageSize = page;
      if (this.current === 1) {
        this.$emit("on-page-change");
      }
    }
  }
};
</script>
<style lang="postcss" scoped>
.i-table .page {
  margin-top: 16px;
}
</style>
