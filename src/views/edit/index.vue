<template>
  <webtopo-svg-edit
    @on-return="onReturn"
    @on-preview="onPreview"
    @on-save="onSave"
  ></webtopo-svg-edit>
</template>
<script setup lang="ts">
  import { IDataModel } from '@/components/webtopo-svg-edit/types';
  import { useRouter } from 'vue-router';
  import WebtopoSvgEdit from '../../components/webtopo-svg-edit/index.vue';
  const router = useRouter();
  const onReturn = () => {
    console.log('点击了返回按钮');
    router.go(-1);
  };
  const onPreview = (data_model: IDataModel) => {
    router.push({
      name: 'preview',
      params: { data_model: JSON.stringify(data_model) }
    });
  };
  const onSave = (data_model: IDataModel) => {
    console.log('点击了保存按钮，可以在此处将图存到数据库', data_model);
  };
</script>
