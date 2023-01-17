<script setup lang="ts">
  import { ref } from 'vue';
  import { VAceEditor } from 'vue3-ace-editor';
  import '@/config-center/ace-edit';
  import { useGlobalStore } from '@/store/global';
  import { useSvgEditLayoutStore } from '@/store/svgedit-layout';
  import { useConfigStore } from '@/store/config';
  import { IDataModel } from '../../types';
  import { ElMessage } from 'element-plus';
  const content = ref<string>('');
  const globalStore = useGlobalStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const configStore = useConfigStore();
  const onImportJson = () => {
    try {
      const json: IDataModel = JSON.parse(content.value);
      console.log(json, json.layout_center, configStore, 15);
      if (!json.config || !json.layout_center || !json.done_json) {
        ElMessage.error('请导入正确的数据模型！');
        return;
      }
      configStore.svg = json.config;
      svgEditLayoutStore.center_offset = json.layout_center;
      globalStore.setDoneJson(json.done_json);
      ElMessage.success('导入成功');
    } catch (error) {
      ElMessage.error('请导入正确的数据模型！');
      console.error(error);
      return;
    }
  };
  defineExpose({
    onImportJson
  });
</script>

<template>
  <v-ace-editor
    v-model:value="content"
    lang="json"
    theme="monokai"
    style="height: 400px"
    :options="{
      useWorker: true,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    }"
  />
</template>
