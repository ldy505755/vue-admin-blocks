<template>
<div id="sys-layout">
  <SysHeader></SysHeader>
  <!-- SysHeader -->
  <Row>
    <Col :xs="0" :sm="0" :md="4" :lg="3">
    <SysSidebar></SysSidebar>
    <!-- SysSidebar -->
    </Col>
    <Col :xs="24" :sm="24" :md="20" :lg="21">
    <div id="content">
      <div class="layout-content">
        <router-view></router-view>
      </div>
      <!-- .layout-content -->
    </div>
    <!-- #content -->
    </Col>
  </Row>
  <!-- <SysFooter></SysFooter> -->
  <!-- SysFooter -->
  <SysError></SysError>
  <!-- SysError -->
</div>
</template>
<script>
import SysHeader from '../partials/Header'
import SysSidebar from '../partials/Sidebar'
// import SysFooter from '../partials/Footer'
import SysError from '../partials/Error'
export default {
  name: 'SysLayout',
  components: {
    SysHeader,
    SysSidebar,
    // SysFooter,
    SysError
  }
}
</script>
<style lang="postcss" scoped>
#content {
  overflow: auto;
  height: calc(100vh - 60px);
  background-color: #fff;
  & .layout-content {
    padding: 16px;
  }
}
</style>
