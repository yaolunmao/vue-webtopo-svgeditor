import { objectDeepClone, randomString } from '@/utils';
import { defineStore } from 'pinia';
import { useGlobalStore } from '../global';
import { IDoneJson } from '../global/types';
import { ContextMenuStoreState, EContextMenuInfoType, EditPrivateStoreState } from './types';
import { useHistoryRecord } from '@/hooks';
/**
 * 编辑器私有状态
 */
export const useEditPrivateStore = defineStore('edit-private-store', {
  state: (): EditPrivateStoreState => {
    return {
      old_done_components: [], //记录预览之前的组件数据
      history_doneComponent: [],
      history_nowindex: 0,
      is_record_history: true, //是否需要记录当前状态，如果是操作的历史记录，则不需要记录
      max_record_times: 10
    };
  },
  getters: {
    getTopBtnUndoStatus(state) {
      if (state.history_nowindex < 1) {
        return false;
      }
      return true;
    },
    getTopBtnRedoStatus(state) {
      if (state.history_nowindex + 1 == state.history_doneComponent.length) {
        return false;
      }
      return true;
    }
  },
  actions: {
    topUndoBtnClick() {
      console.log('撤销');
      if (this.history_nowindex < 1) {
        return;
      }
      const global_store = useGlobalStore();
      // select_component_info.value = {};
      this.is_record_history = false;
      this.history_nowindex -= 1;
      global_store.setDoneJson(this.history_doneComponent[this.history_nowindex]);
    },
    topRedoBtnClick() {
      console.log('重做');
      if (this.history_nowindex + 1 == this.history_doneComponent.length) {
        return;
      }
      const global_store = useGlobalStore();
      this.is_record_history = false;
      this.history_nowindex += 1;
      global_store.setDoneJson(this.history_doneComponent[this.history_nowindex]);
    }
  }
});
export const useContextMenuStore = defineStore('context-menu-store', {
  state: (): ContextMenuStoreState => {
    return {
      display: false,
      info: {
        [EContextMenuInfoType.Copy]: {
          title: '复制',
          hot_key: 'Ctrl+C',
          enable: true
        },
        [EContextMenuInfoType.Delete]: {
          title: '删除',
          hot_key: 'Delete',
          enable: true
        },
        [EContextMenuInfoType.MoveUpTopLevel]: {
          title: '置于顶层',
          hot_key: 'Ctrl+→',
          enable: true
        },
        [EContextMenuInfoType.MoveDownTopLevel]: {
          title: '置于底层',
          hot_key: 'Ctrl+←',
          enable: true
        },
        [EContextMenuInfoType.MoveUpOneLevel]: {
          title: '置于上一层',
          hot_key: 'Ctrl+↑',
          enable: true
        },
        [EContextMenuInfoType.MoveDownOneLevel]: {
          title: '置于下一层',
          hot_key: 'Ctrl+↓',
          enable: true
        }
      }
    };
  },
  actions: {
    onContextMenuClick(type: EContextMenuInfoType) {
      const globalStore = useGlobalStore();
      if (!globalStore.handle_svg_info) {
        return;
      }
      switch (type) {
        case EContextMenuInfoType.Copy:
          const temp_item = objectDeepClone<IDoneJson>(globalStore.handle_svg_info.info);
          temp_item.id = temp_item.name + randomString();
          temp_item.title += '-copy';
          temp_item.x += 10;
          temp_item.y += 10;
          globalStore.setDoneJson(temp_item);
          this.display = false;
          break;
        case EContextMenuInfoType.Delete:
          globalStore.spliceDoneJson(globalStore.handle_svg_info.index);
          this.display = false;
          break;
        case EContextMenuInfoType.MoveUpOneLevel:
          if (
            globalStore.done_json.length === 1 ||
            globalStore.handle_svg_info.index === globalStore.done_json.length - 1
          ) {
            return;
          }
          const temp_up_one = globalStore.handle_svg_info.info;
          globalStore.done_json[globalStore.handle_svg_info.index] =
            globalStore.done_json[globalStore.handle_svg_info.index + 1];
          globalStore.done_json[globalStore.handle_svg_info.index + 1] = temp_up_one;
          useHistoryRecord(globalStore.done_json);
          this.display = false;
          break;
        case EContextMenuInfoType.MoveDownOneLevel:
          if (globalStore.done_json.length === 1 || globalStore.handle_svg_info.index === 0) {
            return;
          }
          const temp_down_one = globalStore.handle_svg_info.info;
          globalStore.done_json[globalStore.handle_svg_info.index] =
            globalStore.done_json[globalStore.handle_svg_info.index - 1];
          globalStore.done_json[globalStore.handle_svg_info.index - 1] = temp_down_one;
          useHistoryRecord(globalStore.done_json);
          this.display = false;
          break;
        case EContextMenuInfoType.MoveDownTopLevel:
          if (globalStore.done_json.length === 1 || globalStore.handle_svg_info.index === 0) {
            return;
          }
          const temp_up_top = globalStore.handle_svg_info.info;
          globalStore.done_json.splice(globalStore.handle_svg_info.index, 1);
          globalStore.done_json.unshift(temp_up_top);
          useHistoryRecord(globalStore.done_json);
          this.display = false;
          break;
        case EContextMenuInfoType.MoveUpTopLevel:
          if (
            globalStore.done_json.length === 1 ||
            globalStore.handle_svg_info.index === globalStore.done_json.length
          ) {
            return;
          }
          const temp_down_top = globalStore.handle_svg_info.info;
          globalStore.done_json.splice(globalStore.handle_svg_info.index, 1);
          globalStore.done_json.push(temp_down_top);
          useHistoryRecord(globalStore.done_json);
          this.display = false;
          break;
        default:
          break;
      }
    }
  }
});
