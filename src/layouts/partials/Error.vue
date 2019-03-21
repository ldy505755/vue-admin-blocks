<template>
<div v-if="resError" id="error">
  <Alert banner closable :type="resError.status === 200 ? 'warning' : 'error'" @on-close="$store.commit('RES_ERROR')">
    <h3 class="title"> Status Code:
      <span :style="{color: resError.status === 200 ? '#093' : '#f33'}">
        <Icon :type="resError.status === 200 ? 'md-checkmark-circle' : 'md-close-circle'" size="24" style="margin-top: -2px;" /> {{ resError.statusCode }}
      </span>
    </h3>
    <div slot="desc" class="desc">
      <pre>{{ resError.error }}</pre>
    </div>
  </Alert>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IError",
  computed: {
    ...mapGetters({
      resError: "getResError"
    })
  }
};
</script>
<style lang="postcss" scoped>
#error {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
  & .ivu-alert {
    border-style: none;
    margin-bottom: 0;
    min-height: 100%;
  }
  & .title {
    margin-bottom: 12px;
  }
  & .desc {
    padding: 0 24px;
  }
  & .ivu-alert-warning {
    background-color: rgba(255, 255, 204, 0.8);
    & .desc {
      border: 1px dashed #c90;
      color: #333;
    }
  }
  & .ivu-alert-error {
    background-color: rgba(253, 236, 232, 0.8);
    & .desc {
      border: 1px dashed #f33;
      color: #f33;
    }
  }
}
</style>
