<script setup lang="ts">
  import { ref } from 'vue';
  import { VAceEditor } from 'vue3-ace-editor';
  import '@/config-center/ace-edit';

  import { useImportDataModel } from '@/hooks';
  import { ElMessage } from 'element-plus';
  const content = ref<string>('');

  const onImportJson = () => {
    useImportDataModel(content.value);
    ElMessage.success('导入成功');
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
