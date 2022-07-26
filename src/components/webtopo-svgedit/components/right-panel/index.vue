<template>
  <div>
    <div class="mt-2" v-if="globalStore.intention != EGlobalStoreIntention.Select">
      <div class="font-bold ml-2">页面设置</div>
      <el-divider />
      <div class="ml-1">
        <el-form label-width="90px" label-position="left">
          <el-form-item label="背景颜色" size="small">
            <el-color-picker v-model="configStore.svg.background_color" />
          </el-form-item>
          <el-form-item label="x轴原点坐标" size="small">
            <el-input-number v-model="configStore.svg.position_center.x"></el-input-number>
          </el-form-item>
          <el-form-item label="y轴原点坐标" size="small">
            <el-input-number v-model="configStore.svg.position_center.y"></el-input-number>
          </el-form-item>
          <el-form-item label="缩放" size="small">
            <el-input-number
              v-model="configStore.svg.scale"
              :step="0.1"
              step-strictly
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div
      class="mx-2"
      v-else-if="
        globalStore.intention == EGlobalStoreIntention.Select && globalStore.handle_svg_info
      "
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="样式" name="style">
          <el-form label-width="90px" label-position="left">
            <el-form-item label="标题" size="small">
              <el-input v-model="globalStore.handle_svg_info.info.title" />
            </el-form-item>
            <el-form-item label="x轴坐标" size="small">
              <el-input-number v-model="globalStore.handle_svg_info.info.x"></el-input-number>
            </el-form-item>
            <el-form-item label="y轴坐标" size="small">
              <el-input-number v-model="globalStore.handle_svg_info.info.y"></el-input-number>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="动画" name="animation"></el-tab-pane>
        <el-tab-pane label="事件" name="event"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {
    ElDivider,
    ElForm,
    ElFormItem,
    ElColorPicker,
    ElInputNumber,
    ElTabs,
    ElTabPane,
    TabsPaneContext,
    ElInput
  } from 'element-plus';
  import { ref } from 'vue';
  import { useConfigStore } from '../../../../store/config';
  import { useGlobalStore } from '../../../../store/global';
  import { EGlobalStoreIntention } from '../../../../store/global/types';
  const configStore = useConfigStore();
  const globalStore = useGlobalStore();

  const activeName = ref('style');

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
</script>
