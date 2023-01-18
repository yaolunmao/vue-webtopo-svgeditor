<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { VAceEditor } from 'vue3-ace-editor';
  import '@/config-center/ace-edit';
  import { useGlobalStore } from '@/store/global';
  import { useSvgEditLayoutStore } from '@/store/svgedit-layout';
  import { useConfigStore } from '@/store/config';
  import { IDataModel } from '../../types';
  const content = ref('');
  const globalStore = useGlobalStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const configStore = useConfigStore();
  onMounted(() => {
    const export_json: IDataModel = {
      layout_center: svgEditLayoutStore.center_offset,
      config: configStore.svg,
      done_json: globalStore.done_json
    };
    content.value = JSON.stringify(export_json, null, 2);
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
