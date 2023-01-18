import { IDoneJson } from '@/store/global/types';
import { useEditPrivateStore } from '@/store/system';

export const useHistoryRecord = (done_json: IDoneJson[]) => {
  const edit_private_store = useEditPrivateStore();
  if (edit_private_store.is_record_history) {
    if (edit_private_store.history_nowindex + 1 < edit_private_store.history_doneComponent.length) {
      edit_private_store.history_doneComponent.splice(edit_private_store.history_nowindex + 1);
    }
    edit_private_store.history_doneComponent.push(done_json);
    edit_private_store.history_nowindex = edit_private_store.history_doneComponent.length - 1;
    if (edit_private_store.history_doneComponent.length > edit_private_store.max_record_times) {
      edit_private_store.history_doneComponent.shift();
      edit_private_store.history_nowindex = edit_private_store.history_doneComponent.length - 1;
    }
  }
  edit_private_store.is_record_history = true;
};
