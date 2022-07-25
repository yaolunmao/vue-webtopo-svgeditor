<!-- 左侧工具栏 -->
<template>
  <div>
    <div class="flex items-center my-5px">
      <div class="source-repo">组件库 :</div>
      <el-select v-model="select_lib" placeholder="请选择组件库" @change="libChange">
        <el-option
          v-for="(item, key) in global_store.config_center"
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
        <div class="component-group flex flex-warp">
          <div v-for="iconitem in item.list" class="ideal" :key="iconitem.name">
            <div class="flex component-item items-center ml-10px">
              <el-icon :size="40" class="flex items-center">
                <svg-analysis
                  :name="iconitem.name"
                  :props="handleIconProps(iconitem.props)"
                ></svg-analysis>
              </el-icon>
              <div>{{ iconitem.title }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElSelect, ElOption, ElCollapse, ElCollapseItem, ElIcon } from 'element-plus';
  import { IConfigComponentGroup, IConfigItemProps } from '../../../../config-center/types';
  import { useGlobalStore } from '../../../../store/global';
  import SvgAnalysis from '../../../svg-analysis/index.vue';
  const global_store = useGlobalStore();
  const select_lib = ref('电力系统');
  const config_center = ref<IConfigComponentGroup[]>(global_store.config_center.电力系统);
  const activeNames = ref(['stateful', 'stateless']);
  const libChange = (val: any) => {
    config_center.value = [];
    config_center.value = val;

    console.log(val, 71474);
  };
  const handleIconProps = (svg_item: IConfigItemProps) => {
    let temp = {};
    for (const key in svg_item) {
      temp = { ...temp, ...{ [key]: svg_item[key].val } };
    }
    return temp;
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
</style>
