<template>
  <el-button>添加事件</el-button>
  <el-form-item
    v-for="(attr_item, key) in props.objInfo"
    :key="key"
    :label="attr_item.tips"
    size="small"
  >
    <!-- <el-select
      v-if="attr_item.type === EConfigItemPropsType.Select"
      v-model="attr_item.val"
      placeholder="Select"
      size="small"
      :disabled="attr_item?.disabled"
    >
      <el-option
        v-for="item in attr_item.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
    <!-- <el-input-number
      v-else-if="attr_item.type === EConfigItemPropsType.InputNumber"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-input-number>
    <el-input
      v-else-if="attr_item.type === EConfigItemPropsType.Input"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-input>
    <el-color-picker
      v-else-if="attr_item.type === EConfigItemPropsType.Color"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-color-picker>
    <el-switch
      v-else-if="attr_item.type === EConfigItemPropsType.Switch"
      v-model="attr_item.val"
      :disabled="attr_item?.disabled"
    ></el-switch>
    <json-edit
      v-else-if="attr_item.type === EConfigItemPropsType.JsonEdit"
      :content-obj="attr_item.val"
      :disabled="attr_item?.disabled"
      @update-attr-item-val="(val) => updateAttrItemVal(attr_item, val)"
    ></json-edit> -->
  </el-form-item>
</template>
<script setup lang="ts">
  import { IEventAttr } from '@/config-center/types';
  import {
    ElFormItem,
    ElButton
    // ElColorPicker,
    // ElInputNumber,
    // ElInput,
    // ElSelect,
    // ElOption,
    // ElSwitch
  } from 'element-plus';
  import { PropType } from 'vue';
  //   import JsonEdit from '@/components/webtopo-svg-edit/components/right-panel/json-edit.vue';
  const props = defineProps({
    objInfo: {
      type: Object as PropType<IEventAttr>,
      default: () => {}
    }
  });
  //   const updateAttrItemVal = (
  //     attr_item: {
  //       title: string;
  //       type: EConfigItemPropsType;
  //       val: any;
  //       options?: any;
  //       disabled?: boolean | undefined;
  //     },
  //     val: any
  //   ) => {
  //     attr_item.val = val;
  //   };
</script>
