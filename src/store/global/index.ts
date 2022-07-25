import { defineStore } from 'pinia';
import { configCenter } from '../../config-center';
import { IConfigItem } from '../../config-center/types';
import { isOfType } from '../../utils';
import {
  EGlobalStoreIntention,
  EMouseInfoState,
  IDoneJson,
  IGlobalStore,
  IMouseInfo
} from './types';
/**
 * 全局共享状态
 */
export const useGlobalStore = defineStore('global-store', {
  state: (): IGlobalStore => {
    return {
      config_center: configCenter,
      intention: EGlobalStoreIntention.None,
      create_svg_info: undefined,
      done_json: [],
      mouse_info: {
        state: EMouseInfoState.Up,
        position_x: 0,
        position_y: 0,
        now_position_x: 0,
        now_position_y: 0,
        new_position_x: 0,
        new_position_y: 0
      },
      handle_svg_info: undefined
    };
  },
  getters: {},
  actions: {
    setCreateInfo(create_svg_info: IConfigItem | undefined) {
      this.intention = EGlobalStoreIntention.Create;
      this.create_svg_info = create_svg_info;
    },
    setDoneJson(done_json: IDoneJson[] | IDoneJson) {
      // console.log('这里要记录操作历史记录');
      if (isOfType(done_json, 'id')) {
        this.done_json.push(done_json);
      } else {
        this.done_json = done_json;
      }
    },
    setMouseInfo(mouse_info: IMouseInfo) {
      this.mouse_info = mouse_info;
    },
    setHandleSvgInfo(info: IDoneJson | undefined, index: number) {
      if (info) {
        this.handle_svg_info = {
          info: info,
          index: index
        };
      } else {
        this.handle_svg_info = info;
      }
    }
  }
});
