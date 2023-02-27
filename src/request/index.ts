import axios from 'axios';
// 创建一个 axios 实例
const service = axios.create({
  baseURL: '/', // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  // withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    token: 'your token',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // console.log(response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    // const code = dataAxios.reset;
    // console.log(code);
    return dataAxios;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);
export default service;
