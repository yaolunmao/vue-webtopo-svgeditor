<!-- eslint-disable vue/html-indent -->
<template>
  <el-table v-bind="table_props">
    <el-table-column
      v-for="item in props.colConfig"
      :key="item.prop"
      v-bind="item"
    ></el-table-column>
  </el-table>
</template>
<script setup lang="ts">
  import { PropType, ref, watchEffect } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  const props = defineProps({
    colConfig: {
      type: Array as PropType<ICol[]>,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: null
    },
    maxHeight: {
      type: Number,
      default: null
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    fit: {
      type: Boolean,
      default: false
    },
    operateDisplay: {
      type: Boolean,
      default: false
    },
    selectionData: {
      type: Array,
      default: () => []
    }
  });
  const table_props = ref({});
  watchEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { colConfig, ...temp_props } = props;
    table_props.value = temp_props;
  });
  interface ICol {
    prop: string;
    label: string;
    width: string;
    fixed: string | boolean;
    sortable: boolean;
    'show-overflow-tooltip': boolean;
  }
</script>
<style scoped lang="scss"></style>
