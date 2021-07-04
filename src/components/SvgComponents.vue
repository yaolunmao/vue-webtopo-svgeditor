<!--
 * @Author: yaolunmao
-->
<template>
  <component :is="component_prop.type"
             :prop_data=component_prop></component>
</template>
<script>
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
let importComponents = {};
export default {
  props: ['svgInfoData', 'component_prop'],
  data () {
    return {
      componentTag: ''
    }
  },
  components: importComponents,
  provide: {
    [THEME_KEY]: "dark"
  },
  methods: {

  },
  created () {
    this.svgInfoData.forEach(f => {
      let componentInfo = {
        template: f.template,
        props: f.props
      }
      importComponents[f.type] = componentInfo;
    })
  }
}
</script>
<style scoped>
</style>