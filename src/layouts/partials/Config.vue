<template>
<div id="config">
  <div class="env" v-for="item in env" :key="item">
    <template v-if="item === config.env">
      <Icon type="md-checkmark-circle-outline" size="16" />
      <strong>{{name[item]}} environment</strong>
      <p>baseAPI: {{ config.baseAPI[item] }}</p>
    </template>
    <template v-else>
      <!-- <Tooltip placement="right-start"> -->
      <a href="#" @click.prevent="handleChange(item)">
        <strong>{{name[item]}} environment</strong>
      </a>
      <!-- <div slot="content">
          <p>baseAPI: {{ config.baseAPI[item] }}</p>
        </div>
      </Tooltip> -->
    </template>
  </div>
  <!-- .env -->
  <Form ref="config" :model="config" @keyup.enter.native="handleSave">
    <FormItem>
      <Input v-model="config.newBaseAPI" placeholder="You can enter new API" prefix="md-link" />
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
import config from "@/config";
export default {
  name: "IConfig",
  data: () => ({
    // 表单数据对象(接口URL)
    config: {
      baseURL: "",
      newBaseAPI: "",
      env: ""
    },
    env: ["development", "test", "release", "production"],
    name: {
      development: "Development",
      test: "Test",
      release: "Release",
      production: "Production"
    }
  }),
  mounted() {
    const { baseAPI, baseURL, env } = config;
    if (env === "development" || env === "test") {
      this.config = {
        baseAPI,
        baseURL,
        newBaseAPI: localStorage.getItem("newBaseAPI") || "",
        env: localStorage.getItem("env") || env
      };
    }
  },
  methods: {
    handleChange(env) {
      const { baseAPI } = this.config;
      this.$Modal.confirm({
        title: "Setting",
        content: `Are you sure switch to ${this.name[env]} environment?`,
        okText: "OK",
        cancelText: "Cancel",
        onOk: () => {
          this.$Message.success("Save success!");
          this.$parent.settings.visible = false;
          this.config.env = env;
          this.config.newBaseAPI = baseAPI[env];
          localStorage.setItem("env", env);
          localStorage.setItem("newBaseAPI", baseAPI[env]);
        }
      });
    },
    handleSave() {
      this.$Message.success("Save success!");
      this.$parent.settings.visible = false;
      localStorage.setItem("newBaseAPI", this.config.newBaseAPI);
    },
    handleReset() {
      this.$refs["config"].resetFields();
      this.$Message.success("Reset Success!");
      this.$parent.settings.visible = false;
      this.config.newBaseAPI = "";
      localStorage.removeItem("env");
      localStorage.removeItem("newBaseAPI");
    }
  }
};
</script>
<style lang="postcss" scoped>
#config {
  position: absolute;
  width: 288px;
  & .ivu-form {
    margin-top: 16px;
  }
  & .env {
    color: #888;
    margin-bottom: 8px;
  }
}
</style>
