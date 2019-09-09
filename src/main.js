import Vue from 'vue';
import App from './App';
import router from '@/plugins/router';
import store from '@/store';
import '@/plugins/filter';
import '@/plugins/ui';
import '@/components'; // 引入全局组件
import 'normalize.css'; // normalize.css 样式格式化
import '@/assets/css/index.less'; // 全局样式文件
import '@/assets/css/theme.variable.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
