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
          <el-form-item label="网格" size="small">
            <el-switch v-model="configStore.svg.grid"></el-switch>
          </el-form-item>
          <!-- 基础版不做画布缩放了 有需要自己写吧（^-^）！ -->
          <!-- <el-form-item label="缩放" size="small">
            <el-input-number
              v-model="configStore.svg.scale"
              :step="0.1"
              step-strictly
            ></el-input-number>
          </el-form-item> -->
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
            <el-form-item label="显示" size="small">
              <el-switch v-model="globalStore.handle_svg_info.info.display"></el-switch>
            </el-form-item>
            <el-form-item
              :label="globalStore.handle_svg_info.info.state?.OnOff.title"
              size="small"
              v-if="globalStore.handle_svg_info.info.state?.OnOff"
            >
              <el-switch v-model="globalStore.handle_svg_info.info.state.OnOff.default"></el-switch>
            </el-form-item>
            <el-form-item
              label="文字插槽"
              size="small"
              v-if="globalStore.handle_svg_info.info.tag_slot"
            >
              <el-input v-model="globalStore.handle_svg_info.info.tag_slot" />
            </el-form-item>
            <dynamic-el-form-item
              :obj-info="globalStore.handle_svg_info.info.props"
            ></dynamic-el-form-item>
            <el-form-item label="触发器配置" size="small">
              <el-button type="primary" @click="configTrigger">配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="动画" name="animation">
          <el-form
            label-width="90px"
            label-position="left"
            v-if="globalStore.handle_svg_info.info.animations"
          >
            <dynamic-el-form-item
              :obj-info="globalStore.handle_svg_info.info.animations"
            ></dynamic-el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <el-form
            label-width="90px"
            label-position="left"
            v-if="globalStore.handle_svg_info.info.eventAttr"
          >
            <dynamic-event-item
              :obj-info="globalStore.handle_svg_info.info.eventAttr"
            ></dynamic-event-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog v-model="dialogTriggerVisible" title="触发器配置" width="60%">
      <div>
        <dynamic-trigger
          @update-trigger-list-val="updateTriggerListVal"
          :trigger-list="globalStore.handle_svg_info?.info.triggerList"
        ></dynamic-trigger>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onYesBtnClick">确定</el-button>
          <el-button type="primary" @click="dialogTriggerVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
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
    ElDialog,
    TabsPaneContext,
    ElInput,
    ElSwitch
  } from 'element-plus';
  import { ref } from 'vue';
  import { useConfigStore } from '@/store/config';
  import { useGlobalStore } from '@/store/global';
  import { EGlobalStoreIntention } from '@/store/global/types';
  import DynamicElFormItem from './dynamic-el-form-item.vue';
  import DynamicEventItem from './dynamic-event-item.vue';
  import DynamicTrigger from './dynamic-trigger.vue';
  import { EConfigAnimationsType } from '@/config-center/types';
  const configStore = useConfigStore();
  const globalStore = useGlobalStore();

  const activeName = ref('style');
  const dialogTriggerVisible = ref(false);
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
  const configTrigger = () => {
    dialogTriggerVisible.value = true;
  };
  const onYesBtnClick = () => {
    console.log(globalStore.handle_svg_info);
    console.log(globalStore.done_json[globalStore.handle_svg_info.index]);
  };
  const updateTriggerListVal = () => {
    globalStore.handle_svg_info?.info.triggerList?.push({
      tag: '',
      max: undefined,
      min: undefined,
      animationsType: EConfigAnimationsType.None
    });
  };
</script>
