<template>
<div id="layout">
  <IHeader />
  <!-- IHeader -->
  <Row>
    <Col :xs="0" :sm="0" :md="4" :lg="3">
    <ISidebar />
    <!-- ISidebar -->
    </Col>
    <Col :xs="24" :sm="24" :md="20" :lg="21">
    <ITabs />
    <!-- ITabs -->
    <div id="container">
      <div id="main">
        <IBreadcrumb />
        <!-- #IBreadcrumb -->
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
      <!-- #main -->
      <IFooter />
      <!-- IFooter -->
    </div>
    <!-- #container -->
    </Col>
  </Row>
  <IError />
  <!-- IError -->
</div>
</template>
<script>
import IHeader from '@/layouts/partials/Header'
import ISidebar from '@/layouts/partials/Sidebar'
import ITabs from '@/layouts/partials/Tabs'
import IBreadcrumb from '@/layouts/partials/Breadcrumb'
import IFooter from '@/layouts/partials/Footer'
import IError from '@/layouts/partials/Error'
export default {
  name: 'ILayout',
  components: {
    IHeader,
    ISidebar,
    ITabs,
    IBreadcrumb,
    IFooter,
    IError
  }
}
</script>
<style lang="postcss">
#container {
  background-color: #f0f0f0;
  height: calc(100vh - 100px);
  overflow: auto;
  & #main {
    min-height: calc(100% - 43px);
    overflow: hidden;
    padding: 16px;
  }

  /* fade-transform */
  & .fade-transform-enter-active,
  & .fade-transform-leave-active {
    transition: all .5s;
  }

  & .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  & .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
