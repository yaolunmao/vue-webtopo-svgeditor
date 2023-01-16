<template>
  <div class="flex justify-between" style="width: 100%">
    <div class="flex items-center justify-between" style="width: 220px">
      <div class="flex items-center"> </div>
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
          title="撤销"
          :size="20"
          :class="`${
            edit_private_store.getTopBtnUndoStatus ? 'icon-normal' : 'icon-disable'
          } ml-20px`"
          @click="() => edit_private_store.topUndoBtnClick()"
        >
          <svg-analysis name="undo"></svg-analysis>
        </el-icon>
        <el-icon
          title="重做"
          :class="`${
            edit_private_store.getTopBtnRedoStatus ? 'icon-normal' : 'icon-disable'
          } ml-5px`"
          :size="20"
          @click="() => edit_private_store.topRedoBtnClick()"
        >
          <svg-analysis name="redo"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="清空" class="icon-normal" :size="20" @click="onDeleteBtnClick">
          <svg-analysis name="delete"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="组件树" class="icon-normal" :size="20">
          <svg-analysis name="tree-list"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
        <el-icon title="导入json" class="icon-normal" :size="20">
          <svg-analysis name="import-json"></svg-analysis>
        </el-icon>
        <el-icon title="导出json" :size="20" class="icon-normal ml-5px">
          <svg-analysis name="export-json"></svg-analysis>
        </el-icon>
        <el-divider direction="vertical"></el-divider>
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
        </el-icon>
      </div>
      <div class="flex items-center mr-20px">
        <el-icon title="预览" class="icon-normal" :size="20">
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
  import { useGlobalStore } from '@/store/global';
  import { useEditPrivateStore } from '@/store/system';
  import { ElIcon, ElDivider } from 'element-plus';
  import SvgAnalysis from '../../../../components/svg-analysis/index.vue';
  import { useSvgEditLayoutStore } from '../../../../store/svgedit-layout';
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const globalStore = useGlobalStore();
  const edit_private_store = useEditPrivateStore();
  const onDeleteBtnClick = () => {
    globalStore.setDoneJson([]);
  };
</script>
<style scoped lang="less">
  .logoimg {
    height: 40px;
    width: 160px;
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
