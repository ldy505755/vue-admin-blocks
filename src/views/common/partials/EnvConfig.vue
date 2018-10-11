<template>
<div id="env-config">
  <div class="env" v-for="item in env" :key="item">
    <template v-if="item === envConfig.env">
    <Icon type="md-checkmark-circle-outline" size="16"></Icon>
    <strong>{{envName[item]}} environment</strong>
    <p>baseAPI: {{ envConfig.baseAPI[item] }}</p>
    </template>
    <template v-else>
    <Tooltip placement="right-start">
    <a href="#" @click.prevent="handleChange(item)">
      <strong>{{envName[item]}} environment</strong></a>
      <div slot="content">
        <p>baseAPI: {{ envConfig.baseAPI[item] }}</p>
      </div>
    </Tooltip>
    </template>
  </div>
  <!-- .env -->
  <Form ref="envConfig" :model="envConfig" @keyup.enter.native="handleSave">
    <FormItem>
      <Input v-model="envConfig.newBaseAPI" placeholder="You can enter new API"></Input>
    </FormItem>
    <Row :gutter="16">
      <Col span="12">
      <Button long type="primary" @click="handleSave">Save</Button>
      </Col>
      <Col span="12">
      <Button long @click="handleReset">Reset</Button>
      </Col>
    </Row>
  </Form>
  <!-- Form -->
</div>
</template>
<script>
import config from '@/config'
export default {
  name: 'EnvConfig',
  data: () => ({
    env: ['development', 'test', 'release', 'production'],
    envName: {
      development: 'Development',
      test: 'Test',
      release: 'Release',
      production: 'Production'
    },
    // 表单数据对象(接口URL)
    envConfig: {
      baseURL: '',
      newBaseAPI: '',
      env: ''
    }
  }),
  mounted() {
    const {
      baseAPI,
      baseURL,
      env
    } = config
    if (env === 'development' || env === 'test') {
      this.envConfig = {
        baseAPI,
        baseURL,
        env: localStorage.getItem('env') || env,
        newBaseAPI: localStorage.getItem('newBaseAPI') || ''
      }
    }
  },
  methods: {
    handleChange(env) {
      const {
        baseAPI
      } = this.envConfig
      this.$Modal.confirm({
        title: 'Setting',
        content: `Are you sure switch to ${this.envName[env]} environment?`,
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          this.$Message.success('Save success!')
          this.$emit('on-click')
          this.envConfig.env = env
          this.envConfig.newBaseAPI = baseAPI[env]
          localStorage.setItem('env', env)
          localStorage.setItem('newBaseAPI', baseAPI[env])
        }
      })
    },
    handleSave() {
      this.$Message.success('Save success!')
      this.$emit('on-click')
      localStorage.setItem('newBaseAPI', this.envConfig.newBaseAPI)
    },
    handleReset() {
      this.$refs['envConfig'].resetFields()
      this.$Message.success('Reset Success!')
      this.$emit('on-click')
      this.envConfig.newBaseAPI = ''
      localStorage.removeItem('env')
      localStorage.removeItem('newBaseAPI')
    }
  }
}
</script>
<style lang="postcss" scoped>
#env-config {
  position: absolute;
  width: 288px;
  & .ivu-form {
    margin-top: 16px;
  }
  & .env {
    margin-bottom: 8px;
    color: #888;
  }
}
</style>
