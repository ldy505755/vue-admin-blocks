// 自定义组件
import VForm from './v-form'
import VTablePage from './v-table-page'

const components = {
  VForm,
  VTablePage
}

export default(Vue) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
