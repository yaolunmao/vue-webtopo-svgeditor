<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  });
  const symbolId = computed(() => `#svg-${props.name}`);
</script>
