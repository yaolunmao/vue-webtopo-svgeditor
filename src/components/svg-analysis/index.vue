<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" v-bind="props.props" />
  </svg>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      default: () => {}
    }
  });
  const symbolId = computed(() => `#svg-${props.name}`);
</script>
