<template>
<div id="sys-footer">
  <p class="copyright"> Copyright &copy; 2017-2020 </p>
</div>
</template>
<script>
export default {
  name: 'SysFooter'
}
</script>
<style lang="postcss" scoped>
#sys-footer {
  overflow: hidden;
  text-align: center;
  color: #999;
  border-top: 1px solid #e8e8e8;
  background-color: #f0f0f0;
  & .copyright {
    margin: 12px 0;
  }
}
</style>
