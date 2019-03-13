<template>
<Content id="users">
  <div slot="search">
    <Search :model="search" :elem="searchElem" :btn-loading="list.loading" @on-search="handleDataList" />
  </div>
  <!-- Search -->
  <div slot="extra">
    <Button icon="md-add" @click="handleCreate"> Create </Button>
  </div>
  <!-- extra -->
  <div v-if="toolbar.number" class="toolbar">
    <span class="number"> Selected {{ toolbar.number }} items </span>
    <Button type="error" icon="md-trash" @click="handleBatchRemove"> Remove </Button>
  </div>
  <!-- .toolbar -->
  <ITable ref="list" stripe :columns="columns" :loading="list.loading" :data="list.data" :total="list.total" @on-page-change="handleDataList" @on-selection-change="handleSelectionChange" />
  <!-- ITable -->
  <UserEdit ref="edit" @on-update="handleDataList" />
  <!-- UserEdit -->
</Content>
</template>
<script>
import {
  _batchDelUser, // 批量删除
  _delUser, // 删除
  _getUserList // 列表
} from '@/services/manage/users'
import UserEdit from './UserEdit'
export default {
  name: 'Users',
  components: {
    UserEdit
  },
  data() {
    return {
      // 工具条(批量删除)
      toolbar: {
        ids: [], // ID数组
        number: 0 // 选择数量
      },
      // 表单数据
      search: {
        name: ''
      },
      // 列表属性
      list: {
        data: [], // 结构化数据
        total: 0, // 数据总数
        loading: false // 加载状态
      },
      // 表单元素
      searchElem: [{
        // label: 'Name',
        prop: 'name',
        placeholder: 'Search Name',
        icon: 'md-search'
      }],
      // 表格列的配置描述
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: 'Name',
        key: 'name',
        minWidth: 120
      }, {
        title: 'Age',
        key: 'age',
        minWidth: 80
      }, {
        title: 'Gender',
        key: 'gender',
        minWidth: 80,
        render: (h, params) => h('span', params.row.gender === 1 ? 'Male' : 'Female')
      }, {
        title: 'E-mail',
        key: 'email',
        minWidth: 120
      }, {
        title: 'City',
        key: 'city',
        minWidth: 100,
        render: (h, params) => {
          let city = params.row.city
          for (const key of Object.keys(city)) {
            city = city[key]
          }
          return h('span', city)
        }
      }, {
        title: 'Birth',
        key: 'birth',
        minWidth: 100
      }, {
        title: 'Hobby',
        key: 'hobby',
        minWidth: 100,
        render: (h, params) => {
          const hobby = params.row.hobby
          const hobbys = []
          for (const key of Object.keys(hobby)) {
            hobbys.unshift(hobby[key])
          }
          return h('span', hobbys.join())
        }
      }, {
        title: 'Operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        minWidth: 150,
        render: (h, params) => h('div', [
          h('a', {
            style: {
              marginRight: '16px'
            },
            on: {
              click: () => this.handleEdit(params.row)
            }
          }, [h('Icon', {
            props: {
              type: 'md-create',
              size: 16
            },
            style: {
              marginTop: '-2px',
              marginRight: '4px'
            }
          }), 'Edit']),
          h('Poptip', {
            props: {
              confirm: true,
              transfer: true,
              title: 'Are you sure delete this task?',
              'ok-text': 'yes',
              'cancel-text': 'no'
            },
            on: {
              'on-ok': () => this.handleRemove(params.row)
            }
          }, [h('a', [h('Icon', {
            props: {
              type: 'md-trash',
              size: 16
            },
            style: {
              marginTop: '-2px',
              marginRight: '4px'
            }
          }), 'Delete'])])
        ])
      }]
    }
  },
  mounted() {
    this.handleDataList() // 获取列表数据
  },
  methods: {
    /**
     * 获取用户列表
     * @param  {string} type 是否使用搜索, 默认值 undefined (不使用搜索)
     */
    handleDataList(type) {
      this.$refs['list'].selectAll(false) // 取消全选
      this.$Loading.start()
      this.list.loading = true // 列表加载状态
      const page = this.$refs['list'].handlePage(type) // 获取分页信息
      // 模拟异步请求(搜索)
      setTimeout(() => {
        _getUserList({
          ...this.search,
          pagePara: {
            current: page.current,
            pageSize: page.pageSize
          }
        }).then(res => {
          this.$Loading.finish()
          const {
            users,
            total
          } = res.data
          this.list = {
            data: users,
            total: total,
            loading: false
          }
        }).catch(() => {
          this.$Loading.error()
          this.list.loading = false
        })
      }, 500)
    },
    // 新增界面
    handleCreate() {
      this.$refs['edit'].handleModal('Create') // 显示创建模态框
    },
    /**
     * 编辑界面
     * @param  {object} row 当前行数据
     */
    handleEdit(row) {
      this.$refs['edit'].handleModal('Edit', row) // 显示编辑模态框
    },
    /**
     * 删除用户
     * @param  {object} row 当前行数据
     */
    handleRemove(row) {
      this.$Loading.start()
      this.list.loading = true
      // 模拟异步请求(删除)
      setTimeout(() => {
        _delUser({
          id: row.id
        }).then(res => {
          this.$Message.success(res.error.msg)
          this.handleDataList()
        }).catch(() => {
          this.$Loading.error()
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * @param  {array} selection 已选项数据
     */
    handleSelectionChange(selection) {
      const ids = []
      for (const item of selection) {
        ids.push(item['id'])
      }
      this.toolbar = {
        ids: ids,
        number: selection.length
      }
    },
    // 批量删除用户
    handleBatchRemove() {
      this.$Loading.start()
      this.list.loading = true
      // 模拟异步请求(批量删除)
      setTimeout(() => {
        _batchDelUser({
          ids: this.toolbar.ids.join(',')
        }).then(res => {
          this.$Message.success(res.error.msg)
          this.handleDataList()
        }).catch(() => {
          this.$Loading.error()
          this.list.loading = false
        })
      }, 500)
    }
  }
}
</script>
<style lang="postcss" scoped>
.toolbar {
  margin-bottom: 24px;
  text-align: right;
  & .number {
    margin-right: 8px;
  }
}
</style>
