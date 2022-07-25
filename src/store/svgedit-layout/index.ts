import { defineStore } from 'pinia';
import { ISvgEditLayoutStore } from './types';
/**
 * 编辑器布局状态
 */
export const useSvgEditLayoutStore = defineStore('svgedit-layout-store', {
  state: (): ISvgEditLayoutStore => {
    return {
      left_nav: true,
      right_nav: true
    };
  },
  getters: {},
  actions: {}
});
