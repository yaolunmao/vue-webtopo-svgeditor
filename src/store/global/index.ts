import { defineStore } from 'pinia';
import { configCenter } from '../../config-center';
import { IGlobalStore } from './types';

/**
 * 全局共享状态
 */
export const useGlobalStore = defineStore('global-store', {
  state: (): IGlobalStore => {
    return {
      config_center: configCenter
    };
  },
  getters: {},
  actions: {}
});
