<template>
<div id="footer">
  <p class="copyright"> Copyright &copy; 2018-2019 </p>
</div>
</template>
<script>
export default {
  name: "IFooter"
};
</script>
<style lang="postcss" scoped>
#footer {
  background-color: #fff;
  color: #666;
  overflow: hidden;
  text-align: center;
  & .copyright {
    margin: 12px 0;
  }
}
</style>
