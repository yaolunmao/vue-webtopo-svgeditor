<template>
  <webtopo-svgedit @on-return="onReturn"></webtopo-svgedit>
</template>
<script setup lang="ts">
  import WebtopoSvgedit from '../../components/webtopo-svgedit/index.vue';
  const onReturn = () => {
    console.log('点击了返回按钮');
  };
</script>
