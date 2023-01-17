<template>
  <webtopo-svg-preview :data-model="data_model" :canvas-drag="true"></webtopo-svg-preview>
</template>
<script setup lang="ts">
  import WebtopoSvgPreview from '@/components/webtopo-svg-preview/index.vue';
  import { IDataModel } from '@/components/webtopo-svgedit/types';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const data_model = ref<IDataModel | null>(null);

  if (route.params.data_model) {
    data_model.value = JSON.parse(route.params.data_model as string);
  }
</script>
