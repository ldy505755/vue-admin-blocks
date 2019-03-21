// 自定义组件
import Content from "./Content";
import Search from "./Search";

export default Vue => {
  const components = {
    Content,
    Search
  };
  for (const key of Object.keys(components)) {
    Vue.component(key, components[key]);
  }
};
