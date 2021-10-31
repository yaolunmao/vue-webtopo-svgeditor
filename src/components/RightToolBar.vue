<script setup lang="ts">
import { reactive, ref } from "vue";
import { NForm, NFormItem, NInput, NInputNumber, NColorPicker, NRadioGroup, NSpace, NRadio,NSelect } from "naive-ui";
import { ISvgDataLists } from "../Model";

const props = defineProps({
  set_svg_info: {
    type: Object as () => ISvgDataLists,
    default: {}
  }
});
</script>
<template>
  <div class="rightnav">
    <div style="margin-left: 2rem;margin-top: 1rem;">
      <n-form size="small" label-placement="left">
        <n-form-item label="标识">
          <span>{{ props.set_svg_info.id }}</span>
        </n-form-item>
        <n-form-item label="类型">
          <span>{{ props.set_svg_info.type }}</span>
        </n-form-item>
        <n-form-item label="名称">
          <n-input placeholder="请输入名称" v-model:value="props.set_svg_info.title" />
        </n-form-item>
        <n-form-item label="x轴坐标">
          <n-input-number v-model:value="props.set_svg_info.svgPositionX" :min="0" />
        </n-form-item>
        <n-form-item label="y轴坐标">
          <n-input-number v-model:value="props.set_svg_info.svgPositionY" :min="0" />
        </n-form-item>
        <n-form-item label="大小">
          <n-input-number v-model:value="props.set_svg_info.size" :min="1" :step="0.1" />
        </n-form-item>
        <n-form-item label="旋转">
          <n-input-number v-model:value="props.set_svg_info.angle" />
        </n-form-item>
        <n-form-item v-for="item in props.set_svg_info.extend_attr" :label="item.title">
          <n-input-number v-if="item.type == 'numberinputbox'" v-model:value="item.val" />
          <n-color-picker
            v-else-if="item.type == 'colorinputbox'"
            :modes="['hex']"
            v-model:value="item.val"
          />
          <n-input
            v-else-if="item.type == 'textinputbox'"
            :placeholder="`请输入${item.title}`"
            v-model:value="item.val"
          />
          <n-input
            v-else-if="item.type == 'textareainputbox'"
            :placeholder="`请输入${item.title}`"
            type="textarea"
            v-model:value="item.val"
          />
          <n-radio-group v-model:value="item.val.selectval" v-else-if="item.type == 'radiogroup'">
            <n-space>
              <n-radio
                v-for="ridioitem in item.val.ridiogroup"
                :key="ridioitem.value"
                :value="ridioitem.value"
              >{{ ridioitem.label }}</n-radio>
            </n-space>
          </n-radio-group>
          <n-select v-else-if="item.type == 'select'" v-model:value="item.val.selectval" :options="item.val.selectgroup" />

        </n-form-item>
      </n-form>
    </div>
  </div>
</template>
<style scoped>
.rightnav {
  width: 250px;
  height: 100%;
  overflow: auto;
}
.rightnav::-webkit-scrollbar {
  display: none;
}
</style>