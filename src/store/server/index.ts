import { defineStore } from 'pinia';
// 导入axios实例
import httpRequest from '@/request/index';

// 定义接口的传参
// interface UserInfoParam {
//   userID: string;
//   userName: string;
// }
/**
 * 配置文件
 */
export const useServerStore = defineStore('server-store', {
  state: () => {
    return {
      url: 'http://localhost:30000/PLCData/GetTestData'
    };
  },
  getters: {},
  actions: {
    getData() {
      return httpRequest({
        url: this.url,
        method: 'get'
      });
    }
  }
});
