import { defineStore } from 'pinia';
import { useGlobalStore } from '../global';
import { EditPrivateStoreState } from './types';

/**
 * 编辑器私有状态
 */
export const useEditPrivateStore = defineStore('edit-private-store', {
  state: (): EditPrivateStoreState => {
    return {
      old_done_components: [], //记录预览之前的组件数据
      history_doneComponent: [],
      history_nowindex: 0,
      is_record_history: true //是否需要记录当前状态，如果是操作的历史记录，则不需要记录
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
