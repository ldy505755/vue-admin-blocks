<template>
<div id="v-form">
  <Form ref="form" :model="model" :rules="rules" :inline="inline" :label-width="labelWidth" :label-position="labelPosition" :style="formWidth" @keyup.enter.native="handleSubmit('form')">
    <slot name="head"> </slot>
    <FormItem v-for="(item, index) in elem" :key="index" :prop="item.prop" :label="item.label" :label-width="item.labelWidth" :style="item.width">
      <Input v-if="!item.element" :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :icon="item.icon" :number="item.number" :rows="item.rows" :autosize="item.autosize" :style="item.elemWidth"></Input>
      <!-- 输入框 -->
      <InputNumber v-if="item.element === 'number'" :max="item.max" :min="item.min" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth"></InputNumber>
      <!-- 数字输入框 -->
      <Select v-if="item.element === 'select'" v-model="model[item.prop]" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :filterable="item.filterable" :multiple="item.multiple" :style="item.elemWidth">
        <Option v-for="(opt, index) in item.option" :key="index" :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</Option>
      </Select>
      <!-- 选择器 -->
      <DatePicker v-if="item.element === 'date'" :type="item.type" v-model="model[item.prop]" :options="item.options" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth"></DatePicker>
      <!-- 日期选择器 -->
      <TimePicker v-if="item.element === 'time'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :size="item.size" :disabled="item.disabled" :style="item.elemWidth"></TimePicker>
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
    <slot> </slot>
    <FormItem :label-width="btnLabelWidth">
      <Button :type="okType" :icon="okIcon" :long="btnLong" :loading="btnLoading" @click="handleSubmit('form')">{{submitText}}</Button>
      <Button v-if="reset" :type="btnType" :icon="btnIcon" :long="btnLong" @click="handleReset('form')" class="button">{{resetText}}</Button>
      <Button v-if="button" :type="btnType" :icon="btnIcon" :long="btnLong" @click="handleClick('form')" class="button">{{buttonText}}</Button>
      <slot name="button"> </slot>
    </FormItem>
  </Form>
  <Spin v-if="loading" size="large" fix></Spin>
</div>
</template>
<script>
export default {
  name: 'VForm',
  props: {
    elem: Array, // 表单元素数组
    model: Object, // 表单数据对象
    rules: Object, // 表单验证对象
    width: Number, // 表单宽度
    labelWidth: Number, // 表单域标签宽度
    labelPosition: {
      validator(value) {
        let validList = ['left', 'right', 'top']
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true
          }
        }
        return false
      },
      default: 'right'
    }, // 表单域标签位置
    inline: {
      type: Boolean,
      default: false
    }, // 行内表单模式
    // 表单加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 表单域标签的宽度(按钮区)
    btnLabelWidth: Number,
    // 是否显示重置按钮
    reset: {
      type: Boolean,
      default: false
    },
    // 是否显示普通按钮
    button: {
      type: Boolean,
      default: false
    },
    // 提交按钮文字
    submitText: {
      type: String,
      default: 'Submit'
    },
    // 重置按钮文字
    resetText: {
      type: String,
      default: 'Reset'
    },
    // 普通按钮文字
    buttonText: {
      type: String,
      default: 'Button'
    },
    // 提交按钮类型
    okType: {
      type: String,
      default: 'primary'
    },
    // 普通按钮类型
    btnType: String,
    // 设置按钮的长度为 100%
    btnLong: Boolean,
    // 设置按钮的图标类型
    okIcon: String,
    btnIcon: String,
    // 按钮加载状态
    btnLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formWidth() {
      let style = {}
      if (this.width) {
        style.maxWidth = `${this.width}px`
      }
      return style
    }
  },
  mounted() {
    let elem = this.elem
    for (var i = 0; i < elem.length; i++) {
      let width = elem[i].width
      let elemWidth = elem[i].elemWidth
      if (parseInt(width)) {
        elem[i].width = {
          width: `${width}px`
        }
      }
      if (parseInt(elemWidth)) {
        elem[i].elemWidth = {
          width: `${elemWidth}px`
        }
      }
    }
  },
  methods: {
    validateField(prop) {
      // 对部分表单字段进行校验的方法
      this.$refs['form'].validateField(prop)
    },
    handleSubmit(name) {
      // 对整个表单进行校验
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$emit('on-submit')
        }
      })
    },
    handleReset() {
      // 对整个表单进行重置
      this.$refs['form'].resetFields()
      this.$emit('on-reset')
    },
    handleClick() {
      this.$emit('on-click')
    }
  }
}
</script>
<style lang="postcss" scoped>
#v-form {
  position: relative;
  & .button {
    margin-left: 8px;
  }
}
</style>
