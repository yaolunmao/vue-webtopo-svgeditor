<!-- 左侧工具栏 -->
<template>
  <div>
    <div class="flex items-center my-5px">
      <div class="source-repo">组件库 :</div>
      <el-select v-model="select_lib" placeholder="请选择组件库" @change="libChange">
        <el-option
          v-for="(item, key) in left_tool_bar"
          :key="key"
          :label="key"
          :value="item"
        ></el-option>
      </el-select>
    </div>

    <el-collapse v-model="activeNames" v-for="item of config_center" :key="item.title">
      <el-collapse-item :name="item.groupType">
        <template #title>
          <div style="font-weight: bolder">{{ item.title }}</div>
        </template>
        <div class="component-group flex flex-wrap">
          <div
            v-for="svg_item in item.list"
            class="ideal"
            :key="svg_item.name"
            draggable="true"
            @dragstart="createBegin(svg_item)"
            @dragend="dragEndEvent"
          >
            <div class="flex component-item items-center ml-10px">
              <el-icon :size="40" class="flex items-center">
                <svg-analysis :name="svg_item.name" :props="prosToVBind(svg_item)"></svg-analysis>
              </el-icon>
              <div>{{ svg_item.title }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { ElSelect, ElOption, ElCollapse, ElCollapseItem, ElIcon, ElMessage } from 'element-plus';
  import { IConfigCenter, IConfigComponentGroup, IConfigItem } from '@/config-center/types';
  import { useGlobalStore } from '@/store/global';
  import SvgAnalysis from '@/components/svg-analysis/index.vue';
  import { EGlobalStoreIntention } from '@/store/global/types';
  import { prosToVBind } from '@/utils';
  const globalStore = useGlobalStore();
  const props = defineProps({
    customToolBar: {
      type: Object as PropType<IConfigCenter>,
      default: () => {}
    }
  });
  const left_tool_bar = ref(
    props.customToolBar
      ? Object.keys(props.customToolBar).length > 0
        ? props.customToolBar
        : globalStore.config_center
      : globalStore.config_center
  );
  const first_key = Object.keys(left_tool_bar.value)[0];
  const select_lib = ref(first_key);
  const config_center = ref<IConfigComponentGroup[]>(left_tool_bar.value[first_key]);
  const activeNames = ref([
    'shape',
    'stateful',
    'stateless',
    'have_animation',
    'custom_svg_group',
    'element-ui',
    'custom-vue',
    'echarts'
  ]);
  const libChange = (val: any) => {
    config_center.value = [];
    config_center.value = val;
  };

  const createBegin = (svg_item: IConfigItem) => {
    globalStore.setCreateInfo(svg_item);
  };
  const dragEndEvent = (e: DragEvent) => {
    //拖动时记录拖动的svg信息
    if (e.dataTransfer?.dropEffect !== 'copy') {
      ElMessage.warning('请将组件拖到画布中!');
      //清空已选择的信息
      globalStore.intention = EGlobalStoreIntention.None;
      return;
    }
  };
</script>
<style scoped lang="less">
  .component-item {
    width: 100px;
    height: 30px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
      cursor: move;
      // outline: 1px solid #409eff;
      box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
    }
  }
  .source-repo {
    min-width: 60px;
    font-weight: bolder;
    font-style: italic;
    font-size: 15px;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
</style>
