<!-- eslint-disable vue/html-indent -->
<template>
  <div class="flex justify-between" style="width: 100%">
    <div class="flex items-center justify-between" style="width: 220px">
      <div class="flex items-center">
        <!-- <img title="咬轮猫" class="logoimg" src="../../../../assets/logo.png" /> -->
        <span class="logo-title">vue-webtopo-svgeditor</span></div
      >
      <el-icon
        size="22"
        style="cursor: pointer"
        @click="svgEditLayoutStore.left_nav = !svgEditLayoutStore.left_nav"
      >
        <svg-analysis v-if="svgEditLayoutStore.left_nav" name="menu-fold"></svg-analysis>
        <svg-analysis v-else name="menu-unfold"></svg-analysis>
      </el-icon>
    </div>
    <div class="flex justify-between" style="width: calc(100% - 440px)">
      <div class="flex items-center">
        <el-icon
          title="撤销 ctrl+z"
          :size="20"
          :class="`${
            editPrivateStore.getTopBtnUndoStatus ? 'icon-normal' : 'icon-disable'
          } ml-20px`"
          @click="() => editPrivateStore.topUndoBtnClick()"
        >
          <svg-analysis name="undo"></svg-analysis>
        </el-icon>
        <el-icon
          title="重做 ctrl+shift+z"
          :class="`${editPrivateStore.getTopBtnRedoStatus ? 'icon-normal' : 'icon-disable'} ml-5px`"
          :size="20"
          @click="() => editPrivateStore.topRedoBtnClick()"
        >
          <svg-analysis name="redo"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon
          title="清空 ctrl+delete"
          :class="`${globalStore.done_json.length > 0 ? 'icon-normal' : 'icon-disable'}`"
          :size="20"
          @click="onDeleteBtnClick"
        >
          <svg-analysis name="delete"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon
          title="组件树"
          class="icon-normal"
          :size="20"
          @click="emits('changeVisible', EVisibleConfKey.ComponentTree, true)"
        >
          <svg-analysis name="tree-list"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon
          title="导入数据模型"
          class="icon-normal"
          :size="20"
          @click="emits('changeVisible', EVisibleConfKey.ImportJson, true)"
        >
          <svg-analysis name="import-json"></svg-analysis>
        </el-icon>
        <el-icon
          title="导出数据模型"
          :size="20"
          class="icon-normal ml-5px"
          @click="emits('changeVisible', EVisibleConfKey.ExportJson, true)"
        >
          <svg-analysis name="export-json"></svg-analysis>
        </el-icon>
        <!-- <el-divider direction="vertical"></el-divider>
        <el-icon title="组合" class="icon-normal" :size="20">
          <svg-analysis name="group"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="取消组合" class="icon-normal" :size="20">
          <svg-analysis name="ungroup"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="锁定" class="icon-normal" :size="20">
          <svg-analysis name="lock"></svg-analysis>
        </el-icon> -->
      </div>
      <div class="flex items-center mr-20px">
        <el-icon title="返回" class="icon-normal" :size="20" @click="emits('onReturn')">
          <svg-analysis name="return"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="保存" class="icon-normal" :size="20" @click="onSaveClick">
          <svg-analysis name="save"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="预览" class="icon-normal" :size="20" @click="onPreviewClick">
          <svg-analysis name="preview"></svg-analysis>
        </el-icon>
      </div>
    </div>
    <div class="flex items-center" style="width: 220px">
      <el-icon
        size="22"
        style="cursor: pointer"
        @click="svgEditLayoutStore.right_nav = !svgEditLayoutStore.right_nav"
      >
        <svg-analysis v-if="svgEditLayoutStore.right_nav" name="menu-unfold"></svg-analysis>
        <svg-analysis v-else name="menu-fold"></svg-analysis>
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '@/store/config';
  import { useGlobalStore } from '@/store/global';
  import { useEditPrivateStore } from '@/store/system';
  import { ElIcon, ElDivider } from 'element-plus';
  import SvgAnalysis from '../../../../components/svg-analysis/index.vue';
  import { useSvgEditLayoutStore } from '../../../../store/svgedit-layout';
  import { EVisibleConfKey, IDataModel } from '../../types';
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const globalStore = useGlobalStore();
  const editPrivateStore = useEditPrivateStore();
  const configStore = useConfigStore();
  const emits = defineEmits(['changeVisible', 'onReturn', 'onPreview', 'onSave']);
  const onDeleteBtnClick = () => {
    globalStore.done_json.length <= 0 || globalStore.setDoneJson([]);
  };
  const onPreviewClick = () => {
    const data_model: IDataModel = {
      layout_center: svgEditLayoutStore.center_offset,
      config: configStore.svg,
      done_json: globalStore.done_json
    };
    emits('onPreview', data_model);
  };
  const onSaveClick = () => {
    const data_model: IDataModel = {
      layout_center: svgEditLayoutStore.center_offset,
      config: configStore.svg,
      done_json: globalStore.done_json
    };
    emits('onSave', data_model);
  };
</script>
<style scoped lang="less">
  .logoimg {
    height: 40px;
    width: 40px;
  }

  .logo-title {
    font-size: 15px;
    font-weight: 600;
  }

  .icon-normal {
    cursor: pointer;

    &:hover {
      color: rgb(80, 76, 76);
    }
  }

  .icon-disable {
    cursor: not-allowed;
    color: #ccc;
  }
</style>
