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
          <el-form-item label="标尺" size="small">
            <el-switch v-model="configStore.svg.ruler"></el-switch>
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
          <el-form
            label-width="90px"
            label-position="left"
            v-else-if="globalStore.handle_svg_info.info.common_animations"
          >
            <el-form-item label="动画效果" size="small">
              <common-animate
                @update-common-ani-val="
                  (val) => updateCommonAniVal(globalStore.handle_svg_info?.info, val)
                "
                :val="globalStore.handle_svg_info.info.common_animations.val"
              ></common-animate>
            </el-form-item>
            <el-form-item label="延迟" size="small">
              <el-select v-model="globalStore.handle_svg_info.info.common_animations.delay">
                <el-option value="delay-0s" label="无"></el-option>
                <el-option value="delay-1s" label="1秒"></el-option
                ><el-option value="delay-2s" label="2秒"></el-option
                ><el-option value="delay-3s" label="3秒"></el-option
                ><el-option value="delay-4s" label="4秒"></el-option
                ><el-option value="delay-5s" label="5秒"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="动画速度" size="small">
              <el-select v-model="globalStore.handle_svg_info.info.common_animations.speed">
                <el-option value="slow" label="慢"></el-option>
                <el-option value="slower" label="最慢"></el-option>
                <el-option value="fast" label="快"></el-option>
                <el-option value="faster" label="最快"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="循环次数" size="small">
              <el-select v-model="globalStore.handle_svg_info.info.common_animations.repeat">
                <el-option value="repeat-1" label="一次"></el-option>
                <el-option value="repeat-2" label="两次"></el-option>
                <el-option value="repeat-3" label="三次"></el-option>
                <el-option value="infinite" label="无限次"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
    ElInput,
    ElSwitch,
    ElSelect,
    ElOption
  } from 'element-plus';
  import { ref } from 'vue';
  import { useConfigStore } from '@/store/config';
  import { useGlobalStore } from '@/store/global';
  import { EGlobalStoreIntention, IDoneJson } from '@/store/global/types';
  import DynamicElFormItem from './dynamic-el-form-item.vue';
  import CommonAnimate from './common-animate.vue';
  const configStore = useConfigStore();
  const globalStore = useGlobalStore();

  const activeName = ref('style');
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
  const updateCommonAniVal = (item: IDoneJson | undefined, val: string) => {
    if (item?.common_animations) {
      item.common_animations.val = val;
    }
  };
</script>
