// 自定义组件
import IForm from "./IForm";
import ITable from "./ITable";

export default Vue => {
  const components = {
    IForm,
    ITable
  };
  for (const key of Object.keys(components)) {
    Vue.component(key, components[key]);
  }
};
