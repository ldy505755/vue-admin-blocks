<template>
<div id="edit-password">
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <VForm label-position="top" ref="editPassword" :key="modal.visible" :width="320" :elem="editPasswordElem" :model="editPassword" :rules="editPasswordRule" :btn-loading="loading" @on-submit="handleSubmit" @on-click="modal.visible = false" submit-text="Save password"
      button button-text="Cancel"></VForm>
    <!-- VForm -->
  </Modal>
</div>
</template>
<script>
import {
  editPwd
} from '@/services/app'
export default {
  name: 'EditPassword',
  data() {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your new password'))
      } else {
        if (this.editPassword.passwordConfirmation) {
          // 对第二个密码框单独验证
          this.$refs['editPassword'].validateField('passwordConfirmation')
        }
        callback()
      }
    }
    const validPwdCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password confirmation'))
      } else {
        if (value !== this.editPassword.password) {
          callback(new Error('The two input password do not match!'))
        } else {
          callback()
        }
      }
    }
    return {
      // 加载状态
      loading: false,
      // 模态框属性
      modal: {
        title: '',
        visible: false
      },
      // 表单元素数组
      editPasswordElem: [{
        label: 'Current password',
        prop: 'currentPassword',
        placeholder: 'Please enter your current password',
        type: 'password'
      }, {
        label: 'New password',
        prop: 'password',
        placeholder: 'Please enter your new password',
        type: 'password'
      }, {
        label: 'Password confirmation',
        prop: 'passwordConfirmation',
        placeholder: 'Please enter your password confirmation',
        type: 'password'
      }],
      // 表单数据对象
      editPassword: {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      },
      // 表单验证规则
      editPasswordRule: {
        currentPassword: [{
          required: true,
          message: 'Please enter your current password',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          validator: validPwd,
          trigger: 'blur'
        }],
        passwordConfirmation: [{
          required: true,
          validator: validPwdCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    showModal() {
      this.modal = {
        title: 'Edit Password',
        visible: true
      }
      this.editPassword = {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      }
    },
    handleSubmit(name) {
      this.loading = true
      setTimeout(() => {
        editPwd(this.editPassword).then(res => {
          this.$Message.success(res.error.msg)
          this.loading = false
          this.modal.visible = false
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    }
  }
}
</script>
