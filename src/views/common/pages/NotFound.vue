<template>
<div id="not-found">
  <div class="head">
    <h1> What have you done? </h1>
    <h5> Now Go Back Using Below LInk </h5>
    <span class="status-code">
      <ICountUp :startVal="startVal" :endVal="endVal" :decimals="decimals" :duration="duration" :options="options" @ready="onReady"></ICountUp>
    </span>
    <h2>! ERROR DECETED !</h2>
  </div>
  <h3 class="icon"> <Icon type="md-bulb" size="112"></Icon> </h3>
  <Button type="primary"> <a href="/" style="color:#fff;">GO TO HOME PAGE</a> </Button>
</div>
</template>
<script>
import ICountUp from 'vue-countup-v2'
export default {
  name: 'NotFound',
  components: {
    ICountUp
  },
  data: () => ({
    startVal: 100,
    endVal: 404,
    decimals: 0,
    duration: 2.5,
    options: {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: ''
    }
  }),
  methods: {
    onReady(instance, CountUp) {
      const that = this
      instance.update(that.endVal)
    }
  }
}
</script>
<style lang="postcss" scoped>
#not-found {
  position: fixed;
  width: 100%;
  min-height: 100%;
  text-align: center;
  color: #fff;
  background-color: #B396FF;
  & .head {
    padding-top: 60px;
  }
  & .status-code {
    color: #5066BF;
    font-size: 150px;
  }
  & .icon {
    padding: 20px 0 16px;
  }
}
</style>
