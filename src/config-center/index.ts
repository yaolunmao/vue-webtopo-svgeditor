import { svgfile_config_center } from './svg-file';
import { IComponentImport, IConfigCenter } from './types';
import customSvgText from '@/components/webtopo-svgedit/components/custom-svg/custom-svg-text/index.vue';
import { vue_config_center } from './vue';
import { ElButton, ElTag } from 'element-plus';
import CommonTable from '@/components/webtopo-svgedit/components/custom-vue/common-table/index.vue';
import PieCharts from '@/components/webtopo-svgedit/components/echarts/pie-charts/index.vue';
export const configCenter: IConfigCenter = {
  svg文件: svgfile_config_center,
  vue组件: vue_config_center
};
export const ComponentImport: IComponentImport = {
  'custom-svg-text': customSvgText,
  'el-button': ElButton,
  'el-tag': ElTag,
  'custom-vue-common-table': CommonTable,
  'pie-charts': PieCharts
};
