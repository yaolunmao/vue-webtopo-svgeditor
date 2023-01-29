import { IDataModel } from '@/components/webtopo-svg-edit/types';
import { useConfigStore } from '@/store/config';
import { useGlobalStore } from '@/store/global';
import { IDoneJson } from '@/store/global/types';
import { useSvgEditLayoutStore } from '@/store/svgedit-layout';
import { useEditPrivateStore } from '@/store/system';
import { ElMessage } from 'element-plus';

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
export const useImportDataModel = (model_str: string) => {
  try {
    const globalStore = useGlobalStore();
    const svgEditLayoutStore = useSvgEditLayoutStore();
    const configStore = useConfigStore();
    const json: IDataModel = JSON.parse(model_str);
    if (!json.config || !json.layout_center || !json.done_json) {
      ElMessage.error('请导入正确的数据模型！');
      return;
    }
    configStore.svg = json.config;
    svgEditLayoutStore.center_offset = json.layout_center;
    globalStore.setDoneJson(json.done_json);
  } catch (error) {
    ElMessage.error('请导入正确的数据模型！');
    console.error(error);
    return;
  }
};
