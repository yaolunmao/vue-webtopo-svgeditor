<template>
  <div>
    <el-button type="primary" plain round @click="dialogVisible = true">点击编辑</el-button>
    <el-dialog v-model="dialogVisible" title="配置编辑" width="60%">
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
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onYesBtnClick">确定</el-button>
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { VAceEditor } from 'vue3-ace-editor';
  import '@/config-center/ace-edit';
  import { ElButton, ElDialog } from 'element-plus';
  import { ref } from 'vue';
  const props = defineProps({
    contentObj: {
      type: Object,
      default: () => {}
    }
  });
  const dialogVisible = ref(false);
  const emits = defineEmits(['updateAttrItemVal']);
  const content = ref(JSON.stringify(props.contentObj, null, 2));
  const onYesBtnClick = () => {
    emits('updateAttrItemVal', JSON.parse(content.value));
    dialogVisible.value = false;
  };
</script>
