<script setup lang="ts">
import { reactive, ref, createApp, markRaw,provide } from "vue";
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { PieChart,BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
use([
  SVGRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart
]);
provide(THEME_KEY, "default")
const props = defineProps({
    component_type: {
        type: String as () => any,
        default: ''
    },
    component_template: {
        type: String as () => any,
        default: ''
    },
    component_props: {
        type: Array as () => Array<any>,
        default: ''
    },
    component_attr: {
        type: Object as () => any,
        default: {}
    },
});
const component_info = markRaw({
    template: props.component_template,
    props: ['prop_data']
});
</script>

<template>
    <component :is="component_info" :prop_data="props.component_attr"></component>
</template>

