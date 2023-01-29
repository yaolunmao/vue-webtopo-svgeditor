<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
  import { use } from 'echarts/core';
  import { SVGRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import { watch, provide, reactive } from 'vue';
  use([SVGRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

  provide(THEME_KEY, 'dark');

  const props = defineProps({
    title: {
      type: String,
      default: '标题'
    },
    seriesName: {
      type: String,
      default: '详情'
    },
    seriesData: {
      type: Array,
      default: () => []
    }
  });

  const option = reactive({
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: props.seriesName,
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: props.seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
  watch(props, (new_val) => {
    option.title.text = new_val.title;
    option.series[0].name = new_val.seriesName;
    option.series[0].data = new_val.seriesData;
  });
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
