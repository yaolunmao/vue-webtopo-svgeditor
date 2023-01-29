import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import { configCenter } from '@/config-center';
import { IConfigItem } from '@/config-center/types';
import { isOfType, objectDeepClone, setSvgActualInfo } from '@/utils';
import {
  EGlobalStoreIntention,
  EMouseInfoState,
  EScaleInfoType,
  IDoneJson,
  IGlobalStore,
  IMouseInfo,
  IScaleInfo
} from './types';
import { useHistoryRecord } from '@/hooks';
/**
 * 全局共享状态
 */
export const useGlobalStore = defineStore('global-store', {
  state: (): IGlobalStore => {
    return {
      config_center: configCenter,
      intention: EGlobalStoreIntention.None,
      create_svg_info: null,
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
      handle_svg_info: null,
      scale_info: {
        type: EScaleInfoType.None,
        scale_times: {
          x: 1,
          y: 1
        },
        scale_item_info: {
          x: 0,
          y: 0
        },
        symmetric_point: {
          x: 0,
          y: 0
        }
      },
      rotate_info: {
        angle: 0
      },
      connection_line_node_info: {
        init_pos: {
          x: 0,
          y: 0
        },
        point_index: 0
      }
    };
  },
  getters: {},
  actions: {
    setCreateInfo(create_svg_info: IConfigItem | null) {
      this.intention = EGlobalStoreIntention.Create;
      this.create_svg_info = create_svg_info;
    },
    setDoneJson(done_json: IDoneJson[] | IDoneJson) {
      if (isOfType(done_json, 'id')) {
        this.done_json.push(done_json);
        nextTick(() => {
          setSvgActualInfo(done_json);
        });
      } else {
        this.done_json = objectDeepClone<IDoneJson[]>(done_json);
      }
      nextTick(() => {
        useHistoryRecord(objectDeepClone<IDoneJson[]>(this.done_json));
      });
    },
    setMouseInfo(mouse_info: IMouseInfo) {
      this.mouse_info = mouse_info;
    },
    setHandleSvgInfo(info: IDoneJson | null, index?: number) {
      let current_index = index;
      if (info) {
        if (!current_index && current_index != 0) {
          //如果索引没传 在这根据id查出索引
          current_index = this.done_json.findIndex((f) => f.id === info.id) ?? -1;
        }
        this.handle_svg_info = {
          info: info,
          index: current_index
        };
      } else {
        this.handle_svg_info = info;
      }
    },
    setScaleInfo(info: IScaleInfo) {
      this.scale_info = info;
    },
    spliceDoneJson(index: number) {
      const globalStore = useGlobalStore();
      globalStore.done_json.splice(index, 1);
      useHistoryRecord(globalStore.done_json);
    }
  }
});
// useGlobalStore().$subscribe((mutation, state) => {
//   console.log(mutation, state, 102);
// });
