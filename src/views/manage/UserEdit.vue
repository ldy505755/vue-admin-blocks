<template>
<div id="user-edit">
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <VForm :key="modal.visible" :width="360" :label-width="80" :elem="userElem" :model="model" :rules="userRule" :loading="loading.form" :btn-loading="loading.btn" @on-submit="handleSubmit" @on-click="modal.visible = false" button button-text="Cancel"></VForm>
    <!-- VForm -->
  </Modal>
</div>
</template>
<script>
import {
  editUser
} from '@/services/manage/users'
export default {
  name: 'UserEdit',
  props: {
    model: Object
  },
  data() {
    // 自定义验证(年龄)
    const validAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age cannot be empty'))
      }
      // 模拟异步验证
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'))
        } else {
          if (value < 18) {
            callback(new Error('Must be over 18 years of age'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      // 模态框属性
      modal: {
        title: '',
        visible: false
      },
      // 加载状态
      loading: {
        btn: false,
        form: false
      },
      // 表单元素(用户)
      userElem: [{
        label: 'Name',
        prop: 'name',
        placeholder: 'Enter your name'
      }, {
        label: 'Age',
        prop: 'age',
        placeholder: 'Enter your age',
        number: true
      }, {
        label: 'E-mail',
        prop: 'email',
        placeholder: 'Enter your e-mail'
      }, {
        label: 'City',
        prop: 'city',
        placeholder: 'Select your city',
        element: 'select',
        option: []
      }, {
        label: 'Birth',
        prop: 'birth',
        placeholder: 'Select your birth',
        element: 'date'
      }, {
        label: 'Gender',
        prop: 'gender',
        element: 'radio',
        option: [{
          label: 'Male',
          value: 1
        }, {
          label: 'Female',
          value: 0
        }]
      }, {
        label: 'Hobby',
        prop: 'hobby',
        element: 'checkbox',
        option: []
      }, {
        label: 'Desc',
        prop: 'desc',
        placeholder: 'Enter something...',
        type: 'textarea'
      }],
      // 表单验证(用户)
      userRule: {
        name: [{
          required: true,
          message: 'The name cannot be empty',
          trigger: 'blur'
        }],
        age: [{
          required: true,
          validator: validAge,
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'Mailbox cannot be empty',
          trigger: 'blur'
        }, {
          message: 'Incorrect email format',
          trigger: 'blur',
          type: 'email'
        }],
        city: [{
          required: true,
          message: 'Please select the city',
          trigger: 'change'
        }],
        birth: [{
          required: true,
          message: 'Please select the date',
          trigger: 'change',
          type: 'date'
        }],
        gender: [{
          required: true,
          message: 'Please select gender',
          trigger: 'change',
          type: 'number'
        }],
        hobby: [{
          required: true,
          message: 'Choose at least one hobby',
          trigger: 'change',
          type: 'array',
          min: 1
        }, {
          message: 'Choose three hobbies at best',
          trigger: 'change',
          type: 'array',
          max: 3
        }],
        desc: [{
          required: true,
          message: 'Please enter a personal introduction',
          trigger: 'blur'
        }, {
          message: 'Introduce no less than 20 words',
          trigger: 'blur',
          type: 'string',
          min: 20
        }]
      },
      // 补丁数据(城市)
      city: [{
        label: 'BeiJing',
        value: '110100'
      }, {
        label: 'ShangHai',
        value: '310100'
      }, {
        label: 'GuangZhou',
        value: '440100'
      }, {
        label: 'HangZhou',
        value: '330100'
      }, {
        label: 'NingBo',
        value: '330200'
      }],
      // 补丁数据(爱好)
      hobby: [{
        label: 'Eat',
        value: 'eat'
      }, {
        label: 'Sleep',
        value: 'sleep'
      }, {
        label: 'Run',
        value: 'run'
      }, {
        label: 'Movie',
        value: 'movie'
      }]
    }
  },
  methods: {
    /**
     * 显示模态框
     * @param  {string} name 模态框标题名称, 默认值, undefined
     */
    showModal(name) {
      this.loading.form = true // 表单加载状态
      switch (name) {
        case 'edit':
          name = 'Edit'
          break
        default:
          name = 'Create'
      }
      this.modal = {
        title: name,
        visible: true
      }
    },
    // 获取补丁数据
    getPatch() {
      let data = this.userElem.filter(n => n.option && n.option.length === 0)
      let total = data.length
      let _false = false
      if (total === 0) {
        this.loading.form = _false // 表单加载状态
        return _false
      }
      for (let i = 0; i < total; i++) {
        if (data[i].prop === 'city') {
          // 模拟异步请求(获取补丁数据-城市)
          setTimeout(() => {
            data[i].option = this.city
            total--
            this.loading.form = total === 0 ? _false : true // 补丁完成状态
          }, 800)
        }
        if (data[i].prop === 'hobby') {
          // 模拟异步请求(获取补丁数据-爱好)
          setTimeout(() => {
            data[i].option = this.hobby
            total--
            this.loading.form = total === 0 ? _false : true // 补丁完成状态
          }, 400)
        }
      }
    },
    // 表单提交
    handleSubmit() {
      this.loading.btn = true
      let para = this.model
      para.birth = para.birth ? this.$Utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd') : ''
      // 模拟异步请求(编辑 Or 新增)
      setTimeout(() => {
        editUser(para).then(res => {
          this.$Message.success(res.error.msg)
          this.$emit('on-update', false)
          this.loading.btn = false
          this.modal.visible = false
        }).catch(() => {
          this.loading.btn = false
        })
      }, 500)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
