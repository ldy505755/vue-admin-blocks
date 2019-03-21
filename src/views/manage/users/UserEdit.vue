<template>
<div id="user-edit">
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <IForm :key="modal.visible" :model="edit" :elem="userElem" :rules="userRule" :loading="loading.form" :btn-loading="loading.btn" :width="360" :label-width="80" button button-text="Cancel" @on-submit="handleSubmit" @on-click="modal.visible = false" />
    <!-- IForm -->
  </Modal>
</div>
</template>
<script>
import {
  _editUser // 创建编辑
} from "@/services/manage/users";
export default {
  name: "UserEdit",
  data() {
    // 自定义验证(年龄)
    const validAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      // 模态框属性
      modal: {
        title: "",
        visible: false
      },
      // 表单数据
      edit: {
        name: "",
        age: "",
        gender: "",
        email: "",
        city: "",
        hobby: [],
        birth: "",
        desc: ""
      },
      // 初始表单数据
      init: "",
      // 加载状态
      loading: {
        form: false,
        btn: false
      },
      // 表单元素
      userElem: [
        {
          label: "Name",
          prop: "name",
          placeholder: "Enter your name"
        },
        {
          label: "Age",
          prop: "age",
          placeholder: "Enter your age",
          number: true
        },
        {
          label: "E-mail",
          prop: "email",
          placeholder: "Enter your e-mail"
        },
        {
          label: "City",
          prop: "city",
          placeholder: "Select your city",
          element: "select",
          option: []
        },
        {
          label: "Birth",
          prop: "birth",
          placeholder: "Select your birth",
          element: "date"
        },
        {
          label: "Gender",
          prop: "gender",
          element: "radio",
          option: [
            {
              label: "Male",
              value: 1
            },
            {
              label: "Female",
              value: 0
            }
          ]
        },
        {
          label: "Hobby",
          prop: "hobby",
          element: "checkbox",
          option: []
        },
        {
          label: "Desc",
          prop: "desc",
          placeholder: "Enter something...",
          type: "textarea"
        }
      ],
      // 表单验证(用户)
      userRule: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            validator: validAge,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          {
            message: "Incorrect email format",
            trigger: "blur",
            type: "email"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        birth: [
          {
            required: true,
            message: "Please select the date",
            trigger: "change",
            type: "date"
          }
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
            type: "number"
          }
        ],
        hobby: [
          {
            required: true,
            message: "Choose at least one hobby",
            trigger: "change",
            type: "array",
            min: 1
          },
          {
            message: "Choose three hobbies at best",
            trigger: "change",
            type: "array",
            max: 3
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            message: "Introduce no less than 20 words",
            trigger: "blur",
            type: "string",
            min: 20
          }
        ]
      },
      // 补丁数据(城市)
      city: [
        {
          label: "BeiJing",
          value: "110100"
        },
        {
          label: "ShangHai",
          value: "310100"
        },
        {
          label: "GuangZhou",
          value: "440100"
        },
        {
          label: "HangZhou",
          value: "330100"
        },
        {
          label: "NingBo",
          value: "330200"
        }
      ],
      // 补丁数据(爱好)
      hobby: [
        {
          label: "Eat",
          value: "eat"
        },
        {
          label: "Sleep",
          value: "sleep"
        },
        {
          label: "Run",
          value: "run"
        },
        {
          label: "Movie",
          value: "movie"
        }
      ]
    };
  },
  mounted() {
    this.init = Object.assign({}, this.edit); // 复制初始表单数据
  },
  methods: {
    /**
     * 显示模态框
     * @param  {string} title 模态框标题名称
     * @param  {object} row 当前行数据
     */
    handleModal(title, row) {
      this.modal = {
        title: title,
        visible: true
      };
      this.loading.form = true; // 表单加载状态
      if (title === "Create") {
        this.handleCreate(); // 创建
      } else {
        this.handleEdit(row); // 编辑
      }
    },
    // 创建
    handleCreate() {
      this.edit = Object.assign({}, this.init);
      this.handlePatch(); // 获取补丁数据
    },
    // 编辑
    handleEdit(row) {
      // 模拟异步请求(获取详情)
      setTimeout(() => {
        const edit = Object.assign({}, row);
        const birth = row.birth
          ? this.$Utils.formatDate.parse(row.birth, "yyyy-MM-dd")
          : "--";
        let city;
        for (const key of Object.keys(row.city)) {
          city = key;
        }
        const hobby = [];
        for (const key of Object.keys(row.hobby)) {
          hobby.push(key);
        }
        this.edit = {
          ...edit,
          city,
          birth,
          hobby
        };
        this.handlePatch(); // 获取补丁数据
      }, 800);
    },
    // 获取补丁数据
    handlePatch() {
      const _false = false;
      const data = this.userElem.filter(
        name => name.option && !name.option.length
      );
      let total = data.length;
      if (!total) {
        this.loading.form = _false; // 表单加载状态
        return;
      }
      for (const item of data) {
        if (item["prop"] === "city") {
          // 模拟异步请求(获取补丁数据-城市)
          setTimeout(() => {
            item["option"] = this.city;
            total--;
            this.loading.form = total ? true : _false; // 补丁完成状态
          }, 800);
        }
        if (item["prop"] === "hobby") {
          // 模拟异步请求(获取补丁数据-爱好)
          setTimeout(() => {
            item["option"] = this.hobby;
            total--;
            this.loading.form = total ? true : _false; // 补丁完成状态
          }, 400);
        }
      }
    },
    // 表单提交
    handleSubmit() {
      this.$Loading.start();
      this.loading.btn = true;
      const payload = this.edit;
      payload.birth = this.$Utils.formatDate.format(
        new Date(payload.birth),
        "yyyy-MM-dd"
      );
      // 模拟异步请求(编辑 Or 新增)
      setTimeout(() => {
        _editUser(payload)
          .then(res => {
            this.$Message.success(res.error.msg);
            this.$emit("on-update");
            this.$Loading.finish();
            this.loading.btn = false;
            this.modal.visible = false;
          })
          .catch(() => {
            this.$Loading.error();
            this.loading.btn = false;
            this.modal.visible = false;
          });
      }, 500);
    }
  }
};
</script>
<style lang="postcss" scoped>
</style>
