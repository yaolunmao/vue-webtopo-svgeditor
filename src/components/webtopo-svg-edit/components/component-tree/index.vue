<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    :default-expand-all="true"
    :expand-on-click-node="false"
    :highlight-current="true"
    node-key="id"
    :current-node-key="current_node_key"
  />
</template>

<script lang="ts" setup>
  import { useGlobalStore } from '@/store/global';
  import { EGlobalStoreIntention, IDoneJson } from '@/store/global/types';
  import { ElTree } from 'element-plus';
  import { onMounted, ref } from 'vue';

  const global_store = useGlobalStore();
  const data = ref<IDoneJson[]>([]);
  const current_node_key = ref(global_store.handle_svg_info?.info.id);
  const handleNodeClick = (data: IDoneJson) => {
    global_store.intention = EGlobalStoreIntention.Select;
    global_store.setHandleSvgInfo(data);
  };
  onMounted(() => {
    data.value = global_store.done_json;
  });

  const defaultProps = {
    children: 'children',
    label: 'title'
  };
</script>
