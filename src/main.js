import { createApp } from 'vue'
// import Antd from 'ant-design-vue';
// import RegisterElement from './utils/register-element' 
import App from './App.vue'
import router from './router'
// import store from './store' 
// import store from './store'
// import 'ant-design-vue/dist/antd.css';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import naive from 'naive-ui'
// import * as echarts from 'echarts'
// import { apply } from 'ol/transform'

// import 'element-plus/theme-chalk/index.css'
// import naive from 'naive-ui'
import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/index.css'


import locale from 'element-plus/lib/locale/lang/zh-cn'
import {Search, Sort, Switch,Download} from '@element-plus/icons-vue'
//需要按需引入
// import AFTableColumn from 'af-table-column'

// import axios from "axios";
// import NutUI from "@nutui/nutui";
// import ArcoVue from '@arco-design/web-vue';
// 采用按需加载时  此全局css样式，需要删除
// import "@nutui/nutui/dist/style.css";
// import '@arco-design/web-vue/dist/arco.css';
// Vue.prototype.axios = axios;
// import TDesign from 'tdesign-vue';
// 引入组件库全局样式资源
// import 'tdesign-vue/es/style/index.css';
// 注意：这种方式将会导入所有组件
// import 'vx-easyui/dist/themes/default/easyui.css';
// import 'vx-easyui/dist/themes/icon.css';
// import 'vx-easyui/dist/themes/vue.css';
// import EasyUI from 'vx-easyui';
// import NutUI from "@nutui/nutui";
// 采用按需加载时  此全局css样式，需要删除
// import "@nutui/nutui/dist/style.css";
const app = createApp(App)
app.component("Switch",Switch)
app.component("Search",Search)
app.component("Sort",Sort)
app.component("Download",Download)


// RegisterElement(app)
app.use(router).use(ElementPlus,{locale}).mount('#app')
// app.config.globalProperties.$echarts = echarts

