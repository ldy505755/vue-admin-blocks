<template>
<div class="i-form">
  <Form ref="form" :model="model" :rules="rules" :inline="inline" :label-width="labelWidth" :label-position="labelPosition" :style="formWidth" @keyup.enter.native="handleSubmit('form')">
    <slot name="head" />
    <FormItem v-for="(item, index) in elem" :key="index" :prop="item.prop" :label="item.label" :label-width="item.labelWidth" :style="item.width">
      <Input v-if="!item.element" :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :readonly="item.readonly" :icon="item.icon" :prefix="item.prefix" :suffix="item.suffix"
        :number="item.number" :rows="item.rows" :autosize="item.autosize" :style="item.elemWidth" />
      <!-- 输入框 -->
      <InputNumber v-if="item.element === 'number'" :max="item.max" :min="item.min" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth" />
      <!-- 数字输入框 -->
      <Select v-if="item.element === 'select'" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :filterable="item.filterable" :multiple="item.multiple" :style="item.elemWidth" @on-change="handleSelectChange">
        <Option v-for="(opt, index) in item.option" :key="index" :value="item.events ? `${item.events}-${opt.value}` : opt.value" :disabled="opt.disabled">{{ opt.label }}</Option>
      </Select>
      <!-- 选择器 -->
      <Cascader v-if="item.element === 'cascader'" :data="item.data" v-model="model[item.prop]" :disabled="opt.disabled" :filterable="item.filterable" />
      <!-- 级联选择 -->
      <DatePicker v-if="item.element === 'date'" :type="item.type" v-model="model[item.prop]" :options="item.options" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth" />
      <!-- 日期选择器 -->
      <TimePicker v-if="item.element === 'time'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth" />
      <!-- 时间选择器 -->
      <RadioGroup v-if="item.element === 'radio'" :type="item.type" v-model="model[item.prop]" :size="item.size" :vertical="item.vertical">
        <Radio v-for="(opt, index) in item.option" :key="index" :label="opt.value" :size="item.size" :disabled="opt.disabled">{{ opt.label }}</Radio>
      </RadioGroup>
      <!-- 单选框 -->
      <CheckboxGroup v-if="item.element === 'checkbox'" v-model="model[item.prop]" :size="item.size">
        <Checkbox v-for="(opt, index) in item.option" :key="index" :label="opt.value" :size="item.size" :disabled="opt.disabled">{{ opt.label }}</Checkbox>
      </CheckboxGroup>
      <!-- 多选框 -->
    </FormItem>
    <slot />
    <FormItem :label-width="btnLabelWidth">
      <Button :type="okType" :icon="okIcon" :long="btnLong" :loading="btnLoading" @click="handleSubmit('form')">{{submitText}}</Button>
      <Button v-if="reset" :type="btnType" :icon="btnIcon" :long="btnLong" @click="handleReset('form')" class="button">{{resetText}}</Button>
      <Button v-if="button" :type="btnType" :icon="btnIcon" :long="btnLong" @click="handleClick('form')" class="button">{{buttonText}}</Button>
      <slot name="button" />
    </FormItem>
  </Form>
  <Spin v-if="loading" size="large" fix />
</div>
</template>
<script>
export default {
  name: "IForm",
  props: {
    elem: Array, // 表单元素数组
    model: Object, // 表单数据对象
    rules: Object, // 表单验证对象
    width: Number, // 表单宽度
    labelWidth: Number, // 表单域标签宽度
    labelPosition: {
      validator(value) {
        const validList = ["left", "right", "top"];
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true;
          }
        }
        return false;
      },
      default: "right"
    }, // 表单域标签位置
    inline: {
      type: Boolean,
      default: false
    }, // 行内表单模式
    loading: {
      type: Boolean,
      default: false
    }, // 表单加载状态
    btnLabelWidth: Number, // 表单域标签的宽度(按钮区)
    reset: {
      type: Boolean,
      default: false
    }, // 是否显示重置按钮
    button: {
      type: Boolean,
      default: false
    }, // 是否显示普通按钮
    submitText: {
      type: String,
      default: "Submit"
    }, // 提交按钮文字
    resetText: {
      type: String,
      default: "Reset"
    }, // 重置按钮文字
    buttonText: {
      type: String,
      default: "Button"
    }, // 普通按钮文字
    okType: {
      type: String,
      default: "primary"
    }, // 提交按钮类型
    btnType: String, // 普通按钮类型
    btnLong: Boolean, // 设置按钮的长度为 100%
    // 设置按钮的图标类型
    okIcon: String,
    btnIcon: String,
    btnLoading: {
      type: Boolean,
      default: false
    } // 按钮加载状态
  },
  computed: {
    formWidth() {
      const style = {};
      if (this.width) {
        style.maxWidth = `${this.width}px`;
      }
      return style;
    }
  },
  mounted() {
    if (this.elem) {
      const elem = this.elem;
      for (var i = 0; i < elem.length; i++) {
        const width = elem[i].width;
        const elemWidth = elem[i].elemWidth;
        if (parseInt(width)) {
          elem[i].width = {
            width: `${width}px`
          };
        }
        if (parseInt(elemWidth)) {
          elem[i].elemWidth = {
            width: `${elemWidth}px`
          };
        }
      }
    }
  },
  methods: {
    validateField(prop) {
      // 对部分表单字段进行校验的方法
      this.$refs["form"].validateField(prop);
    },
    handleSubmit(name) {
      if (this.elem) {
        // 对整个表单进行校验
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$emit("on-submit");
          }
        });
      } else {
        this.$emit("on-submit");
      }
    },
    handleReset() {
      // 将所有字段值重置为空并移除校验结果
      this.$refs["form"].resetFields();
      this.$emit("on-reset");
    },
    handleClick() {
      this.$emit("on-click");
    },
    // 选中的 Option 变化时触发
    handleSelectChange(val) {
      const name = val.split("-");
      this.$emit(`on-${name[0]}`, name[1]);
    }
  }
};
</script>
<style lang="postcss" scoped>
.i-form {
  position: relative;
  & .button {
    margin-left: 8px;
  }
}
</style>
