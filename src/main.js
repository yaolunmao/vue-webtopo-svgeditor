import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import UCore from './util/UCore.js'
import './assets/css/index.css';
import router from './router';
import axios from 'axios';
const app = createApp(App);
app.use(router);
app.config.globalProperties.$UCore = UCore;
app.config.globalProperties.$axios = axios;
app.use(Antd).mount('#app');

